import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Accordion, Button, List, InputItem, WhiteSpace, Modal, WingBlank, Toast, Radio, } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
const GetWorkOrderUrl = PublicParam.GetWorkOrderUrl
const PostWorkOrderUrl = PublicParam.PostWorkOrderUrl

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

// let GetUrl = 'http://192.168.1.252/JYTrace/API/APIGetWorkOrder/?LineCode='
// let PostUrl = 'http://192.168.1.252/JYTrace/API/ApiActivateWorkOrder/'
// let GetUrl = 'http://192.168.0.99/JYTrace/API/APIGetWorkOrder/?LineCode='
// let PostUrl = 'http://192.168.0.99/JYTrace/API/ApiActivateWorkOrder/'

let num = 0;
let ListSweepRecordArray = [];
let dataArray = [];
// console.log('new Date',new Date().toLocaleString())
//x.substring(2,4)  截取字符串
export default class Traceability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderNoFocused: false,
      partNoFocused: false,
      describeFocused: false,
      workOrderToday: [],
      wrokOrderId: '',
      workOrderNo: '',
      partNo: '',
      describe: '',
      activationButtonDisable:true,
      // ListSweepRecord: [],
      // userName: ''
      value: 0,
      x: []
    };
  }

  fetchAjax = () => {
    console.log('fetchAjax')
    fetch(GetWorkOrderUrl + this.props.navigation.state.params.lineName, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('responseJson', responseJson)
      if (responseJson.ReturnCode === 0) {
        // Toast.success(responseJson.Message, 1);
        console.log('responseJson.TodaysWorkOrders', responseJson.TodaysWorkOrders)
        this.setState({
          x: responseJson.TodaysWorkOrders,
          workOrderNo: responseJson.TodayActivedWorkOrder.WorkOrderCode,
          partNo: responseJson.TodayActivedWorkOrder.PartTypeCode,
          describe: responseJson.TodayActivedWorkOrder.PartDescription,
        })
        // this.writeWorkOrderRecord(responseJson.TodaysWorkOrders)
      } else if (responseJson.ReturnCode !== 0) {
        Toast.fail(responseJson.Message, 1);
      }
    }).catch((error) => {
      console.log('error:', error)
      Toast.success('网络错误!请联系管理员😢', 1);
    })
  }

  componentDidMount() {
    this.fetchAjax()
  }

  onChange = (value) => {
    this.setState({
      value,
      wrokOrderId: value,
      activationButtonDisable:false
    });
  };

  handleActivation = () => {
    // console.log('handleActivation', this.state.wrokOrderId, this.props.navigation.state.params.userName)
    if (this.state.wrokOrderId !== '' && this.props.navigation.state.params.userName !== '') {
      console.log('handleActivation', this.state.wrokOrderId, this.props.navigation.state.params.userName)
      fetch(PostWorkOrderUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          WorkOrderId: this.state.wrokOrderId,
          UserCode: this.props.navigation.state.params.userName
        })
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('responseJson', responseJson)
        if (responseJson.ReturnCode === 0) {
          Toast.success(responseJson.Message, 1);
          this.fetchAjax()
        } else if (responseJson.ReturnCode !== 0) {
          Toast.fail(responseJson.Message, 1);
        }
      }).catch((error) => {
        console.log('error:', error)
        Toast.success('网络错误!', 1);
      })
    } else {
      Toast.fail('请先选择要激活的工单号😂!', 1);
    }
  }

  render() {
    console.log('__________lineName', this.props.navigation.state.params.lineName)
    const { value, workOrderToday } = this.state;
    // const data = [
    //   { value: 0, label: '工单号:P100006', extra: '物料号:M-0001' },
    //   { value: 1, label: '工单号:P100007', extra: '物料号:M-0002' },
    //   { value: 2, label: '工单号:P100008', extra: '物料号:M-0001' },
    //   { value: 3, label: '工单号:P100009', extra: '物料号:M-0002' },
    //   { value: 4, label: '工单号:P1000010', extra: '物料号:M-0001' },
    //   { value: 5, label: '工单号:P1000011', extra: '物料号:M-0002' }
    // ];
    return (
      <View >
        <WingBlank size="lg">
          <View style={styles.Accordion}>
            <ScrollView
              style={{ flex: 1, backgroundColor: '#f5f5f9' }}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <List renderHeader={() => '当天可选工单'}>

                {/* {workOrderToday} */}
                {/* <RadioItem key={0} checked={value === 0} onChange={() => this.onChange(0, 'P100006', 'M-0001')}>
                  工单号:P100006&nbsp;物料号:M-0001
                </RadioItem>
                <RadioItem key={1} checked={value === 1} onChange={() => this.onChange(1, 'P100007', 'M-0002')}>
                  工单号:P100007&nbsp;物料号:M-0002
                </RadioItem> */}

                {this.state.x.map(i => (
                  console.log(' TodaysWorkOrders.map', i, i.WorkOrderId),
                  <RadioItem key={i.WorkOrderId} checked={value === i.WorkOrderId} onChange={() => this.onChange(i.WorkOrderId)}>
                    工单号:{i.WorkOrderCode}&nbsp;&nbsp;&nbsp;物料号:{i.PartTypeCode}...
                  </RadioItem>
                ))}
              </List>

            </ScrollView>
          </View>
        </WingBlank>

        <Text style={styles.title}>
          当前工单
        </Text>
        <WhiteSpace size="sm" />
        <List >
          <InputItem
            focused={this.state.workOrderNoFocused}
            value={this.state.workOrderNo}
            editable={false}
          ><Text style={styles.span}>工单号:</Text></InputItem>
          <InputItem
            value={this.state.partNo}
            focused={this.state.partNoFocused}
            editable={false}
          ><Text style={styles.span}>物料号:</Text></InputItem>
          <InputItem
            value={this.state.describe}
            focused={this.state.describeFocused}
            editable={false}
          ><Text style={styles.span}>描述:</Text></InputItem>
        </List>

        <Button type='primary' style={styles.quitButton}
          disabled={this.state.activationButtonDisable}
          onClick={() => alert('激活', '确定激活么?😄', [
            { text: '取消', onPress: () => console.log('不激活') },
            { text: '确定', onPress: () => this.handleActivation() },
          ])}
        >激活</Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
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
    marginBottom: 5,
    height: 180,
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

