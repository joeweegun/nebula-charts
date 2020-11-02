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
  * 圆的半径，number,默认为60，最大不超过100
  */
 radius?: number;
 /**
  * 圆环的宽度，number，默认12
  */
 radiusRange?: number;
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
    showLabeLine,
    radius=60,
    radiusRange=12
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
          radius: !isFill ? [`${radius - radiusRange}%`, `${radius}%`] : ['0%', `${radius}%`],
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
            // position: 'outside',
            formatter: '{a|{b}：{d}%}\n{hr|}',
            position:'outer',
            alignTo: 'edge',
            margin:10,
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
              // formatter: ' {b|{b}}\n{per|{d}%}  ',
              formatter: (v:any) => {
                let text = v.name;
                // let value_format = v.value;
                let percent_format = Math.round(v.percent) + '%';
                if (text.length <= 6) {
                  // return `${text}\n${value_format}\n${percent_format}`;
                  return `${text}\n${percent_format}`;
                } else if (text.length > 6 && text.length <= 12) {
                  return text = `${text.slice(0, 6)}\n${text.slice(6)}\n${percent_format}`
                } else if (text.length > 12 && text.length <= 18) {
                  return text = `${text.slice(0, 6)}\n${text.slice(6, 12)}\n${text.slice(12)}\n${percent_format}`
                } else if (text.length > 18 && text.length <= 24) {
                  return text = `${text.slice(0, 6)}\n${text.slice(6, 12)}\n${text.slice(12, 18)}\n${text.slice(18)}\n${percent_format}`
                } else if (text.length > 24 && text.length <= 30) {
                  return text = `${text.slice(0, 6)}\n${text.slice(6, 12)}\n${text.slice(12, 18)}\n${text.slice(18, 24)}\n${text.slice(24)}\n${percent_format}`
                } else if (text.length > 30) {
                  return text = `${text.slice(0, 6)}\n${text.slice(6, 12)}\n${text.slice(12, 18)}\n${text.slice(18, 24)}\n${text.slice(24, 30)}\n${text.slice(30)}\n${percent_format}`
                }
              },
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
          radius: [`${radius}%`, `${radius + radiusRange - 4}%`],
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
  radius:60,
  radiusRange:12,
  chartData: [
    {
      name:'无数据',
      color: '#02AAB0',
      value: '0'
    },
  ]
}

export default Pie;