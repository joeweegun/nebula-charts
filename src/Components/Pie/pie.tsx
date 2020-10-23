import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { legendPos } from '../../utils/chart';

import { BaseOptions } from '../common.d';


export interface PieDataInterface {
  name: string;
  color: string;
  value: (string | number);
} 

export interface PieInterface {
 /**
  * 单位
  */
 toolTipUnit?: string;
  /**
  * 背景圆颜色
  */
 bckColor?: string;
 /**
  * 是否是实心圆
  */
 isFill?: boolean;
 /**
  * 是否显示标注线
  */
 showLabeLine?: boolean;
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
  chartData: Array<PieDataInterface>
}


export type PieProps = PieInterface & BaseOptions;

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { Pie } from 'nebula-charts'
 * ~~~
 */
export const Pie:FC<PieProps> = (props) => {

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
    isFill,
    legendPosition,
    chartData=[],
    center,
    showLegend,
    showLabeLine
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    const Colors = chartData?.map((item:PieDataInterface) => item?.color);
    const Names = chartData?.map((item:PieDataInterface) => item?.name);

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
        data: [...Names],
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
          const str = `${parms.marker} ${parms.data.name} </br>
            数量：${parms.data.value} ${toolTipUnit}</br>
            占比：${parms.percent}%`;
          return str;
      }
      },
      series: [
        {
          type: 'pie',
          z: 3,
          center: center,
          radius: !isFill ? ['28%', '40%'] : ['0%', '40%'],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 3,
          itemStyle: {
            normal: {
              color: (params:any) => {
                return Colors[params.dataIndex]
              },
              borderColor: bckColor,
              borderWidth: 2
            }
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{a|{b}：{d}%}\n{hr|}',
            rich: {
              hr: {
                backgroundColor: 't',
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12]
              },
              a: {
                padding: [-30, 15, -20, 15]
              }
            },
            normal: {
              show: showLabeLine,
              formatter: ' {b|{b}}\n{per|{d}%}  ',
              borderWidth: 1,
              borderRadius: 2,
              rich: {
                b: {
                  fontSize: 10,
                },
                per: {
                  fontSize: 10,
                  borderRadius: 2,
                },
              },
            },
            emphasis: {
              show: showLabeLine,
              textStyle: {
                fontSize: '12',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 30,
              lineStyle: {
                width: 1
              }
            }
          },
          data: chartData
        },
        {
          name:'第一层环',
          type: 'pie',
          z: 2,
          tooltip:{
              show:false
          },
          center: center,
          radius: ['40%', '50%'],
          hoverAnimation: false,
          clockWise: false,
          itemStyle: {
            normal: {
              color: bckColor,
            },
            emphasis:{
              color: bckColor,
            }
          },
          label: {
              show: false
          },
          data: [100]
        }
      ]
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Pie.defaultProps = {
  backgroundColor: '#011c3a',
  width: '100%',
  height: '100%',
  toolTipUnit: '次',
  gridLeft: '10%',
  gridRight: '10%',
  gridBottom: 30,
  gridTop:60,
  bckColor:'rgba(0,0,0,0.2)',
  isFill: false,
  legendPosition: 'right',
  center: ['50%','50%'],
  showLabeLine:true,
  showLegend: true,
  chartData: [
    {
      name:'数据1',
      color: '#02AAB0',
      value: '200'
    },
    {
      name:'数据2',
      color: '#00CDAC',
      value: '100'
    },
  ]
}

export default Pie;