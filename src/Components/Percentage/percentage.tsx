import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts-liquidfill/src/liquidFill';

import { BaseOptions } from '../common.d';


export interface PercentageDataInterface {
  name: string;
  value: number;
  percentage: number;
} 

export interface PercentageInterface {
 /**
  * 单位
  */
 unit?: string;
  /**
  * 背景圆颜色
  */
 bckColor?: string;
 /**
  * 字体颜色
  */
 fontColor?: string;
 /**
  * 环形宽度
  */
 barWidth?: string | number;
 /**
  * 圆形进度条颜色，渐变色，类型数组  格式['red','blue']
  */
 colors?: string[];
 /**
  * 字体大小，事例“28”或者28
  */
 fontSize?: string | number;
  /**
  * 数据源
  */
  chartData: PercentageDataInterface
}


export type PercentageProps = Omit<(PercentageInterface & BaseOptions),'showLegend'>; // Omit<User, "age" | "email">

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { Percentage } from 'nebula-charts'
 * ~~~
 */
export const Percentage:FC<PercentageProps> = (props) => {

  const { 
    backgroundColor,
    width = '100%',
    height = '100%',
    unit = '',
    gridLeft,
    gridRight,
    gridBottom,
    gridTop,
    barWidth,
    bckColor,
    colors = ['#5CBEFF','#518FEF'],
    fontSize,
    fontColor,
    chartData,
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {

    const getfpkszb1 = [0.01];

    const option = {
      backgroundColor,
      grid: {
        left: gridLeft,
        right: gridRight,
        bottom: gridBottom,
        top:gridTop,
        containLabel: true,
      },
      tooltip: {
        backgroundColor: 'rgba(254,254,254,0.85)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
        textStyle: {
          color: '#363636',
        },
        formatter:(params:any) => {
          return '<span>' + [chartData?.value] + unit+  '</span>';
        }
      },
      title: {
        text: [chartData?.percentage] + '%',
        textStyle: {
          color: fontColor,
          fontSize: fontSize
        },
        left: 'center',
        top: 'center'
      },
      angleAxis: {
        max: 100,
        clockwise: true, // 逆时针
        // 隐藏刻度线
        show: false
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,

        },
        axisTick: {
          show: false
        },
      },
      polar: {
        center: ['50%', '50%'],
        radius: '100%' //图形大小
      },
      series: [
        {
          stack: '测试',
          type: 'bar',
          data: [chartData?.percentage],
          showBackground: true,
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth,
          silent: true,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: colors[0]
              }, {
                offset: 1,
                color: colors[1]
              }]),
              borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: colors[0]
              }, {
                offset: 1,
                color: colors[1]
              }]),
              borderWidth: 3
            }
          },
        }, 
        {
          stack: '测试',
          type: 'bar',
          data: getfpkszb1,
          showBackground: true,
          backgroundStyle: {
            color: bckColor,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10,
            shadowOffsetY: 2,

          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth,
          itemStyle: {
            color: '#90BDFF',
            borderColor: 'rgba(81,143,239, 1)',
            borderWidth: 3
          },
        }
      ]

    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Percentage.defaultProps = {
  backgroundColor: '#011c3a',
  width: '300px',
  height: '300px',
  unit: '人',
  gridLeft: '10%',
  gridRight: '10%',
  gridBottom: 30,
  gridTop:30,
  barWidth: 15,
  bckColor:'rgba(255,255,255,0.1)',
  colors: ['#5CBEFF','#518FEF'],
  fontColor: '#5CBEFF',
  fontSize:'24',
  chartData: {
    name:'无数据',
    value: 0,
    percentage: 0
  }
}

export default Percentage;