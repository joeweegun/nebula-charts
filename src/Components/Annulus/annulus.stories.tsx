import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Annulus, { AnnulusProps } from './annulus';

export default {
  title: '组件库/Annulus',
  component: Annulus,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
} as Meta;

const Template: Story<AnnulusProps> = (args) => <Annulus {...args} />;

export const annulus = Template.bind({});
annulus.args = {
  width: '500px',
  height: '500px',
  toolTipUnit: '%',
  chartData: [
    {
      name:'数据1',
      color: '#02AAB0',
      value: 200,
      maxValue: 300,
    },
    {
      name:'数据2',
      color: '#00CDAC',
      value: 100,
      maxValue: 300,
    },
    {
      name:'数据3',
      color: '#FD866A',
      value: 180,
      maxValue: 200,
    },
  ]
}