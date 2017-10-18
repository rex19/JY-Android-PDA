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


let url = 'http://192.168.1.252/JYTrace/API/ApiSetupMaterial/'
// let url = 'http://192.168.0.99/JYTrace/API/ApiSetupMaterial/'
let num = 1;
let ListSweepRecordArray = [];

// console.log('new Date',new Date().toLocaleString())
//x.substring(2,4)  截取字符串
export default class Traceability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // stationNoFocused: false,
      partNoFocused: false,
      // stationNo: '',
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

  // handleStationNoOnBlur = () => {
  //   this.setState({
  //     partNoFocused: true,
  //     stationNoFocused: false
  //   })
  // }

  handlePartNoOnBlur = () => {
    // console.log('handlePartNoOnBlur', this.state.partNo, this.state.userName, this.props.navigation.state.params.lineName)
    this.setState({
      partNoFocused: false
    })
    //第一步先判断工站号是否为空
    if ( this.state.partNo !== '') {
      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ScannerId: 1,
          MaterialCode: this.state.partNo,
          OperatorCode: this.state.userName,
          LineCode: this.props.navigation.state.params.lineName[0],
          MaterialPartNumber: 1
        })
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('responseJson', responseJson)
        if (responseJson.basicReturn.ReturnCode === 0) {
          Toast.success(responseJson.basicReturn.Message, 1);
          // this.writeLineSweepRecord(this.state.stationNo, this.state.partNo)
          this.writeLineSweepRecord(responseJson.materialInfo)
        } else if (responseJson.basicReturn.ReturnCode !== 0) {
          Toast.fail(responseJson.basicReturn.Message, 1);
          this.setState({
            partNo: ''
          })
        }
      }).catch((error) => {
        console.log('error:', error)
        Toast.success('网络错误，请联系管理员😢', 1);
      })
    } else {
      Toast.fail('请输入物料号😯', 1);
    }
  }

  handelePartNoChange = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  writeLineSweepRecord = (materialInfo) => {
    console.log('writeLineSweepRecord', materialInfo)
    if (materialInfo.length === 0) {
      console.log('materialInfo.length===0')
    } else {
      console.log('materialInfo.length!==0',ListSweepRecordArray,this.state.ListSweepRecord)
      ListSweepRecordArray=[]
      for (let i = 0; i < materialInfo.length; i++) {
        ListSweepRecordArray.push(<Item wrap key={num}>工站号:{materialInfo[i].StationCode}<Brief>物料ID:{materialInfo[i].MaterialUID}</Brief><Brief>上料时间: {materialInfo[i].StrSetupDateTime}</Brief></Item>)
        num++
      }
      // ListSweepRecordArray.push(<Item wrap key={num}>工站号:{materialInfo.StationCode}<Brief>物料ID:{materialInfo.MaterialUID}</Brief><Brief>上料时间: {materialInfo.StrSetupDateTime}</Brief></Item>),
      this.setState({
        ListSweepRecord: ListSweepRecordArray,
        partNo: ''
      })
      num=0


      // if (this.state.ListSweepRecord.le`ngth === 0) {
      //   this.setState({
      //     ListSweepRecord: [<Item wrap key={0}>工站号:{stationNo}<Brief>物料ID:{partNo}</Brief><Brief>上料时间: {new Date().toLocaleString()}</Brief></Item>],
      //     stationNo: '',
      //     partNo: ''
      //   })
      //   ListSweepRecordArray = [<Item wrap key={0}>工站号:{stationNo}<Brief>物料ID:{partNo}</Brief><Brief>上料时间: {new Date().toLocaleString()}</Brief></Item>]
      // } else if (this.state.ListSweepRecord.length !== 0) (
      //   ListSweepRecordArray.push(<Item wrap key={num}>工站号:{stationNo}<Brief>物料ID:{partNo}</Brief><Brief>上料时间: {new Date().toLocaleString()}</Brief></Item>),
      //   console.log('this.state.ListSweepRecord!==0', ListSweepRecordArray),
      //   this.setState({
      //     ListSweepRecord: ListSweepRecordArray,
      //     stationNo: '',
      //     partNo: ''
      //   }),
      //   num++
      // )
    }
  }

  successToast = () => {
    ListSweepRecordArray = []
    this.setState({
      ListSweepRecord: ListSweepRecordArray,
      partNo: ''
    })
    ListSweepRecordArray = []
    num = 1
    Toast.success('换线清料成功 !!!✌️', 1);
  }

  quit = () => {
    console.log('quit')
    // this.props.navigation.navigate('Login')
    this.props.navigation.goBack();
  }


  render() {
    console.log('TraceabilityRender', this.state.ListSweepRecord)
    return (
      <View >
        {/* <Text style={styles.title}>
                    交运追溯系统
                </Text> */}
        <WhiteSpace size="xl" />
        <List >
          
          <InputItem
          autoFocus
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
            onClick={() => alert('清空', '确定清空么?😊', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => this.successToast() },
            ])}
          >换线清料</Button>
          <Button type='ghost' style={styles.quitButton}
            onClick={() => alert('退回上一层', '确定退出么?👋', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => this.quit() },
            ])}
          >{this.state.userName},退回上一层</Button>

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



// <InputItem
// onChange={this.handeleStationNoChange('stationNo')}
// focused={this.state.stationNoFocused}
// value={this.state.stationNo}
// maxLength={10}
// onBlur={this.handleStationNoOnBlur}
// autoFocus
// ><Text style={styles.span}>工站号:</Text></InputItem>