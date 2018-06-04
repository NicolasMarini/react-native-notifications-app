import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Notification } from '../Notification';
import { NotificationEdit } from '../NotificationEdit';
import { GestureHandler } from 'expo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import thunk from 'redux-thunk';


//export class HomePresentation extends React.Component {


const HomePresentation = (props) => {

  const showHideLoading = () => {
    if (props.notifications.isLoading) {
      return (
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
      )
    }
  }

  keyExtractor = (item, index) => item.id;
  
  console.log('PROPS: ' + JSON.stringify(props, null, 1));


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.showAllNotifications()} style={styles.button}>
        <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontFamily: 'Roboto' }}> Mostrar Issues</Text>
      </TouchableOpacity>
      {showHideLoading()}
      <FlatList data={props.notifications.notifications}
        renderItem={({ item }) => {
          return (
            <Notification key={item.id}
              id={item.id}
              title={item.subject.title}
              deleteItem={this.deleteItem}
              selectedNotification={item}
              goToEdit={this.goToEdit}
              onSaveChanges={this.onSaveChanges}
              key={item.id}
            />
          )
        }}
        keyExtractor={this.keyExtractor}
        //extraData={this.state} 
        >
      </FlatList>
    </View>
  );
}

HomePresentation.navigationOptions = {
  title: 'Home'
};

//}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFCFF',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  button: {
    marginTop: 50,
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


export { HomePresentation };
