import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts-liquidfill/src/liquidFill';

import { BaseOptions } from '../common.d';


export interface LiquidDataInterface {
  name: string;
  value: (string | number);
} 

export interface PieInterface {
 /**
  * 单位
  */
 unit?: string;
  /**
  * 背景圆颜色
  */
 bckColor?: string;
 /**
  * 圆border颜色
  */
 borderColor?: string;
  /**
  * 圆border宽度
  */
 borderWidth?: number;
 /**
  * 圆主要颜色
  */
 mainColor?: string;
 /**
  * 字体大小，事例“28”或者28
  */
 fontSize?: string | number;
 /**
  * 圆大小，默认80%
  */
 radius?: string;
 /**
  * 图表中心
  */
 center?: string[];
  /**
  * 数据源
  */
  chartData: LiquidDataInterface
}


export type LiquidProps = Omit<(PieInterface & BaseOptions),'showLegend'>; // Omit<User, "age" | "email">

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { Liquid } from 'nebula-charts'
 * ~~~
 */
export const Liquid:FC<LiquidProps> = (props) => {

  const { 
    backgroundColor,
    width = '100%',
    height = '100%',
    unit = '',
    gridLeft,
    gridRight,
    gridBottom,
    gridTop,
    bckColor,
    mainColor,
    borderColor,
    borderWidth,
    fontSize,
    radius,
    chartData,
    center,
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {

    const option = {
      backgroundColor,
      grid: {
        left: gridLeft,
        right: gridRight,
        bottom: gridBottom,
        top:gridTop,
        containLabel: true,
      },
      series: [
        {
          name: chartData?.name,
          type: 'liquidFill',
          radius: radius,
          center: center,
          waveAnimation: 10, // 动画时长
          amplitude: 20, // 振幅
          data: [`${chartData?.value}`],
          color:[mainColor],
          label: {
            normal: {
              color: '#fff',
              textStyle: {
                fontSize: fontSize,
                fontWeight: 'normal'
              },
              formatter: (params:any) => { 
                let newValue = params.value * 100;
                return `${newValue} ${unit}`
              }
            }
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: borderColor,
              borderWidth: borderWidth
            }
          },
          backgroundStyle: {
            color: bckColor
          }
        }
      ]
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Liquid.defaultProps = {
  backgroundColor: '#011c3a',
  width: '300px',
  height: '300px',
  unit: '%',
  gridLeft: '10%',
  gridRight: '10%',
  gridBottom: 30,
  gridTop:30,
  bckColor:'rgba(255,255,255,0.1)',
  mainColor: '#FE8704',
  borderColor: '#FE8704',
  borderWidth:2,
  fontSize:'28',
  radius:'80%',
  center: ['50%','50%'],
  chartData: {
    name:'无数据',
    value: '0'
  }
}

export default Liquid;