import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Line, { BarProps } from './line';

export default {
  title: '组件库/Line',
  component: Line,
  argTypes: {
    backgroundColor: { control: 'color' },
    axisLineColor: { control: 'color' },
    axisFontColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BarProps> = (args) => <Line {...args} />;

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
  smooth: true,
  lineWidth: 3,
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