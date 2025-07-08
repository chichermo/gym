import Foundation
import HealthKit
import CoreBluetooth
import React

@objc(WearableModule)
class WearableModule: RCTEventEmitter {
  
  private let healthStore = HKHealthStore()
  private var centralManager: CBCentralManager?
  private var connectedPeripherals: [CBPeripheral] = []
  private var hasListeners = false
  
  override init() {
    super.init()
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }
  
  override func supportedEvents() -> [String]! {
    return [
      "deviceConnected",
      "deviceDisconnected", 
      "healthDataReceived",
      "connectionError",
      "bluetoothStateChanged"
    ]
  }
  
  override func startObserving() {
    hasListeners = true
  }
  
  override func stopObserving() {
    hasListeners = false
  }
  
  // MARK: - HealthKit Methods
  
  @objc
  func isHealthKitAvailable(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    if HKHealthStore.isHealthDataAvailable() {
      resolve(true)
    } else {
      resolve(false)
    }
  }
  
  @objc
  func requestHealthKitPermissions(_ permissions: [String], resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard HKHealthStore.isHealthDataAvailable() else {
      reject("ERROR", "HealthKit no está disponible", nil)
      return
    }
    
    var typesToRead: Set<HKObjectType> = []
    var typesToWrite: Set<HKSampleType> = []
    
    for permission in permissions {
      switch permission {
      case "Steps":
        typesToRead.insert(HKObjectType.quantityType(forIdentifier: .stepCount)!)
      case "HeartRate":
        typesToRead.insert(HKObjectType.quantityType(forIdentifier: .heartRate)!)
      case "ActiveEnergyBurned":
        typesToRead.insert(HKObjectType.quantityType(forIdentifier: .activeEnergyBurned)!)
      case "DistanceWalkingRunning":
        typesToRead.insert(HKObjectType.quantityType(forIdentifier: .distanceWalkingRunning)!)
      case "SleepAnalysis":
        typesToRead.insert(HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!)
      case "Workout":
        typesToRead.insert(HKObjectType.workoutType())
        typesToWrite.insert(HKObjectType.workoutType())
      default:
        break
      }
    }
    
    healthStore.requestAuthorization(toShare: typesToWrite, read: typesToRead) { success, error in
      DispatchQueue.main.async {
        if success {
          resolve(true)
        } else {
          reject("ERROR", "Error solicitando permisos de HealthKit", error)
        }
      }
    }
  }
  
  @objc
  func getStepCount(_ startDate: Date, endDate: Date, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount) else {
      reject("ERROR", "Tipo de paso no disponible", nil)
      return
    }
    
    let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)
    let query = HKStatisticsQuery(quantityType: stepType, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, result, error in
      DispatchQueue.main.async {
        if let error = error {
          reject("ERROR", "Error obteniendo pasos", error)
          return
        }
        
        let steps = result?.sumQuantity()?.doubleValue(for: HKUnit.count()) ?? 0
        resolve(Int(steps))
      }
    }
    
    healthStore.execute(query)
  }
  
  @objc
  func getHeartRateSamples(_ startDate: Date, endDate: Date, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate) else {
      reject("ERROR", "Tipo de frecuencia cardíaca no disponible", nil)
      return
    }
    
    let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)
    let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierEndDate, ascending: false)
    
    let query = HKSampleQuery(sampleType: heartRateType, predicate: predicate, limit: HKObjectQueryNoLimit, sortDescriptors: [sortDescriptor]) { _, samples, error in
      DispatchQueue.main.async {
        if let error = error {
          reject("ERROR", "Error obteniendo frecuencia cardíaca", error)
          return
        }
        
        let heartRateSamples = samples?.compactMap { sample -> [String: Any]? in
          guard let quantitySample = sample as? HKQuantitySample else { return nil }
          return [
            "value": quantitySample.quantity.doubleValue(for: HKUnit(from: "count/min")),
            "startDate": quantitySample.startDate.timeIntervalSince1970,
            "endDate": quantitySample.endDate.timeIntervalSince1970
          ]
        } ?? []
        
        resolve(heartRateSamples)
      }
    }
    
    healthStore.execute(query)
  }
  
  @objc
  func getActiveEnergyBurned(_ startDate: Date, endDate: Date, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let energyType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned) else {
      reject("ERROR", "Tipo de energía no disponible", nil)
      return
    }
    
    let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)
    let query = HKStatisticsQuery(quantityType: energyType, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, result, error in
      DispatchQueue.main.async {
        if let error = error {
          reject("ERROR", "Error obteniendo calorías", error)
          return
        }
        
        let calories = result?.sumQuantity()?.doubleValue(for: HKUnit.kilocalorie()) ?? 0
        resolve(Int(calories))
      }
    }
    
    healthStore.execute(query)
  }
  
  // MARK: - Bluetooth Methods
  
  @objc
  func startBluetoothScan(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let centralManager = centralManager else {
      reject("ERROR", "Central Manager no inicializado", nil)
      return
    }
    
    if centralManager.state == .poweredOn {
      let services = [CBUUID(string: "180D"), CBUUID(string: "180F")] // Heart Rate, Battery Service
      centralManager.scanForPeripherals(withServices: services, options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
      resolve(true)
    } else {
      reject("ERROR", "Bluetooth no está disponible", nil)
    }
  }
  
  @objc
  func stopBluetoothScan() {
    centralManager?.stopScan()
  }
  
  @objc
  func connectToDevice(_ deviceId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    // Implementar conexión a dispositivo específico
    // Esto requeriría mantener una lista de dispositivos escaneados
    resolve(true)
  }
  
  @objc
  func disconnectDevice(_ deviceId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    // Implementar desconexión de dispositivo
    resolve(true)
  }
  
  // MARK: - Event Emitters
  
  private func emitDeviceConnected(_ device: [String: Any]) {
    if hasListeners {
      sendEvent(withName: "deviceConnected", body: device)
    }
  }
  
  private func emitDeviceDisconnected(_ deviceId: String) {
    if hasListeners {
      sendEvent(withName: "deviceDisconnected", body: deviceId)
    }
  }
  
  private func emitHealthDataReceived(_ data: [String: Any]) {
    if hasListeners {
      sendEvent(withName: "healthDataReceived", body: data)
    }
  }
  
  private func emitConnectionError(_ error: String) {
    if hasListeners {
      sendEvent(withName: "connectionError", body: error)
    }
  }
  
  private func emitBluetoothStateChanged(_ state: String) {
    if hasListeners {
      sendEvent(withName: "bluetoothStateChanged", body: state)
    }
  }
}

