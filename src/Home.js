import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Notification } from './Notification.js';
import { NotificationEdit } from './NotificationEdit.js';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';




const url =  "https://api.github.com/notifications?all=true";

const headers = {
  headers: {
    'Authorization': 'token 958999e4e66fd5422898b022b20cf82fa1c61ee3'
  }
};

export class Home extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super();

    this.state = { notifications: [], pan: new Animated.ValueXY(), selectedNotification: null, animating: false, nav: null };
    this.onPress = this.onPress.bind(this);
    this.onSaveChanges = this.onSaveChanges.bind(this);
  }




  keyExtractor = (item, index) => item.id;

  onPress () {
    this.setState({animating: true});

     return fetch(url, headers)
    .then((response) => {
      return response.json();
    })
    .then ( (responseJson) => {
      //console.log(responseJson);
      this.setState({ animating: false });
      this.update(responseJson);
    })
    .catch((error) => {
      this.setState({ animating: false });
      console.error('ERROR: ' + error);
    });
  }

  deleteItem = (itemId) => {
    console.log('ELIMINADA: ' + itemId);
    const resultList = this.state.notifications.filter(notif => {
      return notif.id != itemId;
    })
    this.setState({notifications: resultList});
  }

  update(notifications) {
    this.setState({notifications: notifications});
      //console.log(notifications);
  }

  goToEdit = (selectedNotification) => {
    this.props.navigation.navigate('NotificationEdit', {selectedNotification: selectedNotification});
  }

  onSaveChanges = (notification) => {
    this.setState({selectedNotification: notification});
  }

  render() {
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
        <FlatList data={this.state.notifications} 
          renderItem={({item}) => {
          return (
            <Notification key={item.id} 
                          id={item.id} 
                          title={item.subject.title}
                          deleteItem={this.deleteItem} 
                          selectedNotification={item}
                          goToEdit={this.goToEdit}
              onSaveChanges={this.onSaveChanges}
            />
          )
        }} 
          keyExtractor={this.keyExtractor} 
          extraData={this.state} >    
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
