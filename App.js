import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, RectButton } from 'react-native';
import { Notificacion } from './Notificacion.js';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';



const url =  "https://api.github.com/notifications?all=true";

const headers = {
  headers: {
    'Authorization': 'token 7ea8ad3e80b0170f9f058cfc0fa796c5daff34ef'
  }
};

export default class App extends React.Component {

  constructor(props) {
    super();
    this.onPress = this.onPress.bind(this);
    this.state = { notifications: [], pan: new Animated.ValueXY()};
  }


  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton >
        <Animated.Text
          style={[
 
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };


  onPress = () => {
     return fetch(url, headers)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then ( (responseJson) => {
    
      this.update(responseJson);
    })
    .catch((error) => {
      console.error('ERROR: ' + error);
    });
  }

  update(notifications) {
    this.setState({notifications: notifications});
      console.log(notifications);
  }

  render() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let imageStyle = { transform: [{ translateX }, { translateY }] };

    const issuesTitles = this.state.notifications.map(notif => {
      return (
        <Swipeable renderLeftActions={this.renderLeftActions}>
          <Notificacion key={notif.id} title={notif.subject.title}> </Notificacion>
        </Swipeable>
      )
    })


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text> Mostrar Issues</Text>
        </TouchableOpacity>
        <ScrollView>  
          { issuesTitles }
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop:50,
    backgroundColor: '#fff',
    padding: 10
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  }
});
