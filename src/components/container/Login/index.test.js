import React from 'react';
import { shallow } from 'enzyme';
import Login from './';

const setup = () => {
    const wrapper = shallow(<Login />);

    return wrapper;
}


test('renders without error', () => {
    const wrapper = setup();
    const appComponent = wrapper.find('#login')
    expect(appComponent.length).toBe(1)
});

test('render sign in button', () =>{
    const wrapper = setup();
    const button = wrapper.find('#signin');
    expect(button.length).toBe(1)
  });

  test('render register button', () =>{
    const wrapper = setup();
    const button = wrapper.find('#register');
    expect(button.length).toBe(1)
  });

  test('render username input textbox', () =>{
    const wrapper = setup();
    const button = wrapper.find('#username');
    expect(button.length).toBe(1)
  });

  test('render password input textbox', () =>{
    const wrapper = setup();
    const button = wrapper.find('#password');
    expect(button.length).toBe(1)
  });
