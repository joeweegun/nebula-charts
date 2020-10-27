import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Percentage, { PercentageProps } from './percentage';

export default {
  title: '组件库/Percentage',
  component: Percentage,
  argTypes: {
    backgroundColor: { control: 'color' },
    fontColor: { control: 'color' },
    bckColor: { control: 'color' },
  },
} as Meta;

const Template: Story<PercentageProps> = (args) => <Percentage {...args} />;

export const percentage = Template.bind({});
percentage.args = {
  width: '300px',
  height: '300px',
  unit: '人',
  bckColor:'rgba(255,255,255,0.1)',
  chartData: {
    name:'1',
    value: 500,
    percentage: 55.5
  }
}