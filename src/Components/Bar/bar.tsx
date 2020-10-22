import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import { BaseOptions } from '../common.d';


export interface BarDataInterface {
  name: string;
  colors: string[];
  xData: (string | number)[];
  yData: (string | number)[]
} 

export interface BarInterface {
  /**
  * x轴，y轴颜色
  */
  axisLineColor?: string;
  /**
  * x轴，y轴文字颜色
  */
  axisFontColor?: string;
  /**
  * x轴文字大小
  */
 axisFontSize?: string;
 /**
  * y轴文字大小
  */
 yaxisFontSize?: string;
 /**
  * 柱形图宽度
  */
 barWidth?: string;
 /**
  * Y轴单位
  */
 unit?: string;
 /**
  * Y轴单位
  */
 toolTipUnit?: string;
  /**
  * X轴文字倾斜角度
  */
 rotate?:number | string;
  /**
  * 数据源
  */
  chartData: Array<BarDataInterface>
}


export type BarProps = BarInterface & BaseOptions;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ## 引用方法
 * 
 * ~~~js
 * import { Bar } from 'nebula-charts'
 * ~~~
 */
export const Bar:FC<BarProps> = (props) => {

  const { 
    backgroundColor,
    axisLineColor,
    axisFontColor,
    axisFontSize,
    yaxisFontSize,
    width = '100%',
    height = '100%',
    unit = '',
    toolTipUnit = '',
    barWidth = '30',
    rotate = 0,
    gridLeft,
    gridRight,
    gridBottom,
    gridTop,
    showLegend,
    chartData=[],
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    const transSeries = chartData?.map((item:BarDataInterface) => {
      const {
        colors,
        yData
      } = item;
      return {
        name: item?.name,
        type: 'bar',
        barWidth: `${barWidth}`,
        itemStyle:{
          normal:{
            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: colors[0]
            }, {
              offset: 1,
              color: colors[1]
            }], false),
            barBorderRadius: [30, 30, 30, 30],
          }
        },
        label: {
          normal: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            color: axisFontColor,
            position: 'top',
          }
        },
        data: yData
      };
    });
    const xData = chartData?.length>0 && chartData[0]?.xData;
    const Colors = chartData?.map((item:BarDataInterface) => item?.colors);
    const Names = chartData?.map((item:BarDataInterface) => item?.name);

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
        top: '5%',
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          fontSize: 10,
          color: '#b3baca',
        },
        icon: 'circle',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          let relVal = `${params[0].name}<br />`;
          for (let i = 0, l = params.length; i < l; i += 1) {
            const marker = `<span class="tooltip-marker" style="background-image: linear-gradient(${Colors[i][0]}, ${Colors[i][1]});"></span>`
            // relVal += `${marker} ${params[i].name} : ${params[i].value}${unit}<br/>`;
            relVal += `      ${marker} ${params[i].value}${toolTipUnit}      <br/>`;
          }
          return relVal;
        },
        // axisPointer: {
        //   type: 'shadow'
        // },
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textStyle: {
              color: '#ffffff',
            },
            precision: 0,
          },
          lineStyle: {
            color: 'red',
          },
          crossStyle: {
            color: 'red',
            type: 'solid',
          },
        },
        backgroundColor: 'rgba(254,254,254,0.85)',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
        textStyle: {
          color: '#363636',
        },
      },
      xAxis: {
        data: xData,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: axisLineColor,
            width: '1',
          }
        },
        axisLabel: {
          textStyle: {
            color: axisFontColor,
            fontSize: axisFontSize,
          },
          rotate:rotate,
        }
      },
      yAxis: [{
        name: `${unit}`,
        nameTextStyle: {
          color: axisFontColor,
          fontSize: yaxisFontSize
        },
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: axisLineColor,
            width: '1',
          },
        },
        axisLabel: {
          textStyle: {
            color: axisFontColor,
            fontSize: yaxisFontSize,
          },
        },
        splitLine: {
          show:false,
          lineStyle: {
            color: '#2d3d53'
          }
        },
        interval:500,
  
      }],
      series: [
        ...transSeries
      ]
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Bar.defaultProps = {
  backgroundColor: '#011c3a',
  width: '100%',
  height: '100%',
  unit: '单位',
  toolTipUnit: '次',
  barWidth: '30',
  axisLineColor: '#8e9eab',
  axisFontColor: '#8e9eab',
  axisFontSize: '12',
  yaxisFontSize: '12',
  rotate: 0,
  gridLeft: '10%',
  gridRight: '10%',
  gridBottom: 30,
  gridTop:60,
  showLegend: true,
  chartData: [
    {
      name:'数据一',
      colors:['#5ef3ff','#06a4f4'],
      xData: [10,11,12],
      yData: [10,11,12]
    }
  ]
}

export default Bar;