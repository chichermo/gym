import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HealthData } from '../../services/WearableService';

const { width, height } = Dimensions.get('window');

interface RealTimeDataProps {
  healthData: HealthData[];
  isConnected: boolean;
}

const RealTimeData: React.FC<RealTimeDataProps> = ({ healthData, isConnected }) => {
  const [selectedMetric, setSelectedMetric] = useState<'steps' | 'heart_rate' | 'calories'>('steps');
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('24h');
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startPulseAnimation();
    animateIn();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
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

  const animateIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const getMetricData = () => {
    const filteredData = healthData.filter(data => data.type === selectedMetric);
    
    // Agrupar datos por hora para el gráfico
    const groupedData = filteredData.reduce((acc, data) => {
      const hour = new Date(data.timestamp).getHours();
      if (!acc[hour]) acc[hour] = 0;
      acc[hour] += data.value;
      return acc;
    }, {} as { [key: number]: number });

    // Crear array de 24 horas
    const chartData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: groupedData[i] || 0,
    }));

    return chartData;
  };

  const getCurrentValue = () => {
    const todayData = healthData.filter(data => {
      const today = new Date();
      const dataDate = new Date(data.timestamp);
      return data.type === selectedMetric && 
             dataDate.toDateString() === today.toDateString();
    });

    return todayData.reduce((sum, data) => sum + data.value, 0);
  };

  const getMetricInfo = () => {
    switch (selectedMetric) {
      case 'steps':
        return {
          title: 'Pasos',
          unit: 'pasos',
          icon: 'footsteps',
          color: ['#4CAF50', '#45A049'],
          target: 10000,
        };
      case 'heart_rate':
        return {
          title: 'Frecuencia Cardíaca',
          unit: 'bpm',
          icon: 'heart',
          color: ['#F44336', '#D32F2F'],
          target: 60,
        };
      case 'calories':
        return {
          title: 'Calorías',
          unit: 'kcal',
          icon: 'flame',
          color: ['#FF9800', '#F57C00'],
          target: 2000,
        };
      default:
        return {
          title: 'Métrica',
          unit: '',
          icon: 'analytics',
          color: ['#2196F3', '#1976D2'],
          target: 0,
        };
    }
  };

  const chartData = getMetricData();
  const currentValue = getCurrentValue();
  const metricInfo = getMetricInfo();

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(102, 126, 234, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#667eea',
    },
  };

  const data = {
    labels: chartData.map(d => `${d.hour}h`),
    datasets: [
      {
        data: chartData.map(d => d.value),
        color: (opacity = 1) => `rgba(102, 126, 234, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const getProgressPercentage = () => {
    return Math.min((currentValue / metricInfo.target) * 100, 100);
  };

  const getStatusColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return '#4CAF50';
    if (percentage >= 75) return '#FF9800';
    return '#F44336';
  };

  if (!isConnected) {
    return (
      <View style={styles.disconnectedContainer}>
        <LinearGradient
          colors={['#f8f9fa', '#e9ecef']}
          style={styles.disconnectedGradient}
        >
          <Ionicons name="wifi-outline" size={48} color="#999" />
          <Text style={styles.disconnectedText}>No hay dispositivos conectados</Text>
          <Text style={styles.disconnectedSubtext}>
            Conecta un wearable para ver datos en tiempo real
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con métrica actual */}
        <LinearGradient
          colors={metricInfo.color}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.metricInfo}>
              <Ionicons name={metricInfo.icon as any} size={32} color="white" />
              <View style={styles.metricText}>
                <Text style={styles.metricTitle}>{metricInfo.title}</Text>
                <Text style={styles.metricValue}>
                  {currentValue.toLocaleString()} {metricInfo.unit}
                </Text>
              </View>
            </View>
            
            <Animated.View style={[styles.statusIndicator, { transform: [{ scale: pulseAnim }] }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            </Animated.View>
          </View>

          {/* Barra de progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${getProgressPercentage()}%`,
                    backgroundColor: getStatusColor(),
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {getProgressPercentage().toFixed(1)}% del objetivo ({metricInfo.target.toLocaleString()})
            </Text>
          </View>
        </LinearGradient>

        {/* Selector de métricas */}
        <View style={styles.metricSelector}>
          <TouchableOpacity
            style={[
              styles.metricButton,
              selectedMetric === 'steps' && styles.metricButtonActive
            ]}
            onPress={() => setSelectedMetric('steps')}
          >
            <Ionicons 
              name="footsteps" 
              size={20} 
              color={selectedMetric === 'steps' ? '#667eea' : '#666'} 
            />
            <Text style={[
              styles.metricButtonText,
              selectedMetric === 'steps' && styles.metricButtonTextActive
            ]}>
              Pasos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.metricButton,
              selectedMetric === 'heart_rate' && styles.metricButtonActive
            ]}
            onPress={() => setSelectedMetric('heart_rate')}
          >
            <Ionicons 
              name="heart" 
              size={20} 
              color={selectedMetric === 'heart_rate' ? '#667eea' : '#666'} 
            />
            <Text style={[
              styles.metricButtonText,
              selectedMetric === 'heart_rate' && styles.metricButtonTextActive
            ]}>
              Frecuencia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.metricButton,
              selectedMetric === 'calories' && styles.metricButtonActive
            ]}
            onPress={() => setSelectedMetric('calories')}
          >
            <Ionicons 
              name="flame" 
              size={20} 
              color={selectedMetric === 'calories' ? '#667eea' : '#666'} 
            />
            <Text style={[
              styles.metricButtonText,
              selectedMetric === 'calories' && styles.metricButtonTextActive
            ]}>
              Calorías
            </Text>
          </TouchableOpacity>
        </View>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Actividad de las últimas 24 horas</Text>
            <View style={styles.timeRangeSelector}>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  timeRange === '1h' && styles.timeButtonActive
                ]}
                onPress={() => setTimeRange('1h')}
              >
                <Text style={[
                  styles.timeButtonText,
                  timeRange === '1h' && styles.timeButtonTextActive
                ]}>
                  1H
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  timeRange === '6h' && styles.timeButtonActive
                ]}
                onPress={() => setTimeRange('6h')}
              >
                <Text style={[
                  styles.timeButtonText,
                  timeRange === '6h' && styles.timeButtonTextActive
                ]}>
                  6H
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  timeRange === '24h' && styles.timeButtonActive
                ]}
                onPress={() => setTimeRange('24h')}
              >
                <Text style={[
                  styles.timeButtonText,
                  timeRange === '24h' && styles.timeButtonTextActive
                ]}>
                  24H
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.chartWrapper}>
            <LineChart
              data={data}
              width={width - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withDots={true}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              decorator={() => null}
            />
          </View>
        </View>

        {/* Estadísticas rápidas */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estadísticas Rápidas</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4CAF50', '#45A049']}
                style={styles.statGradient}
              >
                <Ionicons name="trending-up" size={24} color="white" />
                <Text style={styles.statValue}>
                  {Math.max(...chartData.map(d => d.value))}
                </Text>
                <Text style={styles.statLabel}>Pico</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.statGradient}
              >
                <Ionicons name="analytics" size={24} color="white" />
                <Text style={styles.statValue}>
                  {Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length)}
                </Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.statGradient}
              >
                <Ionicons name="time" size={24} color="white" />
                <Text style={styles.statValue}>
                  {chartData.filter(d => d.value > 0).length}
                </Text>
                <Text style={styles.statLabel}>Horas Activas</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#9C27B0', '#7B1FA2']}
                style={styles.statGradient}
              >
                <Ionicons name="trophy" size={24} color="white" />
                <Text style={styles.statValue}>
                  {getProgressPercentage() >= 100 ? '¡Completado!' : 'En progreso'}
                </Text>
                <Text style={styles.statLabel}>Estado</Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Disconnected State
  disconnectedContainer: {
    flex: 1,
  },
  disconnectedGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  disconnectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  disconnectedSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },

  // Header
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    marginLeft: 12,
  },
  metricTitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  statusIndicator: {
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },

  // Metric Selector
  metricSelector: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  metricButtonActive: {
    backgroundColor: '#f0f4ff',
  },
  metricButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  metricButtonTextActive: {
    color: '#667eea',
    fontWeight: '600',
  },

  // Chart
  chartContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeButtonActive: {
    backgroundColor: '#667eea',
  },
  timeButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 12,
  },

  // Stats
  statsContainer: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statGradient: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
});

export default RealTimeData; 