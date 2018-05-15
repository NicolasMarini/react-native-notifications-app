import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, PanResponder, Animated } from 'react-native';



export class Notificacion extends React.Component {

  constructor(props) {
    super();
    //this.onPress = this.onPress.bind(this);
    this.state = { notifications: [], pan: new Animated.ValueXY() };
  }


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

  /*
  getTitle() {
    return (
      <Animated.View key={this.props.id} {...this._panResponder.panHandlers} style={imageStyle}>
        <Text style={styles.item}> {notif.subject.title}
        </Text>
    </Animated.View>
    
  )};
*/
  render() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let imageStyle = { transform: [{ translateX }, { translateY }] };
    return (
      <Animated.View key={this.props.id} {...this._panResponder.panHandlers} style={imageStyle}>
        <Text style={styles.item}> {this.props.title}
        </Text>
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
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

