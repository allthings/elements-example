import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TodoItem from './TodoItem'
import TodoApp from './TodoApp'

describe('TodoItem', () => {
  it('it should match snapshot', () => {
    const wrapper = shallow(
      <TodoItem id={0} done={true}>
        Some Text
      </TodoItem>
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TodoItem buttons', () => {
  const component = mount(<TodoApp />).setState({
    todos: [
      {
        id: 0,
        text: 'Text 0',
        done: false,
        doubleClicked: false,
        checkmark: 'flex',
        iconOpen: false,
      },
      {
        id: 1,
        text: 'Text 1',
        done: false,
      },
      {
        id: 2,
        text: 'Text 2',
        done: false,
      },
    ],
    filter: 'all',
    textDisable: true,
    text: '',
  })

  it('should set done = false if checkmark clicked', () => {
    component
      .find(TodoItem)
      .first()
      .find('#checkmark0')
      .first()
      .simulate('click')
    expect(
      component
        .find(TodoItem)
        .first()
        .prop('done')
    ).toBe(true)
  })

  it('should correctly change width of div containing icons if slided >10px', () => {
    const touchDiv = component
      .find(TodoItem)
      .first()
      .find('div.touch')

    //doesn't do anything if slide is =<10px
    touchDiv
      .simulate('touchStart', {
        changedTouches: [{ clientX: 243, clientY: 234 }],
      })
      .simulate('touchMove', {
        changedTouches: [{ clientX: 233, clientY: 234 }],
      })
    expect(
      component
        .find(TodoItem)
        .first()
        .find('div.main-icon-div')
        .props().style.width
    ).toEqual(0)

    //shows icon div if slided right >10px
    touchDiv
      .simulate('touchStart', {
        changedTouches: [{ clientX: 243, clientY: 234 }],
      })
      .simulate('touchMove', {
        changedTouches: [{ clientX: 230, clientY: 234 }],
      })
    expect(
      component
        .find(TodoItem)
        .first()
        .find('div.main-icon-div')
        .props().style.width
    ).toEqual(150)

    //puts away icon div if slided right >10px
    touchDiv
      .simulate('touchStart', {
        changedTouches: [{ clientX: 230, clientY: 234 }],
      })
      .simulate('touchMove', {
        changedTouches: [{ clientX: 243, clientY: 234 }],
      })
    expect(
      component
        .find(TodoItem)
        .first()
        .find('div.main-icon-div')
        .props().style.width
    ).toEqual(0)
  })

  it('should change text to input if edit is clicked', () => {
    component
      .find(TodoItem)
      .first()
      .find('div.edit-icon')
      .simulate('click')
    expect(component.find('input.edit-input')).toHaveLength(1)
  })

  it('should delete task if remove is clicked', () => {
    component
      .find(TodoItem)
      .first()
      .find('div.remove-icon')
      .simulate('click')
    expect(component.state().todos).toHaveLength(2)
  })
})
