import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Notification } from '../Notification';
import { NotificationEdit } from '../NotificationEdit.js';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

// Import Action Creators
import { showAll } from '../../actions/notificationActions';
import { HomePresentation } from './HomePresentation';




const url = 'https://api.github.com/notifications?all=true';

const headers = {
  headers: {
    'Authorization': 'token f0a7cd620c4dc042525883e79037ff73e99f6cdb'
  }
};

export class HomeContainer extends React.Component {

  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super();

    this.state = { notifications: [], pan: new Animated.ValueXY(), selectedNotification: null, animating: false, nav: null };
    //this.onPress = this.onPress.bind(this);
    //this.onSaveChanges = this.onSaveChanges.bind(this);
    //this.onUpdateNotif = this.onUpdateNotif.bind(this);
  }

  render() {
    return 

      null

    
  }
}


const showAllNotifications = () => {
  showAll();
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    isLoading: state.isLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showAllNotifications: () => dispatch(showAll())

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePresentation);
