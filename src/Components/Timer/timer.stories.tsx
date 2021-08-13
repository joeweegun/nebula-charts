import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import TimerCompo, { TimerCompoProps } from './timer';

export default {
  title: '组件库/Timer',
  component: TimerCompo,
  argTypes: {
    fontColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TimerCompoProps> = (args) => <TimerCompo {...args} />;

export const Timer = Template.bind({});
Timer.args = {
  
}