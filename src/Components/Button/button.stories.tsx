import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonProps } from './button';

export default {
  title: '组件库/Button',
  component: Button,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
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

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  btnType: "primary",
  size:"sm",
  children: 'primary'
}
// Primary.story = {
//   parameters: {
//     info: { 
//       text: `
//         ## 主按钮示意
    
//         ~~~js
//         <Button>Primary Button</Button>
//         ~~~
//       `,
//      },
//   },
// }

export const Default = Template.bind({});
Default.args = {
  btnType: 'default',
  size:'sm',
  children: 'default'
}

export const Danger = Template.bind({});
Danger.args = {
  btnType: 'danger',
  size: 'sm',
  children: 'danger'
}

export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  size:'sm',
  children: 'link',
  href: 'http:/www.baidu.com'
}