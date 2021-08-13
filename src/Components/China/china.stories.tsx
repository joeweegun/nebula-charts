import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import ChinaMap, { BarProps } from './china';

export default {
  title: '组件库/Map',
  component: ChinaMap,
  argTypes: {
    backgroundColor: { control: 'color' },
    areaActiveColor: { control: 'color' },
    areaColor: { control: 'color' },
    borderColor: { control: 'color' },
    shadowColor: { control: 'color' },
    effectColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BarProps> = (args) => <ChinaMap {...args} />;

export const china = Template.bind({});
china.args = {
  width: '500px',
  height: '300px',
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