import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Card, WingBlank, WhiteSpace, Button, Picker, List, Grid, Toast, Flex } from 'antd-mobile';
// import test1 from '../../img/test1.jpg';
// import test2 from '../../img/test2.jpg';
// let test1 = '../../img/test1.jpg'
// let test2 = '../../img/test2.jpg'

const lineObj = [
  {
    label: '1线',
    value: 'line1',
  }, {
    label: '2线',
    value: 'line2',
  }
];
//icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505907451873&di=1eaace4fb1b1575756da9384f0d16507&imgtype=0&src=http%3A%2F%2Fimg.lenovomm.com%2Fs3%2Fimg%2Fapp%2Fapp-img-lestore%2F9100-2015-12-25105310-1451083990085.jpg%3FisCompress%3Dtrue%26width%3D200%26height%3D333%26quantity%3D0.8%26rotate%3Dtrue%26from%3D3gw',
//icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505907143803&di=49c0cc9bc5b4dae832657c525c9560ff&imgtype=0&src=http%3A%2F%2Fcdns2.freepik.com%2Ffree-photo%2Ffingerprint-ongoing-scanning_318-42483.jpg',
//
const data = [
  {
    // icon: test1,
    text: `工单`,
  },
  {
    // icon: test2,
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
    // this.props.navigation.navigate('Login')
    this.props.navigation.goBack();
  }


  handleClickStation(index) {
    console.log('handleClickStation', index, this.props.navigation.state.params.userName)
    if (this.state.lineName.length === 0) {
      console.log('lineName===0', this.state.lineName)
      Toast.fail('请先选择线体名😉', 1);
    } else if (this.state.lineName.length === 1) {
      index === 0 ? this.props.navigation.navigate('WorkOrder', { name: '工单激活', userName: this.props.navigation.state.params.userName, lineName: this.state.lineName })
        : this.props.navigation.navigate('Traceability', { name: '追溯记录', userName: this.props.navigation.state.params.userName })
    }
  }
  // this.props.navigation.navigate('Traceability', { name: '交运追溯系统', userName: username })
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
    // padding: '30px 0 18px 0'
  },

  viewClass: {
    width: '100%',
    height: 140,
    //color: '#e6e6e6',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#0090e5',
    borderColor: '#0090e5',
  },
  textClass: {
    //backgroundColor: '#3783F1',
    color: '#FBFDFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '40%',
    fontSize: 20,
  },
  quitButton: {
    marginTop: 20
  }
  // lineSelect:{
  //   marginBottom:'10%'
  // },
  // viewBox:{
  //   display:'flex',
  //   width:'600px',
  //   height:'230px',
  //   backgroundColor: '#ccc',
  //   justifyContent:' space-around',
  //   alignItems:'baseline',
  //   flexFlow:' row wrap',
  //   alignContent:' space-between'
  // },
  //   <View className={styles.subTitle}>
  //   <Text>菜单</Text>
  //   <Grid style={styles.textClass} data={data} columnNum={2} isCarousel carouselMaxRow={4} onClick={this.handleClickStation.bind(this)} />
  //   <WhiteSpace size="lg" />
  // </View>

});
