import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { Notificacion } from './Notificacion.js';


const url =  "https://api.github.com/notifications?all=true";

const headers = {
  headers: {
    'Authorization': 'token e792ef80103db2a8e9e2cf7cc1b9aaf702c6679b'
  }
};

export default class App extends React.Component {

  constructor(props) {
    super();
    this.onPress = this.onPress.bind(this);
    this.state = { notifications: [], pan: new Animated.ValueXY()};

  }

  onPress = () => {
     return fetch(url, headers)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then ( (responseJson) => {
      console.log(responseJson);
      this.update(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  update(notifications) {
    this.setState({notifications: notifications});
  }

  render() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let imageStyle = { transform: [{ translateX }, { translateY }] };

    const issuesTitles = this.state.notifications.map(notif => {
      return (
        <Notificacion key={notif.id} title={notif.subject.title}> </Notificacion>
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
