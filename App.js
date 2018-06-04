import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Notification } from './src/Notification';
import { NotificationEdit } from './src/NotificationEdit';
import { Home } from './src/Home';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';


const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  NotificationEdit: { screen: NotificationEdit },
  
},  
{
  initialRouteName: 'Home',
});

export default class App extends React.Component {

  constructor(props) {
    super();
   
  }

  
  

  render() {
    return <AppNavigator />
    
  }
}

