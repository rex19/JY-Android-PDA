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
// import ResultReport from './src/components/resultReport/index'

export default class JyPDAProject extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation}  />
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
    backgroundColor: '#F5FCFF',
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
