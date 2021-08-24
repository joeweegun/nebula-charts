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
  * 柱形圆角，默认30，number类型
  */
 barBorderRadius?:number;
 /**
  * Y轴单位
  */
 unit?: string;
 /**
  * 柱状图模式，默认为normal，竖向柱状图， horizontal为横向
  */
 mode?: string;
 /**
  * Y轴单位
  */
 toolTipUnit?: string;
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
  * X轴文字倾斜角度
  */
 rotate?:number | string;
   /**
  * 是否显示底部缩放条，默认false
  */
 showDataZoom?: boolean;
  /**
  * 底部进度条默认起点，默认为0
  */
 dataZoomStart?: number;
  /**
  * x轴位置，默认bottom,可选top
  */
 xAxisPosition?:string;
  /**
  * 底部进度条默认终点，默认为100
  */
 dataZoomEnd?: number;
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
    showDataZoom,
    dataZoomStart=0,
    dataZoomEnd=100,
    crossLineColor,
    crossFontColor,
    crossLineStyle,
    barBorderRadius,
    xAxisPosition,
    chartData=[],
    mode,
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
  
    const transSeries = chartData?.map((item:BarDataInterface) => {
      const {
        colors,
        yData
      } = item;
      let colorGrap = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: colors[0]
      }, {
        offset: 0.5,
        color: colors[1]
      },{
        offset: 1,
        color: colors[2]
      }], false);
      if(mode === 'horizontal'){
        colorGrap = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
          offset: 0,
          color: colors[0]
        }, {
          offset: 0.5,
          color: colors[1]
        },{
          offset: 1,
          color: colors[2]
        }], false);
      }

      return {
        name: item?.name,
        type: 'bar',
        barWidth: `${barWidth}`,
        itemStyle:{
          normal:{
            color:colorGrap,
            barBorderRadius: [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius],
          }
        },
        label: {
          normal: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            color: axisFontColor,
            position: mode === 'normal' ? 'top' : 'right',
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

    let axisProps = {};

    if(mode === 'normal'){
      axisProps = {
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
          // interval:500,
        }],
      };
    }
    if(mode === 'horizontal'){
      axisProps = {
        xAxis: {
          type: 'value',
          position: xAxisPosition,
          name: `${unit}`,
          nameTextStyle: {
            color: axisFontColor,
            fontSize: axisFontSize
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
              fontSize: axisFontSize,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show:false,
            lineStyle: {
              color: '#2d3d53'
            }
          },
          // interval:500,
        },
        yAxis: {
          type: 'category',
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
              fontSize: yaxisFontSize,
            },
            rotate:rotate,
          }
        },
      };
    }

    
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
            const marker = `
              <span 
                class="tooltip-marker" 
                style="background-image: linear-gradient(${Colors[i][0]}, ${Colors[i][1]});width:10px;height:10px;display:inline-block;border-radius:5px;">
              </span>
            `
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
            color: crossLineColor,
            // type: 'solid',
            type: crossLineStyle,
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
      ...axisProps,
      ...transDataZoom,
      series: [
        ...transSeries
      ]
    };
    //@ts-ignore
    return option;
  }

  return <ReactEcharts notMerge option={getOption()} style={{ width: `${width}`, height: `${height}` }}/>

}

Bar.defaultProps = {
  backgroundColor: '#011c3a',
  width: '100%',
  height: '100%',
  unit: '',
  toolTipUnit: '',
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
  mode: 'normal',
  showDataZoom: false,
  dataZoomStart:0,
  dataZoomEnd:100,
  barBorderRadius:2,
  crossLineColor:'red',
  crossFontColor:'white',
  crossLineStyle: 'dashed',
  xAxisPosition:'bottom',
  chartData: [
    {
      name:'-',
      colors:['#5ef3ff','#06a4f4'],
      xData: [0],
      yData: [0]
    }
  ]
}

export default Bar;