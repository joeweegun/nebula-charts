
[![Build Status](https://travis-ci.com/joeweegun/nebula-charts.svg?branch=main)](https://travis-ci.com/joeweegun/nebula-charts)
[![Badge](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg?style=flat-square)](https://996.icu/#/zh_CN)
##  欢迎使用nubula-charts
帮助你快速完成项目中的图表需求，对常用的图表进行了二次封装，简化了echarts option配置项。

## 技术栈

* Typescript
* React
* Echarts
* Scss

## 安装方式
```
npm install nebula-charts

```

## 使用事例

```
注意：数据属性chartData为必填项，其他图表相关属性为非必填项，非必填项可根据设计图进行适当更改

```

```javascript
import { Bar } from 'nebula-charts'

<Bar 
  width='100%'
  height='300px'
  unit='单位/次'
  toolTipUnit='次'
  barWidth={15}
  axisLineColor='#8e9eab'
  axisFontColor='#8e9eab'
  rotate={0}
  chartData={[
    {
      name:'数据一',
      colors: ['#02AAB0','#00CDAC'],
      xData: ['一月','二月','三月'],
      yData: [10,11,12]
    },
    {
      name:'数据二',
      colors: ['#8E2DE2','#4A00E0'],
      xData: ['一月','二月','三月'],
      yData: [20,6,32]
    }
  ]}
/>

```