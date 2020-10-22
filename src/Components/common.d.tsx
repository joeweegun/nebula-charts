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