import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Bar, { BarProps } from './bar';

export default {
  title: '组件库/Bar',
  component: Bar,
  argTypes: {
    backgroundColor: { control: 'color' },
    axisLineColor: { control: 'color' },
    axisFontColor: { control: 'color' },
  },
  // parameters: {
  //   info: {
  //     text: `
  //       ## description or documentation about my component, supports markdown
    
  //       ~~~js
  //       <Button>Click Here</Button>
  //       ~~~
  //     `,
  //   }
    
  // },
} as Meta;

const Template: Story<BarProps> = (args) => <Bar {...args} />;

export const normal = Template.bind({});
normal.args = {
  width: '500px',
  height: '300px',
  unit: '单位/次',
  toolTipUnit: '次',
  barWidth: '15',
  axisLineColor: '#8e9eab',
  axisFontColor: '#8e9eab',
  rotate: 0,
  mode:'normal',
  crossLineColor:'#1EA7FD',
  crossFontColor:'white',
  chartData: [
    {
      name: '指标1',
      xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yData: [10, 20, 30, 15, 36, 20, 10],
      colors: ['#16D7DC', '#16D7DC', '#16D7DC'],
    },
    {
      name: '指标2',
      xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yData: [30, 10, 20, 55, 36, 30, 5],
      colors: ['rgba(70, 25, 233, 1)', 'rgba(162, 22, 220, 1)', 'rgba(163, 46, 224, 1)'],
    },
  ]
}

export const horizontal = Template.bind({});
horizontal.args = {
  width: '600px',
  height: '400px',
  unit: '单位/次',
  toolTipUnit: '次',
  barWidth: '20',
  axisLineColor: '#8e9eab',
  axisFontColor: '#8e9eab',
  rotate: 0,
  gridRight:'12%',
  gridLeft:'5%',
  mode:'horizontal',
  chartData: [
    {
      name: '指标1',
      xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yData: [10, 20, 30, 15, 36, 20, 10],
      colors: ['#16D7DC', '#16D7DC', '#16D7DC'],
    },
    {
      name: '指标2',
      xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yData: [30, 10, 20, 55, 36, 30, 5],
      colors: ['rgba(70, 25, 233, 1)', 'rgba(162, 22, 220, 1)', 'rgba(163, 46, 224, 1)'],
    },
  ]
}

export const withDatazoom = Template.bind({});
withDatazoom.args = {
  width: '500px',
  height: '300px',
  gridBottom:50,
  unit: '单位/次',
  toolTipUnit: '次',
  barWidth: '15',
  axisLineColor: '#8e9eab',
  axisFontColor: '#8e9eab',
  rotate: 0,
  mode:'normal',
  showDataZoom: true,
  dataZoomStart:0,
  dataZoomEnd:80,
  chartData: [
    {
      name: '指标1',
      xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yData: [10, 20, 30, 15, 36, 20, 10],
      colors: ['#16D7DC', '#16D7DC', '#16D7DC'],
    },
    {
      name: '指标2',
      xData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      yData: [30, 10, 20, 55, 36, 30, 5],
      colors: ['rgba(70, 25, 233, 1)', 'rgba(162, 22, 220, 1)', 'rgba(163, 46, 224, 1)'],
    },
  ]
}