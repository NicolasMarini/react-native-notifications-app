import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const url =  "https://api.github.com/notifications?all=true";

const headers = {
  headers: {
    'Authorization': 'token 2319947d68635e8badad5c11636c4e9507a20802'
  }
};

export default class App extends React.Component {

  constructor(props) {
    super();
    this.onPress = this.onPress.bind(this);
    this.state = {notifications: []};
  }

  onPress = () => {
     return fetch(url, headers)
    .then((response) => {
      console.log(response);
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

  update(not) {
    this.setState({notifications: not});
  }

  render() {
    return (
      <View style={styles.container}>
        
        <TouchableOpacity onPress={this.onPress}>
        <Text> Press</Text>
        </TouchableOpacity>
        { this.state.notifications.map(notif => {
        return <Text key={notif.id}> {notif.subject.title}
        </Text>})
      }

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