// MARK: - CBCentralManagerDelegate

extension WearableModule: CBCentralManagerDelegate {
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    var stateString = "unknown"
    
    switch central.state {
    case .poweredOn:
      stateString = "poweredOn"
    case .poweredOff:
      stateString = "poweredOff"
    case .unauthorized:
      stateString = "unauthorized"
    case .unsupported:
      stateString = "unsupported"
    case .resetting:
      stateString = "resetting"
    case .unknown:
      stateString = "unknown"
    @unknown default:
      stateString = "unknown"
    }
    
    emitBluetoothStateChanged(stateString)
  }
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    let device: [String: Any] = [
      "id": peripheral.identifier.uuidString,
      "name": peripheral.name ?? "Dispositivo Desconocido",
      "rssi": RSSI.intValue,
      "advertisementData": advertisementData
    ]
    
    emitDeviceConnected(device)
  }
  
  func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
    peripheral.delegate = self
    peripheral.discoverServices(nil)
    connectedPeripherals.append(peripheral)
    
    let device: [String: Any] = [
      "id": peripheral.identifier.uuidString,
      "name": peripheral.name ?? "Dispositivo Conectado",
      "isConnected": true
    ]
    
    emitDeviceConnected(device)
  }
  
  func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
    emitConnectionError(error?.localizedDescription ?? "Error desconocido")
  }
  
  func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
    if let index = connectedPeripherals.firstIndex(of: peripheral) {
      connectedPeripherals.remove(at: index)
    }
    
    emitDeviceDisconnected(peripheral.identifier.uuidString)
  }
}

// MARK: - CBPeripheralDelegate

extension WearableModule: CBPeripheralDelegate {
  func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
    guard error == nil else {
      emitConnectionError("Error descubriendo servicios: \(error!.localizedDescription)")
      return
    }
    
    for service in peripheral.services ?? [] {
      peripheral.discoverCharacteristics(nil, for: service)
    }
  }
  
  func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
    guard error == nil else {
      emitConnectionError("Error descubriendo características: \(error!.localizedDescription)")
      return
    }
    
    for characteristic in service.characteristics ?? [] {
      if characteristic.properties.contains(.read) {
        peripheral.readValue(for: characteristic)
      }
      
      if characteristic.properties.contains(.notify) {
        peripheral.setNotifyValue(true, for: characteristic)
      }
    }
  }
  
  func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
    guard error == nil else {
      emitConnectionError("Error leyendo valor: \(error!.localizedDescription)")
      return
    }
    
    guard let data = characteristic.value else { return }
    
    // Parsear datos según el tipo de característica
    let healthData = parseHealthData(from: data, characteristic: characteristic)
    if let healthData = healthData {
      emitHealthDataReceived(healthData)
    }
  }
  
  private func parseHealthData(from data: Data, characteristic: CBCharacteristic) -> [String: Any]? {
    // Implementar parsing específico según el UUID de la característica
    // Esto dependerá del protocolo del dispositivo específico
    
    switch characteristic.uuid.uuidString {
    case "2A37": // Heart Rate Measurement
      return parseHeartRateData(data)
    case "2A6D": // Step Count
      return parseStepCountData(data)
    default:
      return nil
    }
  }
  
  private func parseHeartRateData(_ data: Data) -> [String: Any]? {
    guard data.count >= 2 else { return nil }
    
    let flags = data[0]
    let isUint16 = (flags & 0x01) != 0
    
    var heartRate: Int
    if isUint16 {
      guard data.count >= 3 else { return nil }
      heartRate = Int(data[1]) + (Int(data[2]) << 8)
    } else {
      heartRate = Int(data[1])
    }
    
    return [
      "type": "heart_rate",
      "value": heartRate,
      "unit": "bpm",
      "timestamp": Date().timeIntervalSince1970
    ]
  }
  
  private func parseStepCountData(_ data: Data) -> [String: Any]? {
    guard data.count >= 4 else { return nil }
    
    let steps = data.withUnsafeBytes { $0.load(as: UInt32.self) }
    
    return [
      "type": "steps",
      "value": Int(steps),
      "unit": "steps",
      "timestamp": Date().timeIntervalSince1970
    ]
  }
} 