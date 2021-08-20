import React, { FC } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { hexToRGBA } from '../../utils/chart';
import { commonTooltip } from '../../utils/tooltip';
import 'echarts/map/js/china';

import { BaseOptions } from '../common.d';


export interface MapDataInterface {
  name: string;
  value: number[];
} 

export interface BarInterface {
  /**
  * 模块背景色
  */
   backgroundColor?: string;
  /**
  * 地图区域颜色
  */
  areaColor?: string;
  /**
  * 地图区域高亮颜色
  */
  areaActiveColor?: string;
  /**
  * 地图边框颜色
  */
  borderColor?: string;
  /**
  * 标志点颜色
  */
   effectColor?: string;
  /**
  * 地图投影颜色
  */
  shadowColor?: string;
  /**
  * 数据源
  */
  chartData: Array<MapDataInterface>
}


export type BarProps = BarInterface & BaseOptions;

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { ChinaMap } from 'nebula-charts'
 * ~~~
 */
export const ChinaMap:FC<BarProps> = (props) => {

  const { 
    backgroundColor = '011c3a',
    width = '100%',
    height = '100%',
    areaActiveColor = '#2AB8FF',
    shadowColor = 'rgba(0,54,255, 1)',
    areaColor = '#01215c',
    borderColor = '#3074d0',
    effectColor = '#0ef5d1',
    chartData = []
  } = props;

  const getOption = ():echarts.EChartOption<echarts.EChartOption.Series> => {
    const option :any= {
      backgroundColor,
      geo: {
        show: true,
        map: 'china',
        label: {
          emphasis: {
            show: true,
            color: '#fff',
          },
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#01215c',
            borderWidth: 1, //设置外层边框
            borderColor: '#9ffcff',
            shadowColor,
            shadowBlur: 20,
          },
          emphasis: {
            areaColor: '#01215c',
          },
        },
      },
      tooltip: {
        trigger: 'item',
        ...commonTooltip,
        formatter: (params: any) => {
          if (params.value.length > 1) {
            return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value[2] + '&nbsp;&nbsp;';
          } else {
            return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '&nbsp;&nbsp;';
          }
      },
      },
      series: [
        {
          type: 'map',
          map: 'china',
          geoIndex: 1,
          aspectScale: 0.75, //长宽比
          showLegendSymbol: false, // 存在legend时显示
          tooltip: {
            show: false,
          },
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
            emphasis: {
              areaColor: areaActiveColor,
            },
          },
        },
        {
          name: '',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: chartData,
          symbolSize: 20,
          symbol: 'circle',
          // symbolSize: (val:any) => {
          //   console.log('9999999', val)
          //   return val[2];
          // },
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: hexToRGBA(effectColor,0.2),
                  },
                  {
                    offset: 0.8,
                    color: hexToRGBA(effectColor,0.5),
                  },
                  {
                    offset: 1,
                    color: hexToRGBA(effectColor,1),
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        },
      ],
    };
    return option
  }




  return <ReactEcharts notMerge option={getOption()} style={{ width: `${width}`, height: `${height}` }}/>

}

ChinaMap.defaultProps = {
  backgroundColor: '#011c3a',
  areaActiveColor: '#2AB8FF',
  shadowColor: 'rgba(0,54,255, 1)',
  areaColor: '#01215c',
  borderColor: '#3074d0',
  effectColor: '#0ef5d1',
  chartData: [
    {name: '海门', value: [121.15, 31.89,12]},
    {name: '鄂尔多斯', value: [109.781327, 39.608266,32]}
  ]
}

export default ChinaMap;