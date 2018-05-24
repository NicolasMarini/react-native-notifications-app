import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation';






export class Notification extends React.PureComponent {

  constructor(props) {
    super();
    this.deleteItem = this.deleteItem.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
  }

  renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.buttonsContainer}>
        <BorderlessButton style={{ flex: 1}}>
          <TouchableOpacity onPress={this.deleteItem} style={styles.rightButton} >
            <Icon
              name='trash-o'
              size={30}
              color='white'
            />
          </TouchableOpacity>
        </BorderlessButton>
      </View>
    );
  };

  renderLeftActions = (progress, dragX) => {
    return (
      <View style={styles.leftButtonsContainer}>
        <BorderlessButton style={{ flex: 1}}>
          <TouchableOpacity onPress={this.goToEdit} style={styles.leftButton} >
            <Icon
              name='pencil-square-o'
              size={30}
              color='white'
            />
          </TouchableOpacity>
        </BorderlessButton>
      </View>
    );
  };


  deleteItem() {
    this.props.deleteItem(this.props.id);
  }

  goToEdit() {
    this.props.goToEdit(this.props.selectedNotification);
  }

  
  render() {
    return (
      <View>
        <Swipeable renderRightActions={this.renderRightActions} rightThreshold={80} friction={2}
                   renderLeftActions={this.renderLeftActions} > 
          <Text style={styles.item}> {this.props.title}
          </Text>    
        </Swipeable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    padding: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#247BA0',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#CAC4CE',
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  rightButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#CAC4CE',
    justifyContent: 'center'
  },
  leftButton: {
    flex: 1,
    backgroundColor: '#50514F',
    padding: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#CAC4CE',
    justifyContent: 'center'
  },
  buttonsContainer: {
    marginTop: 7,
    marginRight: 15,
    marginLeft: -15,
  },
  leftButtonsContainer: {
    marginTop: 7,
    marginRight: -15,
    marginLeft: 15,
  }

});



/*
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        //this.state.pan.setOffset(this.state.pan.__getValue());

        this.setState({ pan: { x: 0, y: 0 } });
      },

      onPanResponderMove: (evt, gestureState) => {
        this.setState({ pan: { x: gestureState.dx, y: 0} });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.setState({ pan: { x: 0, y: 0} });
        console.log('POS: ' + vx)
      }
    });
  }
  */
