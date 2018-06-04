import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Notification } from './src/components/Notification';
import { NotificationEdit } from './src/components/NotificationEdit';
import { Home } from './src/components/Home';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';
import { notificationsReducer } from './src/reducers/Notifications';

import { combineReducers, applyMiddleware } from 'redux'
import { createStore } from "redux";
import { Provider } from "react-redux";
import { createLogger } from 'redux-logger'

import HomeContainer from "./src/components/Home/HomeContainer";

import thunkMiddleware from 'redux-thunk';

const url =  "https://api.github.com/notifications?all=true";

const headers = {
  headers: {
    'Authorization': 'token 2d4077edb48f1c9e10233664e84f006dc346c9c4'
  }
};


const AppNavigator = createStackNavigator({
  Home: { screen: HomeContainer },
  NotificationEdit: { screen: NotificationEdit },
  
},  
{
  initialRouteName: 'Home',
});


const app = combineReducers({
  notifications: notificationsReducer
});

//const loggerMiddleware = createLogger();
const store = createStore(app, applyMiddleware(thunkMiddleware));


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
