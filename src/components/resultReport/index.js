import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Result, Icon, WhiteSpace } from 'antd-mobile';

const ResultReport = () => (<View >
    <Text style={styles.subTitle}>验证成功</Text>
    <Result
        img={<Icon type="check-circle"   />} //style={styles.icon}
        title="验证成功"
        message="所提交内容已成功完成验证"
    />
    <WhiteSpace />
</View>)



const styles = StyleSheet.create({
    subTitle: {
        marginLeft: '10%',
        color: '#888',
        // fontSize: 20,
        // padding: '30px 0 18px 0'
    },
    // icon: {
    //     width: '1.2rem',
    //     height:'1.2rem',
    //     // fill: '#1F90E6'
    // },


});

export default ResultReport;