import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation';
//import { App } from './src/NotificationEdit.js';



export class NotificationEdit extends React.Component {

  static navigationOptions = ({ navigation }) => {
    //title: 'Editar Notificación',

  };
  

  componentDidMount = () => {
    var n = this.props.navigation.getParam('selectedNotification', 'NO-SELECTED');
    console.log('PARAMS en componentDidMount: ' + this.props.navigation.getParam('selectedNotification'));
    this.setState({ notification: this.props.navigation.getParam('selectedNotification')});
  }


  constructor(props) {
    super();
    this.state = { notification: props.navigation.getParam('selectedNotification', 'NO-SELECTED'), notificationTitle: props.navigation.getParam('selectedNotification').subject.title };
    this.saveChanges = this.saveChanges.bind(this);
  }


  changeTitle = (newTitle) => {
    this.setState({notificationTitle: newTitle}) 
    
  }

  saveChanges = () => {
    let notification = this.state.notification;
    notification.subject.title = this.state.notificationTitle;
    this.setState({ notification });
    //console.log('NOTIFICACION ACTUALIZADA: ' + JSON.stringify(this.state.notification, null, 1));
    //this.props.navigation
    //this.props.navigation.navigate('Home');


    this.props.navigation.goBack();
    this.props.navigation.state.params.onUpdateNotif({ selectedNotification: this.state.notification });
  }

  render() {
    return(
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray'}}
          onChangeText={(text) => this.changeTitle(text)}
          value={this.state.notificationTitle}
        />
        <TouchableOpacity style={{backgroundColor: '#247BA0'}} onPress={this.saveChanges}>
          <Text> Guardar Cambios </Text>
        </TouchableOpacity>
      </View>
    )
  }

}