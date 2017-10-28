import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, List, InputItem, WhiteSpace, Modal, WingBlank, Toast, Radio, Icon, ActivityIndicator } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const GetWorkOrderUrl = PublicParam.GetWorkOrderUrl
const PostWorkOrderUrl = PublicParam.PostWorkOrderUrl

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

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
      PlanStartDateTimeFocused: false,
      describeFocused: false,
      workOrderToday: [],
      wrokOrderId: '',
      workOrderNo: '',
      PlanStartDateTime: '',
      describe: '',
      activationButtonDisable: true,
      // ListSweepRecord: [],
      // userName: ''
      value: 0,
      x: [],
      animating: false,
    };
  }
/**
 * mock数据
 * mockDataDebug1
 * mockDataDebug2
 */
  mockDataDebug1 = () => {
    let mockGetWorkOrderUrl = mockJson.GetWorkOrderUrl
    this.setState({
      x: mockGetWorkOrderUrl.TodaysWorkOrders,
      workOrderNo: mockGetWorkOrderUrl.TodayActivedWorkOrder.WorkOrderCode,
      PlanStartDateTime: mockGetWorkOrderUrl.TodayActivedWorkOrder.PlanStartDateTime,
      describe: mockGetWorkOrderUrl.TodayActivedWorkOrder.PartDescription,
      animating: false
    })
  }
  mockDataDebug2 = () => {
    let mockPostWorkOrderUrl = mockJson.PostWorkOrderUrl
    Toast.success(mockPostWorkOrderUrl.Message, 1);
    this.mockDataDebug1()
  }

  componentDidMount() {
    if (PublicParam.mock) {
      this.mockDataDebug1()
    } else if (PublicParam.mock === false) {
      this.fetchAjax()
    }
  }

  fetchAjax = () => {
    this.showToast()
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
        console.log('responseJson.TodaysWorkOrders', responseJson.TodaysWorkOrders)
        this.setState({
          x: responseJson.TodaysWorkOrders,
          workOrderNo: responseJson.TodayActivedWorkOrder.WorkOrderCode,
          PlanStartDateTime: responseJson.TodayActivedWorkOrder.PlanStartDateTime,
          describe: responseJson.TodayActivedWorkOrder.PartDescription,
          animating: false
        })
      } else if (responseJson.ReturnCode !== 0) {
        Toast.fail(responseJson.Message, 1);
      }
    }).catch((error) => {
      console.log('error:', error)
      Toast.success('网络错误!请联系管理员😢', 1);
    })
  }


  onChange = (value) => {
    this.setState({
      value,
      wrokOrderId: value,
      activationButtonDisable: false
    });
  };

  handleActivation = () => {
    if (PublicParam.mock) {
      this.mockDataDebug2()
    } else if (PublicParam.mock === false) {
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
  }

  showToast = () => {
    console.log('showToast')
    this.setState({ animating: true });
    // this.closeTimer = setTimeout(() => {
    //   this.setState({ animating: !this.state.animating });
    // }, 1000);
  }

  render() {
    const { value, workOrderToday } = this.state;
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
                {this.state.x.map(i => (
                  <View key={i.WorkOrderId}>
                    <RadioItem style={{ borderTopWidth: 1, borderTopColor: '#DDDDDD' }} checked={value === i.WorkOrderId} onChange={() => this.onChange(i.WorkOrderId)}>
                      工单号:{i.WorkOrderCode}
                    </RadioItem>
                    <Brief style={{ borderWidth: 0 }} >&nbsp;&nbsp;<Icon type='right' size='xxs'></Icon>开始时间:{i.PlanStartDateTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')} </Brief>
                  </View>
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
            value={this.state.PlanStartDateTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}
            focused={this.state.PlanStartDateTimeFocused}
            editable={false}
          ><Text style={styles.span}>开始时间:</Text></InputItem>
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
        <ActivityIndicator
          animating={this.state.animating}
          toast
          size="large"
          text="Loading..."
        />
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
    fontSize: 15,
    fontWeight: 'bold'
  },
  quitButton: {
    marginTop: 10
  }
});
