import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  Animated,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WearableService, { WearableDevice, HealthData, SyncResult } from '../../services/WearableService';

const { width, height } = Dimensions.get('window');

interface WearablesScreenProps {
  navigation: any;
}

const WearablesScreen: React.FC<WearablesScreenProps> = ({ navigation }) => {
  const [devices, setDevices] = useState<WearableDevice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [syncStatus, setSyncStatus] = useState<{ [key: string]: SyncResult }>({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    initializeWearables();
    startPulseAnimation();
  }, []);

  const initializeWearables = async () => {
    try {
      setIsInitializing(true);
      const success = await WearableService.initialize();
      
      if (success) {
        const connectedDevices = WearableService.getConnectedDevices();
        setDevices(connectedDevices);
        loadHealthData();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo inicializar el servicio de wearables');
    } finally {
      setIsInitializing(false);
      animateIn();
    }
  };

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadHealthData = async () => {
    try {
      // Cargar datos guardados en AsyncStorage
      // Esto se implementaría con AsyncStorage
      setHealthData([]);
    } catch (error) {
      console.error('Error cargando datos de salud:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await initializeWearables();
    setRefreshing(false);
  };

  const connectDevice = async (deviceType: string) => {
    setIsLoading(true);
    try {
      let device: WearableDevice;

      switch (deviceType) {
        case 'apple_watch':
          device = await WearableService.connectAppleWatch();
          break;
        case 'google_fit':
          device = await WearableService.connectGoogleFit();
          break;
        default:
          Alert.alert('Error', 'Tipo de dispositivo no soportado');
          return;
      }

      setDevices(prev => [...prev, device]);
      Alert.alert('Éxito', `${device.name} conectado correctamente`);
    } catch (error) {
      Alert.alert('Error', `No se pudo conectar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const syncDevice = async (deviceId: string) => {
    setIsLoading(true);
    try {
      const result = await WearableService.syncHealthData(deviceId);
      setSyncStatus(prev => ({ ...prev, [deviceId]: result }));
      
      if (result.success) {
        Alert.alert('Sincronización', `Se sincronizaron ${result.dataCount} registros`);
        loadHealthData();
      } else {
        Alert.alert('Error', `Error en sincronización: ${result.errors.join(', ')}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error sincronizando: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectDevice = async (deviceId: string) => {
    Alert.alert(
      'Desconectar',
      '¿Estás seguro de que quieres desconectar este dispositivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desconectar',
          style: 'destructive',
          onPress: async () => {
            try {
              await WearableService.disconnectDevice(deviceId);
              setDevices(prev => prev.filter(d => d.id !== deviceId));
              Alert.alert('Éxito', 'Dispositivo desconectado');
            } catch (error) {
              Alert.alert('Error', `Error desconectando: ${error.message}`);
            }
          },
        },
      ]
    );
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'apple_watch':
        return <Ionicons name="watch" size={24} color="#007AFF" />;
      case 'fitbit':
        return <FontAwesome5 name="heartbeat" size={24} color="#00B0B9" />;
      case 'garmin':
        return <FontAwesome5 name="running" size={24} color="#FF6B35" />;
      case 'samsung':
        return <Ionicons name="phone-portrait" size={24} color="#1428A0" />;
      case 'xiaomi':
        return <FontAwesome5 name="band-aid" size={24} color="#FF6700" />;
      case 'google_fit':
        return <FontAwesome5 name="google" size={24} color="#4285F4" />;
      default:
        return <Ionicons name="watch" size={24} color="#666" />;
    }
  };

  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'apple_watch':
        return ['#007AFF', '#0056CC'];
      case 'fitbit':
        return ['#00B0B9', '#008A91'];
      case 'garmin':
        return ['#FF6B35', '#E55A2B'];
      case 'samsung':
        return ['#1428A0', '#0F1F7A'];
      case 'xiaomi':
        return ['#FF6700', '#E55A00'];
      case 'google_fit':
        return ['#4285F4', '#3367D6'];
      default:
        return ['#666', '#444'];
    }
  };

  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.loadingGradient}
        >
          <Animated.View style={[styles.loadingIcon, { transform: [{ scale: pulseAnim }] }]}>
            <Ionicons name="watch" size={60} color="white" />
          </Animated.View>
          <Text style={styles.loadingText}>Inicializando wearables...</Text>
          <ActivityIndicator size="large" color="white" style={styles.spinner} />
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerText}>
            <Text style={styles.title}>Wearables</Text>
            <Text style={styles.subtitle}>Conecta tus dispositivos fitness</Text>
          </View>
          
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={onRefresh}
            disabled={refreshing}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.contentInner, { opacity: fadeAnim }]}>
          {/* Dispositivos Conectados */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dispositivos Conectados</Text>
            {devices.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="watch-outline" size={48} color="#999" />
                <Text style={styles.emptyText}>No hay dispositivos conectados</Text>
                <Text style={styles.emptySubtext}>Conecta tu primer wearable para comenzar</Text>
              </View>
            ) : (
              devices.map((device) => (
                <View key={device.id} style={styles.deviceCard}>
                  <LinearGradient
                    colors={getDeviceColor(device.type)}
                    style={styles.deviceGradient}
                  >
                    <View style={styles.deviceHeader}>
                      <View style={styles.deviceInfo}>
                        {getDeviceIcon(device.type)}
                        <View style={styles.deviceDetails}>
                          <Text style={styles.deviceName}>{device.name}</Text>
                          <Text style={styles.deviceStatus}>
                            {device.isConnected ? 'Conectado' : 'Desconectado'}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.deviceActions}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => syncDevice(device.id)}
                          disabled={isLoading}
                        >
                          <Ionicons name="sync" size={20} color="white" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          style={[styles.actionButton, styles.disconnectButton]}
                          onPress={() => disconnectDevice(device.id)}
                        >
                          <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <View style={styles.deviceCapabilities}>
                      <Text style={styles.capabilitiesTitle}>Capacidades:</Text>
                      <View style={styles.capabilitiesList}>
                        {device.capabilities.map((capability, index) => (
                          <View key={index} style={styles.capabilityTag}>
                            <Text style={styles.capabilityText}>{capability}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    
                    {device.lastSync && (
                      <Text style={styles.lastSync}>
                        Última sincronización: {device.lastSync.toLocaleString()}
                      </Text>
                    )}
                  </LinearGradient>
                </View>
              ))
            )}
          </View>

          {/* Dispositivos Disponibles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conectar Nuevo Dispositivo</Text>
            
            <View style={styles.availableDevices}>
              <TouchableOpacity
                style={styles.deviceOption}
                onPress={() => connectDevice('apple_watch')}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#007AFF', '#0056CC']}
                  style={styles.deviceOptionGradient}
                >
                  <Ionicons name="watch" size={32} color="white" />
                  <Text style={styles.deviceOptionText}>Apple Watch</Text>
                  <Text style={styles.deviceOptionSubtext}>Sincroniza con HealthKit</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deviceOption}
                onPress={() => connectDevice('google_fit')}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#4285F4', '#3367D6']}
                  style={styles.deviceOptionGradient}
                >
                  <FontAwesome5 name="google" size={32} color="white" />
                  <Text style={styles.deviceOptionText}>Google Fit</Text>
                  <Text style={styles.deviceOptionSubtext}>Sincroniza con Google</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deviceOption}
                onPress={() => connectDevice('fitbit')}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#00B0B9', '#008A91']}
                  style={styles.deviceOptionGradient}
                >
                  <FontAwesome5 name="heartbeat" size={32} color="white" />
                  <Text style={styles.deviceOptionText}>Fitbit</Text>
                  <Text style={styles.deviceOptionSubtext}>Conectar vía Bluetooth</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deviceOption}
                onPress={() => connectDevice('garmin')}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#FF6B35', '#E55A2B']}
                  style={styles.deviceOptionGradient}
                >
                  <FontAwesome5 name="running" size={32} color="white" />
                  <Text style={styles.deviceOptionText}>Garmin</Text>
                  <Text style={styles.deviceOptionSubtext}>Conectar vía Bluetooth</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Datos de Salud */}
          {healthData.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Datos Recientes</Text>
              <View style={styles.healthDataContainer}>
                {healthData.slice(0, 5).map((data, index) => (
                  <View key={index} style={styles.healthDataItem}>
                    <View style={styles.healthDataIcon}>
                      <Ionicons
                        name={data.type === 'heart_rate' ? 'heart' : 'fitness'}
                        size={20}
                        color="#667eea"
                      />
                    </View>
                    <View style={styles.healthDataInfo}>
                      <Text style={styles.healthDataValue}>
                        {data.value} {data.unit}
                      </Text>
                      <Text style={styles.healthDataType}>
                        {data.type.replace('_', ' ').toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.healthDataTime}>
                      {new Date(data.timestamp).toLocaleTimeString()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Procesando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  refreshButton: {
    padding: 8,
  },

  // Content
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
  },

  // Sections
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },

  // Device Cards
  deviceCard: {
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  deviceGradient: {
    padding: 20,
    borderRadius: 12,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceDetails: {
    marginLeft: 12,
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  deviceStatus: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  deviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disconnectButton: {
    backgroundColor: 'rgba(255,59,48,0.8)',
  },
  deviceCapabilities: {
    marginBottom: 10,
  },
  capabilitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  capabilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  capabilityTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  capabilityText: {
    fontSize: 12,
    color: 'white',
  },
  lastSync: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },

  // Available Devices
  availableDevices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deviceOption: {
    width: (width - 60) / 2,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  deviceOptionGradient: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  deviceOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  deviceOptionSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    textAlign: 'center',
  },

  // Health Data
  healthDataContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  healthDataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  healthDataIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  healthDataInfo: {
    flex: 1,
  },
  healthDataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  healthDataType: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  healthDataTime: {
    fontSize: 12,
    color: '#999',
  },

  // Loading States
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  spinner: {
    marginTop: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WearablesScreen; 