import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Liquid, { LiquidProps } from './liquid';

export default {
  title: '组件库/Liquid',
  component: Liquid,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LiquidProps> = (args) => <Liquid {...args} />;

export const normal = Template.bind({});
normal.args = {
  width: '300px',
  height: '300px',
  unit: '%',
  bckColor:'rgba(255,255,255,0.1)',
  mainColor: '#FE8704',
  borderColor: '#FE8704',
  radius:'60%',
  chartData: {
    name:'1',
    value: '0.6'
  }
}