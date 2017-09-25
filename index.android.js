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
// import ResultReport from './src/components/resultReport/index'

export default class JyPDAProject extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation}  />
        {/* <WorkOrder /> */}
        {/* <Traceability />  */}
        {/* <ResultReport />  */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },

});


const MainScreen = StackNavigator({
  JyPDAProject: {
    screen: JyPDAProject,
    // navigationOptions: ({ navigation }) => ({
    //   title: navigation.state.params.name,
    //   headerTitleStyle: {
    //     alignSelf: 'center'
    //   }
    // }),
  },
  Login: {
    screen: Login,
    // navigationOptions: ({ navigation }) => ({
    //   title: navigation.state.params.name,
    //   headerTitleStyle: {
    //     alignSelf: 'center'
    //   }
    // }),
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
      // username:navigation.state.params.username,
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },

});


AppRegistry.registerComponent('jyPDAProject', () => MainScreen);
