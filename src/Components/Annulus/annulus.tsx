import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { legendPos } from '../../utils/chart';

import { BaseOptions } from '../common.d';

export interface AnnulusDataInterface {
  name: string;
  color: string;
  value: number;
  maxValue: number;
} 

export interface AnnulusInterface {
 /**
  * 单位
  */
 toolTipUnit?: string;
  /**
  * 背景圆颜色
  */
 bckColor: string;
  /**
  * 图例位置
  */
 legendPosition?: string;
 /**
  * 图表中心
  */
 center?: string[];
  /**
  * 数据源
  */
  chartData: Array<AnnulusDataInterface>
}


export type AnnulusProps = AnnulusInterface & BaseOptions;

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { Annulus } from 'nebula-charts'
 * ~~~
 */
export const Annulus:FC<AnnulusProps> = (props) => {

  const { 
    backgroundColor,
    width = '100%',
    height = '100%',
    toolTipUnit = '',
    gridLeft,
    gridRight,
    gridBottom,
    gridTop,
    bckColor,
    legendPosition,
    chartData=[],
    center,
    showLegend
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    // const Colors = chartData?.map((item:AnnulusInterface) => item?.color);
    const Names = chartData?.map((item:AnnulusDataInterface) => item?.name);

    const placeHolderStyle = {
      normal: {
        color: bckColor,
      },
    };

    const transSeries = chartData?.map((item:AnnulusDataInterface,index:number) => {
      return  {
          name: item?.name,
          type: 'pie',
          center: center,
          clockWise: false,
          hoverAnimation: false, //鼠标移入变大
          radius: [`${35 + (index*11)}%`, `${42 + (index*11)}%`],
          itemStyle: {
            borderRadius: 5,
            normal: {
              color: item?.color,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [
            {
              value: item?.maxValue,
              name: 'invisible',
              itemStyle: placeHolderStyle
            },
            {
              value: item?.value,
              name: item?.name,
            }
          ]
      };
    })

    const option = {
      backgroundColor,
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
        data: Names,
        // top: '5%',
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
        // borderColor: 'rgba(255,255,255,.3)',
        // backgroundColor: 'rgba(13,5,30,.6)',
        // borderWidth: 1,
        backgroundColor: 'rgba(254,254,254,0.85)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
        textStyle: {
          color: '#363636',
        },
        formatter: (parms:any) => {
          // const str = `${parms.marker} ${parms.data.name} </br>
          //   数量：${parms.data.value} ${toolTipUnit}</br>
          //   占比：${parms.percent}%`;
          const str = `${parms.marker} ${parms.data.name}: ${parms.data.value}${toolTipUnit}`;
          return str;
        }
      },
      series: transSeries
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Annulus.defaultProps = {
  backgroundColor: '#011c3a',
  width: '100%',
  height: '100%',
  toolTipUnit: '次',
  gridLeft: '10%',
  gridRight: '10%',
  gridBottom: 30,
  gridTop:60,
  bckColor:'rgba(0,0,0,0.2)',
  legendPosition: 'right',
  center: ['50%','50%'],
  showLegend: true,
  chartData: [
    {
      name:'数据1',
      color: '#02AAB0',
      value: 200,
      maxValue: 300,
    },
    {
      name:'数据2',
      color: '#00CDAC',
      value: 100,
      maxValue: 300,
    },
  ]
}

export default Annulus;