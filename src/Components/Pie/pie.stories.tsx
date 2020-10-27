import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Pie, { PieProps } from './pie';

export default {
  title: '组件库/Pie',
  component: Pie,
  argTypes: {
    backgroundColor: { control: 'color' },
    bckColor: { control: 'color' },
  },
} as Meta;

const Template: Story<PieProps> = (args) => <Pie {...args} />;

export const normal = Template.bind({});
normal.args = {
  width: '500px',
  height: '500px',
  toolTipUnit: '次',
  isFill: false,
  center:['50%','50%'],
  showLabeLine: true,
  chartData: [
    {
      name:'数据1',
      color: '#02AAB0',
      value: '200'
    },
    {
      name:'数据2',
      color: '#00CDAC',
      value: '100'
    },
    {
      name:'数据3',
      color: '#FD866A',
      value: '180'
    },
  ]
}

export const  filled = Template.bind({});
filled.args = {
  width: '500px',
  height: '500px',
  toolTipUnit: '次',
  isFill: true,
  center:['50%','50%'],
  showLabeLine: true,
  chartData: [
    {
      name:'数据1',
      color: '#02AAB0',
      value: '200'
    },
    {
      name:'数据2',
      color: '#00CDAC',
      value: '100'
    },
    {
      name:'数据3',
      color: '#FD866A',
      value: '180'
    },
  ]
}