import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Accordion, Button, List, InputItem, WhiteSpace, Modal, WingBlank, Toast, Picker } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const PostTracebilityUrl = PublicParam.PostTracebilityUrl
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;


let num = 1;
let ListSweepRecordArray = [];

// console.log('new Date',new Date().toLocaleString())
//x.substring(2,4)  截取字符串
export default class Traceability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partNoFocused: false,
      StationCode: '',
      partNo: '',
      ListSweepRecord: [],
      userName: '',
      StationCodeArray: [],
      visible: false, //模态框
      animating: false,
    };
  }

  mockDataDebug1 = () => {
    let mockPostTracebilityUrlMode1 = mockJson.PostTracebilityUrlMode1
    this.writeLineSweepRecord(mockPostTracebilityUrlMode1.materialInfo)
  }


  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ userName: params.userName })

    if (PublicParam.mock) {
      this.mockDataDebug1()
    } else if (PublicParam.mock === false) {
      fetch(PostTracebilityUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          MaterialCode: "",
          OperatorCode: this.props.navigation.state.params.userName,
          LineCode: this.props.navigation.state.params.lineName[0],
          Mode: 1
        })
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('responseJson', responseJson)
        this.writeLineSweepRecord(responseJson.materialInfo)
      })
    }
  }
  showToast = () => {
    this.setState({ animating: true });
  }

  handeleStationNoChange = key => (value) => {
    this.setState({
      [key]: value,
    });
  };



  handlePartNoOnBlur = () => {
    this.setState({
      partNoFocused: false
    })
    //第一步先判断工站号是否为空
    if (this.state.partNo !== '') {
      this.showToast() //loading
      fetch(PostTracebilityUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ScannerId: 1,
          MaterialCode: this.state.partNo,
          OperatorCode: this.state.userName,
          LineCode: this.props.navigation.state.params.lineName[0],
          MaterialPartNumber: 1,
          Mode: 0
        })
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('responseJson', responseJson)
        if (responseJson.basicReturn.ReturnCode === 0) {
          this.setState({ animating: false })
          Toast.success(responseJson.basicReturn.Message, 1);
          this.writeLineSweepRecord(responseJson.materialInfo)
        } else if (responseJson.basicReturn.ReturnCode === -1) {
          //先显示工站号下拉菜单，点击确认后将工站号和物料号返回给后台，工站号下拉菜单选择
          console.log('responseJson.basicReturn.ReturnCode === -1')
          console.log('responseJson.materialInfo', responseJson.materialInfo)
          let materialInfoArray = responseJson.materialInfo
          let StationCodeList = []
          for (let i = 0; i < materialInfoArray.length; i++) {
            StationCodeList.push({
              label: materialInfoArray[i].StationCode,
              value: materialInfoArray[i].StationCode,
            })
          }
          this.setState({ StationCodeArray: StationCodeList, animating: false })
          this.showModal()
        } else if (responseJson.basicReturn.ReturnCode !== 0) {
          Toast.fail(responseJson.basicReturn.Message, 1);
          this.setState({
            partNo: '',
            StationCode: '',
            animating: false
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
      console.log('materialInfo.length!==0', ListSweepRecordArray, this.state.ListSweepRecord)
      ListSweepRecordArray = []
      for (let i = 0; i < materialInfo.length; i++) {
        ListSweepRecordArray.push(<Item wrap key={num}>工站号:{materialInfo[i].StationCode}<Brief>物料ID:{materialInfo[i].MaterialUID}</Brief><Brief>上料时间: {materialInfo[i].StrSetupDateTime}</Brief></Item>)
        num++
      }
      // ListSweepRecordArray.push(<Item wrap key={num}>工站号:{materialInfo.StationCode}<Brief>物料ID:{materialInfo.MaterialUID}</Brief><Brief>上料时间: {materialInfo.StrSetupDateTime}</Brief></Item>),
      this.setState({
        ListSweepRecord: ListSweepRecordArray,
        partNo: '',
        StationCode: ''
      })
      num = 0
    }
  }

  onChange = (StationCode) => {
    this.setState({ StationCode });
  }

  quit = () => {
    console.log('quit')
    // this.props.navigation.navigate('Login')
    this.props.navigation.goBack();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    if (this.state.StationCode === '') {
      console.log('this.state.StationCode===""')
      Toast.success('请选择工站😢', 1);
    } else if (this.state.StationCode !== '') {
      console.log('this.state.StationCode!==""')
      this.setState({
        visible: false
      });
      Toast.success('成功', 1);
      this.showToast()
      fetch(PostTracebilityUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ScannerId: 1,
          MaterialCode: this.state.partNo,
          OperatorCode: this.state.userName,
          LineCode: this.props.navigation.state.params.lineName[0],
          LocationCode: this.state.StationCode[0],
          MaterialPartNumber: 1,
          Mode: 0
        })
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('responseJson.+++++++++++++++++', responseJson)
        this.setState({
          StationCode: '',
          partNo: '',
          animating: false
        });
        this.writeLineSweepRecord(responseJson.materialInfo)
        Toast.success(responseJson.basicReturn.Message, 1);
      }).catch((error) => {
        console.log('error:', error)
        Toast.success('网络错误，请联系管理员😢', 1);
      })

    }
  }

  onCloseToRetry = () => {
    console.log('重扫')
    this.setState({
      visible: false,
      StationCode: '',
      partNo: '',
    });

    Toast.success('请重新扫物料号', 1);
  }

  render() {
    console.log('TraceabilityRender', this.state.ListSweepRecord)
    const footerButtons = [
      { text: '重扫', onPress: () => this.onCloseToRetry() },
      { text: '确定', onPress: () => this.onClose() },
    ];
    return (
      <View >
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
          <Button type='ghost' style={styles.quitButton}
            onClick={() => alert('退回上一层', '确定退出么?👋', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => this.quit() },
            ])}
          >{this.state.userName},退回上一层</Button>
        </WingBlank>
        <Modal
          title="请选择工站号"
          transparent
          visible={this.state.visible}
          // closable
          footer={footerButtons}
        >
          <List>
            <Picker
              data={this.state.StationCodeArray}
              cols={1}
              value={this.state.StationCode}
              onChange={this.onChange}
              disabled={false}
            >
              <List.Item arrow="horizontal" last onClick={this.onClick}>工站选择</List.Item>
            </Picker>
          </List>
        </Modal>

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
    height: 295,
  },
  Accordion: {
    marginTop: 10,
    marginBottom: 10,
    height: 290,
    width: '100%',
  },
  span: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  quitButton: {
    marginTop: 10
  }
});


