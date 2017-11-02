import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native';
import { Button, List, InputItem, WhiteSpace, WingBlank, Modal, Toast } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const LoginUrl = PublicParam.loginUrl
const alert = Modal.alert;

let num = 1;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'admin',
      passWord: '',
      userNameFocued: false,
      passwordFocued: false,
      animating: false
    };
  }

  showToast = () => {
    this.setState({ animating: true });
  }

  mockDataDebug = () => {
    let mockLogin = mockJson.ApiCheckLogin
    this.setState({ animating: false })
    this.jumpPage('guest')
    Toast.success(mockLogin.Message, 1);
  }

  handleClick = () => {
    if (this.props.navigation.state.routeName !== 'MiddleMenu') {
      if (PublicParam.mock) {

        this.mockDataDebug()
      } else if (PublicParam.mock === false) {
        //第一步先判断账号密码是否为空
        if (this.state.userName !== '' && this.state.passWord !== '') {
          this.showToast() //loading
          fetch(LoginUrl, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              LoginId: this.state.userName,
              Password: this.state.passWord,
            })
          }).then((response) => {
            return response.json();
          }).then((responseJson) => {
            console.log('responseJson', responseJson)
            if (responseJson.ReturnCode === 0) {
              this.setState({ animating: false })
              this.jumpPage(this.state.userName, this.state.passWord)
              Toast.success(responseJson.Message, 1);
            } else if (responseJson.ReturnCode !== 0) {
              console.log('用户名或密码错误,', responseJson.Message)
              this.setState({ animating: false })
              Toast.fail(responseJson.Message, 1);
            }
          }).catch((error) => {
            console.log(error, 'error1')
            this.setState({ animating: false })
            Toast.success('网络错误，请联系管理员😨', 1)
          })//.done();
        } else {
          Toast.fail('请输入用户名和密码!😄', 1);
        }
      }
    }
  }

  handleUserNameOnBlur = () => {
    this.setState({
      passwordFocued: true,
      userNameFocued: false
    })
  }

  handlePasswordOnBlur = () => {
    this.setState({
      passwordFocued: false
    })
  }

  handleUserNameChange = (userName) => {
    this.setState({ userName: userName })
  }
  handlePasswordChange = (passWord) => {
    this.setState({ passWord: passWord })
  }

  jumpPage = (username, password) => {
    console.log('jump')
    this.setState({ userName: '', passWord: '' })
    this.props.navigation.navigate('MiddleMenu', { name: '主菜单', userName: username })
  }


  render() {
    return (
      <View >
        <Text style={styles.title}>
          **系统登陆
                </Text>
        <List >
          <InputItem
            clear
            onChange={this.handleUserNameChange}
            focused={this.state.userNameFocued}
            onBlur={this.handleUserNameOnBlur}
            value={this.state.userName}
            autoFocus
          ><Text style={styles.span}>用户名:</Text></InputItem>
          <InputItem
            clear
            type="password"
            focused={this.state.passwordFocued}
            onChange={this.handlePasswordChange}
            onBlur={this.handlePasswordOnBlur}
            value={this.state.passWord}
          ><Text style={styles.span}>密码:</Text></InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button type='primary' onClick={this.handleClick} >登陆</Button>
        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  span: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
