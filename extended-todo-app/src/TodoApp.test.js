import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TodoApp from './TodoApp'

describe('TodoApp', () => {
  const wrapper = shallow(<TodoApp />)
  const completeWrapper = wrapper.setState({
    todos: [
      { text: 'Text 1', done: false },
      { text: 'Text 2', done: true },
      { text: 'Text 3', done: true },
    ],
    filter: 'completed',
    newText: 'testing',
  })
  it('should match snapshot (no buttons clicked)', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have one .App div', () => {
    expect(wrapper.find('.App')).toHaveLength(1)
  })

  it('should have one #add-task', () => {
    expect(wrapper.find('#add-task')).toHaveLength(1)
  })

  it('should render correct number of complete', () => {
    expect(completeWrapper.find('TodoItem')).toHaveLength(2)
  })
})

describe('TodoApp buttons', () => {
  const component = mount(<TodoApp />).setState({
    todos: [
      { text: 'Text 1', done: true },
      { text: 'Text 2', done: false },
      { text: 'Text 3', done: false },
    ],
    filter: 'all',
    textDisable: false,
    newText: 'Text 4',
  })

  it('add button should add one TodoItem with correct text and #new TextInput value is cleared', () => {
    component
      .find('#add-task')
      .first()
      .simulate('click')
    expect(component.find('TodoItem')).toHaveLength(4)
    expect(
      component
        .find('TodoItem')
        .at(3)
        .prop('children')
    ).toBe('Text 4')
    expect(component.find('TextInput').prop('value')).toBe('')
  })

  it('filter buttons should filter correctly', () => {
    component
      .find('#completed-button')
      .first()
      .simulate('click')
    expect(component.find('TodoItem')).toHaveLength(1)
  })
})
