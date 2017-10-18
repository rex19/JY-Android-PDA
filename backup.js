import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Accordion, Button, List, InputItem, WhiteSpace, Modal, WingBlank, Toast, Radio, } from 'antd-mobile';
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

// let url = 'http://192.168.1.129:12345/api/select'
let url = 'http://192.168.1.252/JYTrace/API/ApiSetupMaterial/'
// let url = 'http://172.16.0.104/JYTrace/API/ApiSetupMaterial/'
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
      // ListSweepRecord: [],
      // userName: ''
      value: 0,
      x: []
    };
  }

  componentDidMount() {
    fetch('http://192.168.1.252/JYTrace/API/APIGetWorkOrder/?LineCode=' + this.props.navigation.state.params.lineName, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('responseJson', responseJson)
      if (responseJson.ReturnCode === 0) {
        Toast.success(responseJson.Message, 1);
        console.log('responseJson.TodaysWorkOrders',responseJson.TodaysWorkOrders)
        this.setState({
          x: responseJson.TodaysWorkOrders
        })
        // this.writeWorkOrderRecord(responseJson.TodaysWorkOrders)
      } else if (responseJson.ReturnCode !== 0) {
        Toast.fail(responseJson.Message, 1);
        // this.setState({
        //   stationNo: '',
        //   partNo: ''
        // })
      }
    }).catch((error) => {
      console.log('error:', error)
      Toast.success('网络错误!请联系管理员😢', 1);
    })
  }

  // writeWorkOrderRecord = (TodaysWorkOrders) => {
  //   console.log('writeWorkOrderRecord', TodaysWorkOrders)
  //   for (let i = 0; i < TodaysWorkOrders.length; i++) {
  //     let wrokOrderId = TodaysWorkOrders[i].WorkOrderId;
  //     let workOrderCode = TodaysWorkOrders[i].WorkOrderCode;
  //     let partTypeCode = TodaysWorkOrders[i].PartTypeCode;
  //     let partDescription = TodaysWorkOrders[i].PartDescription;

  //     dataArray.push(<RadioItem key={i} checked={this.state.value === i} onChange={() => this.onChange(i, wrokOrderId, workOrderCode, partTypeCode, partDescription)}>
  //       工单号:{workOrderCode}&nbsp;物料号:{partTypeCode}
  //     </RadioItem>)
  //   }
  //   this.setState({ workOrderToday: dataArray })
  // }

  onChange = (value, wrokOrderId, workOrderCode, partTypeCode, partDescription) => {
    console.log('onChange', value, wrokOrderId, workOrderCode, partTypeCode, partDescription)
    this.setState({
      value,
      wrokOrderId: wrokOrderId,
      workOrderNo: workOrderCode,
      partNo: partTypeCode,
      describe: partDescription
      // workOrderNo: label.substring(4, 11),
      // partNo: extra.substring(4, 10)
    });
  };

  handleActivation = () => {
    console.log('handleActivation', this.state.wrokOrderId, this.props.navigation.state.params.userName)
    if (this.state.workOrderNo !== '' && this.state.partNo !== '') {
      fetch('http://192.168.1.252/JYTrace/API/ApiActivateWorkOrder/', {
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
          this.setState({
            wrokOrderId: '',
            workOrderNo: '',
            partNo: '',
            describe: ''
          })
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
    console.log('__________lineName',this.props.navigation.state.params.lineName)
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
                {/* 
                {data.map(i => (
                  <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value,i.label,i.extra)}>
                    {i.label}&nbsp;&nbsp;&nbsp;{i.extra}
                  </RadioItem>
                ))} <WhiteSpace size="sm" />*/}

                {this.state.x.map(i => (
                  console.log(' TodaysWorkOrders.map', i, i.WorkOrderId),
                  <RadioItem key={i.WorkOrderId} checked={value === i.WorkOrderId} onChange={() => this.onChange(i.WorkOrderId, i.WorkOrderId, i.WorkOrderCode, i.PartTypeCode, i.PartDescription)}>
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


             {/* 

hdmi_safe
Use "safe mode" settings to try to boot with maximum hdmi compatibility.

Value    Description
-------------------------------------------------------------------------
0        Disabled (Default)
1        Enabled (this does: hdmi_force_hotplug=1,
                             hdmi_ignore_edid=0xa5000080,
                             config_hdmi_boost=4, hdmi_group=2,
                             hdmi_mode=4, disable_overscan=0,
                             overscan_left=24, overscan_right=24,
                             overscan_top=24, overscan_bottom=24)

hdmi_safe=1      

Enabled (this does: overscan_left =16,overscan_right =16,
    overscan_top=16 ,overscan_bottom=16,
    disable_overscan=0,
    framebuffer_width=1920,framebuffer_height=1080,
    Sdtv_mode=2,sdtv_aspect=3)*/} 

