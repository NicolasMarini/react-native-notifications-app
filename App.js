import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, FlatList, ActivityIndicator } from 'react-native';
import { Notificacion } from './Notificacion.js';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';



const url =  "https://api.github.com/notifications?all=true";

const headers = {
  headers: {
    'Authorization': 'token 4eb0bd1bafc0acb9ed588f57399817d4f3e091b8'
  }
};

export default class App extends React.PureComponent {

  constructor(props) {
    super();
    this.onPress = this.onPress.bind(this);
    this.state = { notifications: [], pan: new Animated.ValueXY(), selectedNotification: null, animating: false };
  }

  keyExtractor = (item, index) => item.id;

  onPress () {
    this.setState({animating: true});

     return fetch(url, headers)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then ( (responseJson) => {
      this.setState({ animating: false });
      console.log(this.state.animating);
      this.update(responseJson);
    })
    .catch((error) => {
      this.setState({ animating: false });
      console.error('ERROR: ' + error);
    });
  }

  deleteItem = (itemId) => {
    console.log(itemId);
    const n = this.state.notifications.filter(notif => {
      return notif.id == itemId;
    })

    const resultList = this.state.notifications.filter(notif => {
      return notif.id != itemId;
    })
    console.log('NOTIFICACION ELIMINADA: ' + n[0].id);
    this.setState({notifications: resultList});
  }

  update(notifications) {
    this.setState({notifications: notifications});
      //console.log(notifications);
  }


  render() {
    const issuesTitles = this.state.notifications.map(notif => {
      return (
        <Notificacion key={notif.id} title={notif.subject.title} deleteItem={this.deleteItem}> </Notificacion>
      )
    });

    const showHideLoading =  () => {
      if(this.state.animating) {
        return(
          <ActivityIndicator size="large" color="#0000ff" animating={true} />
        )
      }
      return null;
    
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontFamily: 'Roboto'}}> Mostrar Issues</Text>
        </TouchableOpacity>
        {showHideLoading()}
        <FlatList data={this.state.notifications} renderItem={({item}) => {
          return (
            <Notificacion key={item.id} id={item.id} title={item.subject.title} deleteItem={this.deleteItem}> </Notificacion>
          )
        }} 
          keyExtractor={this.keyExtractor} extraData={this.state} >    
        </FlatList>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFCFF',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  button: {
    marginTop:50,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 17,
    backgroundColor: '#50514F',
    padding: 10,
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
