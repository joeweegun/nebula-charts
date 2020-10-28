import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import { BaseOptions,BaseDataZoom } from '../common.d';


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
 barWidth?: string | number;
 /**
  * Y轴单位
  */
 unit?: string;
  /**
  * 是否光滑曲线，默认false
  */
 smooth?: boolean;
  /**
  * 线宽
  */
 lineWidth?: number;
  /**
  * 是否显示底部缩放条，默认false
  */
 showDataZoom?: boolean;
  /**
  * 底部进度条默认起点，默认为0
  */
 dataZoomStart?: number;
  /**
  * 底部进度条默认终点，默认为100
  */
 dataZoomEnd?: number;
 /**
  * Y轴单位
  */
 toolTipUnit?: string;
  /**
  * X轴文字倾斜角度
  */
 rotate?:number | string;
  /**
  * 鼠标浮动标尺线颜色，默认red
  */
 crossLineColor?: string;
  /**
  * 鼠标浮动标尺线,对应文字颜色，默认white
  */
 crossFontColor?: string;
 /**
  * 鼠标浮动标尺线类型，默认虚线dashed，可选实线solid
  */
 crossLineStyle?: string;
  /**
  * 数据源
  */
  chartData: Array<BarDataInterface>
}


export type BarProps = BarInterface & BaseOptions;

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { Line } from 'nebula-charts'
 * ~~~
 */
export const Line:FC<BarProps> = (props) => {

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
    lineWidth,
    showDataZoom,
    dataZoomStart=0,
    dataZoomEnd=100,
    crossLineColor,
    crossFontColor,
    crossLineStyle,
    chartData=[],
    smooth,
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    const transSeries = chartData?.map((item:BarDataInterface) => {
      const {
        colors,
        yData
      } = item;
      return {
        name: item?.name,
        type: 'line',
        smooth,
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
            // areaStyle: { 
            //   color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            //     offset: 0,
            //     color: 'rgba(58,132,255,0)'
            //   }, {
            //     offset: 1,
            //     color: colors[0]
            //   }]),
            // }
          }
        },
        lineStyle: {
          normal: {
            width: lineWidth,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                  offset: 0,
                  color: colors[0] // 0% 处的颜色
              }, {
                  offset: 1,
                  color: colors[0] // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            shadowColor: colors[0],
            shadowBlur: 2,
            shadowOffsetY: 1
          }
        },
        label: {
          normal: {
            show: false,
            fontSize: 12,
            fontWeight: 'bold',
            color: axisFontColor,
            position: 'top',
          }
        },
        data: yData
      };
    });

    let transDataZoom = {};
    if(showDataZoom){
      transDataZoom = BaseDataZoom(dataZoomStart,dataZoomEnd);
    }

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
            relVal += `      ${marker} ${params[i].value}${toolTipUnit}      <br/>`;
          }
          return relVal;
        },
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: crossLineColor,
            borderColor: crossLineColor,
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textStyle: {
              color: crossFontColor,
            },
            precision: 0,
          },
          lineStyle: {
            type: crossLineStyle,
            color: crossLineColor,
          },
          crossStyle: {
            type: crossLineStyle,
            color: crossLineColor,
            // type: 'solid',
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
        boundaryGap: false,//坐标轴两边留白
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
        // interval:500,
      }],
      ...transDataZoom,
      series: [
        ...transSeries
      ]
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts option={getOption()} style={{ width: `${width}`, height: `${height}` }} />

}

Line.defaultProps = {
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
  smooth: false,
  showDataZoom: false,
  dataZoomStart:0,
  dataZoomEnd:100,
  lineWidth: 2,
  crossLineColor:'red',
  crossFontColor:'white',
  crossLineStyle:'dashed',
  chartData: [
    {
      name:'-',
      colors:['#5ef3ff','#06a4f4'],
      xData: [0],
      yData: [0]
    }
  ]
}

export default Line;