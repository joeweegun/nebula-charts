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
      name:'数据一',
      colors: ['#02AAB0','#00CDAC'],
      xData: ['一月','二月','三月'],
      yData: [10,11,12]
    },
    {
      name:'数据二',
      colors: ['#8E2DE2','#4A00E0'],
      xData: ['一月','二月','三月'],
      yData: [20,6,32]
    }
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
      name:'数据一',
      colors: ['#02AAB0','#00CDAC'],
      xData: ['一月','二月','三月'],
      yData: [10,11,12]
    },
    {
      name:'数据二',
      colors: ['#8E2DE2','#4A00E0'],
      xData: ['一月','二月','三月'],
      yData: [20,6,32]
    }
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
      name:'数据一',
      colors: ['#02AAB0','#00CDAC'],
      xData: ['一月','二月','三月'],
      yData: [10,11,12]
    },
    {
      name:'数据二',
      colors: ['#8E2DE2','#4A00E0'],
      xData: ['一月','二月','三月'],
      yData: [20,6,32]
    }
  ]
}