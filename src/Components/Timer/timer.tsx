import React, { FC, useRef, useEffect, useState } from 'react';


export interface TimerCompoInterface {
 /**
  * 字体大小，事例“12”或者12
  */
 fontSize?: string | number;
  /**
  * 字体颜色
  */
 fontColor?: string ;
 /**
  * 字重
  */
  fontWeight?: string | any;
  /**
  * 显示年月日
  */
  isShowYmd?: boolean;
  /**
  * 显示时分秒
  */
  isShowHms?: boolean;
  /**
  * 显示星期
  */
  isShowWeek?: boolean;
}

const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];


export type TimerCompoProps = TimerCompoInterface;

/**
 * 欢迎使用nebula-charts
 * ## 引用方法
 * 
 * ~~~js
 * import { TimerCompo } from 'nebula-charts'
 * ~~~
 */
export const TimerCompo:FC<TimerCompoProps> = (props) => {

  const { 
    fontSize,
    fontColor,
    fontWeight,
    isShowYmd,
    isShowHms,
    isShowWeek,
  } = props;

  const timer = useRef<any>(null)
  const [ currentTime, setCurrentTime ] = useState<string>('')
  const renderDate = () => {
    const dt = new Date();
		const y = dt.getFullYear();
		const mt = dt.getMonth()+1;
		const day = dt.getDate();
    const h = dt.getHours();//获取时
    const m = dt.getMinutes();//获取分
    const s = dt.getSeconds();//获取秒
    const weekIndex = dt.getDay();
    const currentWeek = weeks[weekIndex] 
    // console.log(y+"年"+mt+"月"+day+"-"+h+"时"+m+"分"+s+"秒")
    // const ct = y+"年"+mt+"月"+day+"-"+h+"时"+m+"分"+s+"秒"+"-"+currentWeek;
    const ymd = isShowYmd ? y+"年"+mt+"月"+day+"日" : '';
    const hms = isShowHms ? "  "+h+"时"+m+"分"+s+"秒" : '';
    const week = isShowWeek ? "  "+currentWeek : '';
    const transDate = `${ymd}${week}${hms}`
    setCurrentTime(transDate)
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      renderDate()
    }, 1000)
    return () => {
      clearInterval(timer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowYmd,isShowHms,isShowWeek])

  // ts-ignore
  return <div><span style={{fontSize,fontWeight,color:fontColor}}>{currentTime}</span></div>
}

TimerCompo.defaultProps = {
  fontSize: 28,
  fontColor: '#000',
  fontWeight:'normal',
  isShowYmd: true,
  isShowHms: true,
  isShowWeek: true,
}

export default TimerCompo;