import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

import Button ,{ ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

describe('test Button component',() => {
  it('should render the correct default button',() => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element  = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props',() => {
    const wrapper  = render(<Button {...testProps}>Nice</Button>)
    const element  = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided',() => {
    const wrapper = render(<Button btnType='link' href="http://www.baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
})