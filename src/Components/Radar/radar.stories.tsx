import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Radar, { RadarProps } from './radar';

export default {
  title: '组件库/Radar',
  component: Radar,
  argTypes: {
    backgroundColor: { control: 'color' },
    bckColor: { control: 'color' },
    fontColor: { control: 'color' },
  },
} as Meta;

const Template: Story<RadarProps> = (args) => <Radar {...args} />;

export const radar = Template.bind({});
radar.args = {
  width: '500px',
  height: '500px',
  chartData: [
    {
      name:'指标1',
      areaColor: '#02AAB0',
      borderColor:'#02AAB0',
      value: [30,100,200,150,150,230,190]
    },
    {
      name:'指标2',
      areaColor: '#02AAB0',
      borderColor:'#8E2DE2',
      value: [50,10,150,190,50,30,90]
    },
  ],
  indicatorData: [
    {name:'数据1',max: 300},
    {name:'数据2',max: 300},
    {name:'数据3',max: 300},
    {name:'数据4',max: 300},
    {name:'数据5',max: 300},
    {name:'数据6',max: 300},
    {name:'数据7',max: 300},
  ]
}