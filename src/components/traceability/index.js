import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Accordion, Button, List, InputItem, WhiteSpace, Modal, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;

// let url = 'http://192.168.1.129:12345/api/select'
// let url = 'http://192.168.1.252/JYTrace/API/ApiSetupMaterial/'
let url = 'http://172.16.0.104/JYTrace/API/ApiSetupMaterial/'
let num = 1;
let ListSweepRecordArray = [];

// console.log('new Date',new Date().toLocaleString())
//x.substring(2,4)  截取字符串
export default class Traceability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationNoFocused: false,
      partNoFocused: false,
      stationNo: '',
      partNo: '',
      ListSweepRecord: [],
      userName: ''
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ userName: params.userName })

  }


  handeleStationNoChange = key => (value) => {
    this.setState({
      [key]: value,
    });
  };

  handleStationNoOnBlur = () => {
    this.setState({
      partNoFocused: true,
      stationNoFocused: false
    })
  }

  handlePartNoOnBlur = () => {
    this.setState({
      partNoFocused: false
    })
    //第一步先判断工站号是否为空
    if (this.state.stationNo !== '' && this.state.partNo !== '') {
      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ScannerId: 1,
          MaterialCode: this.state.partNo,
          LocationCode: this.state.stationNo,
          OperatorCode: this.state.userName,
          MaterialPartNumber: 1
        })
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('responseJson', responseJson)
        if (responseJson.ReturnCode === 0) {
          Toast.success(responseJson.Message, 1);
          this.writeLineSweepRecord(this.state.stationNo, this.state.partNo)
        } else if (responseJson.ReturnCode !== 0) {
          Toast.fail(responseJson.Message, 1);
          this.setState({
            stationNo: '',
            partNo: ''
          })
        }
      }).catch((error) => {
        console.log('error:', error)
        Toast.success('网络错误!', 1);
      })
    } else {
      Toast.fail('请输入工站号和物料号!', 1);
      // alert('请输入工站号和物料号!');
    }
  }

  handelePartNoChange = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  writeLineSweepRecord = (stationNo = '1', partNo = '1') => {
    if (stationNo === '1' && partNo === '1') {
      console.log('stationNo===1&&partNo===1')
    } else {
      if (this.state.ListSweepRecord.length === 0) {
        this.setState({
          ListSweepRecord: [<Item wrap key={0}>工站号:{stationNo}<Brief>物料ID:{partNo}</Brief><Brief>上料时间: {new Date().toLocaleString()}</Brief></Item>],
          stationNo: '',
          partNo: ''
        })
        ListSweepRecordArray = [<Item wrap key={0}>工站号:{stationNo}<Brief>物料ID:{partNo}</Brief><Brief>上料时间: {new Date().toLocaleString()}</Brief></Item>]
      } else if (this.state.ListSweepRecord.length !== 0) (
        ListSweepRecordArray.push(<Item wrap key={num}>工站号:{stationNo}<Brief>物料ID:{partNo}</Brief><Brief>上料时间: {new Date().toLocaleString()}</Brief></Item>),
        console.log('this.state.ListSweepRecord!==0', ListSweepRecordArray),
        this.setState({
          ListSweepRecord: ListSweepRecordArray,
          stationNo: '',
          partNo: ''
        }),
        num++
      )
    }
  }

  successToast = () => {
    console.log('successToast')
    ListSweepRecordArray = []
    this.setState({
      ListSweepRecord: ListSweepRecordArray,
      stationNo: '',
      partNo: ''
    })
    ListSweepRecordArray = []
    num = 1
    Toast.success('换线清料成功 !!!', 1);
  }

  quit = () => {
    console.log('quit')
    // this.props.navigation.navigate('Login')
    this.props.navigation.goBack();
  }


  render() {
    return (
      <View >
        {/* <Text style={styles.title}>
                    交运追溯系统
                </Text> */}
        <WhiteSpace size="xl" />
        <List >
          <InputItem
            onChange={this.handeleStationNoChange('stationNo')}
            focused={this.state.stationNoFocused}
            value={this.state.stationNo}
            maxLength={10}
            onBlur={this.handleStationNoOnBlur}
            autoFocus
          ><Text style={styles.span}>工站号:</Text></InputItem>
          <InputItem
            value={this.state.partNo}
            focused={this.state.partNoFocused}
            onChange={this.handelePartNoChange('partNo')}
            onBlur={this.handlePartNoOnBlur}
          ><Text style={styles.span}>物料号:</Text></InputItem>
        </List>
        <WhiteSpace size="sm" />
        <WingBlank size="lg">
          <View style={styles.Accordion}>
            <ScrollView
              style={{ flex: 1, backgroundColor: '#f5f5f9' }}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <List renderHeader={() => '扫料记录'}>
                {this.state.ListSweepRecord}
              </List>

            </ScrollView>
          </View>
        </WingBlank>
        <WingBlank>
          <Button type='primary' style={styles.quitButton}
            onClick={() => alert('删除', '确定删除么???', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => this.successToast() },
            ])}
          >换线清料</Button>
          <Button type='ghost' style={styles.quitButton}
            onClick={() => alert('退出登陆', '确定退出么???', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => this.quit() },
            ])}
          >{this.state.userName},退出登录</Button>

        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  contentContainer: {
    paddingVertical: 20,
    height: 200,
    // showsVerticalScrollIndicator :true,
    // overScrollMode :'auto',

  },
  Accordion: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
    width: '100%',
    // overflow:'scroll',
    // backgroundColor: 'red'
  },
  span: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  quitButton: {
    marginTop: 10
  }
});

