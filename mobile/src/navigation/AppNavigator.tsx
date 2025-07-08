import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Pantallas principales
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import WearablesScreen from '../screens/WearablesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from '../screens/ProgressScreen';
import NutritionScreen from '../screens/NutritionScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CalendarScreen from '../screens/CalendarScreen';
import PlanScreen from '../screens/PlanScreen';

// Pantallas de autenticación
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Pantallas de wearables
import WearableDetailScreen from '../screens/wearables/WearableDetailScreen';
import DeviceConnectionScreen from '../screens/wearables/DeviceConnectionScreen';
import HealthDataScreen from '../screens/wearables/HealthDataScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Navegador de pestañas principal
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            case 'Workouts':
              iconName = focused ? 'fitness' : 'fitness-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            case 'Wearables':
              iconName = focused ? 'watch' : 'watch-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            case 'Progress':
              iconName = focused ? 'trending-up' : 'trending-up-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            default:
              return <Ionicons name="ellipse" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Workouts" 
        component={WorkoutsScreen}
        options={{ title: 'Entrenamientos' }}
      />
      <Tab.Screen 
        name="Wearables" 
        component={WearablesScreen}
        options={{ title: 'Dispositivos' }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: 'Progreso' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

// Navegador de drawer para pantallas adicionales
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#667eea',
        drawerInactiveTintColor: '#666',
        drawerStyle: {
          backgroundColor: 'white',
          width: 280,
        },
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{ 
          title: 'Fitness App',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="fitness" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Nutrition" 
        component={NutritionScreen}
        options={{
          title: 'Nutrición',
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="apple-alt" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          title: 'Analíticas',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{
          title: 'Comunidad',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          title: 'Calendario',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Plan" 
        component={PlanScreen}
        options={{
          title: 'Plan de Entrenamiento',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Navegador de wearables
const WearablesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="WearablesMain" 
        component={WearablesScreen}
        options={{ title: 'Dispositivos' }}
      />
      <Stack.Screen 
        name="WearableDetail" 
        component={WearableDetailScreen}
        options={{ title: 'Detalles del Dispositivo' }}
      />
      <Stack.Screen 
        name="DeviceConnection" 
        component={DeviceConnectionScreen}
        options={{ title: 'Conectar Dispositivo' }}
      />
      <Stack.Screen 
        name="HealthData" 
        component={HealthDataScreen}
        options={{ title: 'Datos de Salud' }}
      />
    </Stack.Navigator>
  );
};

// Navegador principal de la aplicación
const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Verificar autenticación al cargar
  React.useEffect(() => {
    // Aquí se verificaría el estado de autenticación
    // Por ahora, asumimos que el usuario está autenticado
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="WearablesStack" component={WearablesStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 