import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { legendPos,hexToRGBA } from '../../utils/chart';

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
    legendPosition,
    chartData=[],
    center,
    showLegend
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    const Names = chartData?.map((item:AnnulusDataInterface) => item?.name);

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
              name: item?.name,
              itemStyle: {
                normal: {
                  color: hexToRGBA(item?.color,0.06)
                },
              },
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
        backgroundColor: 'rgba(254,254,254,0.85)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
        textStyle: {
          color: '#363636',
        },
        formatter: (parms:any) => {
          // const str = `${parms.marker} ${parms.data.name}: ${parms.data.value}${toolTipUnit}`;
          const str = `${parms.data.name}: ${parms.data.value}${toolTipUnit}`;
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
  legendPosition: 'right',
  center: ['50%','50%'],
  showLegend: true,
  chartData: [
    {
      name:'无数据',
      color: '#02AAB0',
      value: 0,
      maxValue: 0,
    }
  ]
}

export default Annulus;