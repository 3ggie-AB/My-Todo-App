import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimeListScreen from './screens/AnimeListScreen';
import ProfileScreen from './screens/ProfileScreen';
import TodoListScreen from './screens/TodoListScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name == 'Anime List') {
              iconName = 'film';
            } else if (route.name == 'Profile') {
              iconName = 'person';
            }else if (route.name == 'Todo List') {
              iconName = 'list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Anime List" component={AnimeListScreen} />
        <Tab.Screen name="Todo List" component={TodoListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
