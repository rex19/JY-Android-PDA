import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';


import Login from './src/components/login/index'
import Traceability from './src/components/traceability/index'
import MiddleMenu from './src/components/middleMenu/index'
import WorkOrder from './src/components/workOrder/index'

export default class JyPDAProject extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },

});


const MainScreen = StackNavigator({
  JyPDAProject: {
    screen: JyPDAProject,
  },
  Login: {
    screen: Login,
  },
  MiddleMenu: {
    screen: MiddleMenu,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  WorkOrder: {
    screen: WorkOrder,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  Traceability: {
    screen: Traceability,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },

});


AppRegistry.registerComponent('jyPDAProject', () => MainScreen);
