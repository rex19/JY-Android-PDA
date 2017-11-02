import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Card, WingBlank, WhiteSpace, Button, Picker, List, Grid, Toast, Flex } from 'antd-mobile';


const lineObj = [
  {
    label: '1线',
    value: 'line1',
  }, {
    label: '2线',
    value: 'line2',
  }
];

const data = [
  {
    text: `工单`,
  },
  {
    text: `扫料`,
  }
]
export default class MiddleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lineName: [],
    };
  }

  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: lineObj,
      });
    }, 500);
  }
  onChange = (lineName) => {
    this.setState({ lineName });
  }
  quit = () => {
    console.log('quit')
    this.props.navigation.goBack();
  }


  handleClickStation(index) {
    console.log('handleClickStation', index, this.props.navigation.state.params.userName)
    if (this.state.lineName.length === 0) {
      console.log('lineName===0', this.state.lineName)
      Toast.fail('请先选择线体名😉', 1);
    } else if (this.state.lineName.length === 1) {
      index === 0 ? this.props.navigation.navigate('WorkOrder', { name: '工单激活', userName: this.props.navigation.state.params.userName, lineName: this.state.lineName })
        : this.props.navigation.navigate('Traceability', { name: '追溯记录', userName: this.props.navigation.state.params.userName, lineName: this.state.lineName })
    }
  }
  render() {
    return (
      <View >
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <List>
            <Picker
              data={this.state.data}
              cols={1}
              value={this.state.lineName}
              onChange={this.onChange}
            >
              <List.Item arrow="horizontal" last onClick={this.onClick}>线体选择</List.Item>
            </Picker>
          </List>
          <WhiteSpace size="lg" />

          <WingBlank style={{ marginTop: 20, marginBottom: 5 }} >
            <Text style={styles.subTitle}>菜单</Text>
          </WingBlank>

          <WingBlank >
            <Flex>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }} >
                <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 0)}>
                  <View style={styles.viewClass} >
                    <Text style={styles.textClass}>工单</Text>
                  </View>
                </TouchableHighlight>
              </Flex.Item>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 1)}>

                  <View style={styles.viewClass}  >
                    <Text style={styles.textClass}>扫料</Text>
                  </View>
                </TouchableHighlight>
              </Flex.Item>
            </Flex>
            <Button type='ghost' style={styles.quitButton}
              onClick={() => this.quit()}
            >{this.props.navigation.state.params.userName},退出登陆</Button>
          </WingBlank>
        </WingBlank>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 10,
    fontSize: 20,
  },

  viewClass: {
    width: '100%',
    height: 140,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#0090e5',
    borderColor: '#0090e5',
  },
  textClass: {
    color: '#FBFDFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '40%',
    fontSize: 20,
  },
  quitButton: {
    marginTop: 20
  }

});
