export interface BaseOptions {
  /**
  * 图表背景颜色
  */
  backgroundColor?: string;
  /**
  * 上边距
  */
  gridTop?:number | string;
  /**
   * 右边距
   */
  gridRight?:number | string;
  /**
   * 下边距
   */
  gridBottom?:number | string;
  /**
   * 左边距
   */
  gridLeft?:number | string;
  /**
   * 是否显示图例
   */
  showLegend?:boolean;
  /**
   * 图表宽度
   */
  width?: string;
  /**
   * 图表高度
   */
  height?: string;
}

export const BaseDataZoom = (start:number,end:number) => {

  return {
    dataZoom: [
      {
        show: true,
        height: 20,
        xAxisIndex: [0],
        bottom: 20,
        "start": start,
        "end": end,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: "rgba(142,158,171,1)",
        },
        textStyle:{
          color:"rgba(142,158,171,0.5)",
        },
        fillerColor:"rgba(142,158,171,0.3)",
        borderColor: "rgba(142,158,171,0.5)",
      }, 
      {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
      }
    ],
  }
  
}