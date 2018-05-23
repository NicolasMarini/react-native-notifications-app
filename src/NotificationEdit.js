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
  
  constructor(props) {
    super();
    this.state = { notification: null };
    this.saveChanges = this.saveChanges.bind(this);
  }


  saveChanges = (n) => {
    this.setState({ notification: n }); 
    console.log('PARAM: ' + JSON.stringify(this.state.notification, null, 1));
  }

  render() {

    const n = this.props.navigation.getParam('selectedNotification', 'NO-SELECTED');
    
    
    //console.log('PARAM: ' + JSON.stringify(this.state.notification, null, 1));
    return(
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray'}}
          //onChangeText={(text) => this.setState({ text })}
          value={n.subject.title}
        />
        <TouchableOpacity style={{backgroundColor: '#247BA0'}} onPress={this.saveChanges}>
          <Text> Guardar Cambios </Text>
        </TouchableOpacity>
      </View>
    )
  }

}