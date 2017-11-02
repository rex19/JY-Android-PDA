# JY-Android-PDA
## A react native project for Android PDA

[![react native](https://img.shields.io/badge/reactnative-0.47.0-brightgreen.svg?style=flat-square)](https://github.com/facebook/react-native)
[![react navigation](https://img.shields.io/badge/react%20navigation-^1.0.0-yellowgreen.svg?style=flat-square)](https://github.com/react-community/react-navigation)
[![antd-mobile](https://img.shields.io/badge/antd%20mobile-^1.6.5-orange.svg?style=flat-square)](https://github.com/ant-design/ant-design-mobile)

[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

<!-- 演示地址 <> -->
## Demo截图

<!-- ![](src/img/demo.png) -->

## 特性

-   基于[react-native](https://github.com/facebook/react-native)，[react-navigation](https://github.com/react-community/react-navigation),[antd-mobile](https://github.com/ant-design/ant-design-mobile) 工业工厂车间PDA-MES追溯实践。  
<!-- -   暂无响应式设计，1920*1080最佳。 -->

## 更新日志


### 1.1

`2017-9-04`

-     更新react-navigation新版本特性。


## 开发构建
<!-- 
### 目录结构

```bash
├── /build/           # 项目输出目录
├── /config/       # 打包工具配置文件
├── /scripts/       # 打包工具配置文件
├── /public/        #公共文件，编译时copy至build目录
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── /charts/   # 图表组件
│ │ ├── /footer/   # 脚部组件
│ │ ├── /header/  # 头部组件
│ │ ├── line1Index.js   # 测试1线组件入口
│ │ └── line2Index.js  # 测试2线组件入口
│ ├── /img/       # 图片
│ ├── /mock/       # 模拟数据文
│ ├── /utils/     # 全局工具目录
│ │ └── config.js  # 全局配置文件
│ ├── app.css       # 全局组件入口css
│ ├── app.js       # 全局组件入口js
│ ├── /utils/        # 工具函数
│ └── index.js       # 入口文件+路由配置
├── package.json     # 项目信息
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母小写（如`header`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/header`）。 -->

### 快速开始

克隆项目文件:

```bash
$ git clone https://github.com/rex19/JY-Android-PDA.git
```

进入目录安装依赖:

```bash
$ npm i 或者 yarn install
```

开发：

```bash
$ react-native run-android
```

构建apk：

```bash
$ cd android && ./gradlew assembleRelease

将会打包至build/目录 

```

## FAQ

  ```bash
    ....
  ```

