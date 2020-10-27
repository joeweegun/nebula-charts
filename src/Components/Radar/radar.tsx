import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { legendPos } from '../../utils/chart';

import { BaseOptions } from '../common.d';

export interface IndicatorDataInterface {
  name: string;
  max: number | string;
} 

export interface RadarDataInterface {
  name: string;
  areaColor: string;
  borderColor: string;
  value: (number | string)[];
} 

export interface RadarInterface {
  /**
  * 背景网格颜色
  */
 bckColor?: string;
   /**
  * 区域宽度，默认50%
  */
 radius?: string;
 /**
  * 字体大小，事例“12”或者12
  */
 fontSize?: string | number;
  /**
  * 字体颜色
  */
 fontColor?: string | number;
 /**
  * 图例位置
  */
 legendPosition?: string;
  /**
  * 数据源
  */
  chartData: Array<RadarDataInterface>;
  /**
  * indicator名称和最大值
  */
  indicatorData: Array<IndicatorDataInterface>;
}


export type RadarProps = RadarInterface & BaseOptions;

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { Radar } from 'nebula-charts'
 * ~~~
 */
export const Radar:FC<RadarProps> = (props) => {

  const { 
    backgroundColor,
    width = '100%',
    height = '100%',
    gridLeft,
    gridRight,
    gridBottom,
    gridTop,
    bckColor,
    fontSize,
    fontColor,
    radius,
    legendPosition,
    chartData=[],
    indicatorData=[],
    showLegend,
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    const Colors = chartData?.map((item:RadarDataInterface) => item?.borderColor);
    const Names = chartData?.map((item:RadarDataInterface) => item?.name);

    const transData = chartData?.map((item:RadarDataInterface) => {
      return{
        name:item?.name,
        value:item?.value
      }
    })

    const option = {
      backgroundColor,
      color:Colors,
      grid: {
        left: gridLeft,
        right: gridRight,
        bottom: gridBottom,
        top:gridTop,
        containLabel: true,
      },
      legend: {
        show: showLegend,
        type: "scroll",
        data: [...Names],
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          fontSize: 10,
          color: '#b3baca',
        },
        icon: 'circle',
        ...legendPos[`${legendPosition}`]

      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(254,254,254,0.85)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
        textStyle: {
          color: '#363636',
        },
      },
      radar: {
        // shape: 'circle',
        radius: radius,
        name: {
          textStyle: {
            fontSize: fontSize,
            color: [fontColor],
            padding: [3, 5]
          }
        },
        splitNumber: 4,
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(12,62,129,0)','rgba(12,62,129,0.3)','rgba(12,62,129,0)','rgba(12,62,129,0)']
          }
        },
        splitLine: {
          lineStyle: {
            color: bckColor
          }
        },
        axisLine: {
          lineStyle: {
            color: bckColor
          },
        },
        indicator: [
          ...indicatorData
        ]
      },
      series: [
        {
          name: '',
          type: 'radar',
          areaStyle: {
            opacity: 0.3
          },
          data: transData
        },
      ]
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Radar.defaultProps = {
  backgroundColor: '#011c3a',
  width: '100%',
  height: '100%',
  gridLeft: '10%',
  gridRight: '10%',
  gridBottom: 30,
  gridTop:60,
  bckColor:'#0c3e81',
  legendPosition: 'top',
  showLegend: true,
  radius: '50%',
  fontSize: 12,
  fontColor: '#d1dbf2',
  chartData: [
    {
      name:'无数据',
      areaColor: '#02AAB0',
      borderColor:'31e586',
      value: [30,100,200,150,150,230,190]
    },
  ],
  indicatorData: [
    { name: '指标1', max: 100},
  ]
}

export default Radar;