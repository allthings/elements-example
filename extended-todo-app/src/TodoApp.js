import React, { Component } from 'react'
import { ColorPalette } from '@allthings/colors'
import Icon from '@allthings/elements/atoms/Icon'
import Inset from '@allthings/elements/atoms/Inset'
import Text from '@allthings/elements/atoms/Text'
import View from '@allthings/elements/atoms/View'
import Button from '@allthings/elements/molecules/Button'
import Card from '@allthings/elements/molecules/Card'
import TextInput from '@allthings/elements/molecules/TextInput'
import GroupedCardList from '@allthings/elements/organisms/CardList/GroupedCardList'
import TitleBar from '@allthings/elements/organisms/TitleBar'
import ResourceProvider from '@allthings/elements/behaviour/ResourceProvider'
import ThemeProvider from '@allthings/elements/behaviour/ThemeProvider'
import TodoItem from './TodoItem'
import { css } from 'glamor'

const styles = {
  create: css({
    ':hover': { cursor: 'pointer' },
  }),
  inset: css({
    width: '93%',
  }),
  new: css({
    padding: 0,
    width: '100%',
    display: 'flex',
  }),
  iconStyle: css({
    display: 'inline-block',
    marginRight: '10px',
    position: 'absolute',
  }),
  titleBar: css({
    padding: '10px 15px 10px 0px',
  }),
  titleText: css({
    display: 'inline-block',
    padding: '0 35px',
    position: 'relative',
  }),
  buttonDiv: css({
    textAlign: 'center',
  }),
  button: css({
    margin: '3px',
  }),
  textInput: css({
    display: 'inline-block',
    width: '100%',
    ':focus': { outline: 'none' },
  }),
  add: css({
    display: 'inline-block',
    float: 'right',
    margin: '15px 10px 15px 0px',
  }),
}

const buttonOpacity = 'rgba(232, 76, 61, 0.5)'

const DemoTheme = {
  primary: ColorPalette.red,
  text: ColorPalette.text.primary,
  secondaryText: ColorPalette.text.primary,
  titleColor: ColorPalette.text.primary,
  contrast: ColorPalette.white,
  disabled: ColorPalette.grey,
  background: ColorPalette.background.bright,
}

class App extends Component {
  state = {
    todos: [
      {
        id: 0,
        text: 'Search for cocktail recipes for the party',
        done: false,
        doubleClicked: false,
        checkmark: 'flex',
        iconOpen: false,
      },
      {
        id: 1,
        text: 'Create nice invitation cards',
        done: false,
        doubleClicked: false,
        checkmark: 'flex',
        iconOpen: false,
      },
      {
        id: 2,
        text: 'Ask some people to bring some finger food',
        done: false,
        doubleClicked: false,
        checkmark: 'flex',
        iconOpen: false,
      },
    ],
    filter: 'all',
    textDisable: true,
    newText: '',
  }

  updateInput = event => {
    this.setState({ newText: this.textInput.input.value })
  }

  componentDidMount = () => {
    document.addEventListener('touchstart', this.finishEdit)
    document.addEventListener('mousedown', this.finishEdit)
  }

  handleRemove = id => {
    const newTodo = this.state.todos.slice()
    newTodo.splice(id, 1)
    this.setState({ todos: newTodo })
  }

  handleDoubleClick = id => {
    const newTodo = this.state.todos.slice()
    newTodo[id].doubleClicked = true
    this.setState({ todos: newTodo })
  }

  handleSliding = (id, type) => {
    const newTodo = [...this.state.todos]
    newTodo[id].iconOpen = type === 'open' ? true : false
    this.setState({ todos: newTodo })
  }

  checkmarkClicked = id => {
    const newTodo = [...this.state.todos]
    newTodo[id].done = !this.state.todos[id].done
    this.setState({ todos: newTodo })
  }

  handleKeyPress = event => {
    const text = event.target.value
    if (event.key === 'Enter' && text) {
      this.addTodo()
    } else {
      const textExists = this.textInput.input.value
      if (textExists && this.state.textDisable) {
        this.setState({ textDisable: false })
      } else if (!textExists && !this.state.textDisable) {
        this.setState({ textDisable: true })
      }
    }
  }

  addTodo = () => {
    const text = this.textInput.input.value
    this.setState({
      todos: [
        ...this.state.todos,
        {
          text,
          done: false,
          doubleClicked: false,
          checkmark: 'flex',
          iconOpen: false,
        },
      ],
      textDisable: true,
    })
    this.setState({ newText: '' })
    this.textInput.input.blur()
  }

  changeFilter = ({ target: { className } }) => {
    this.setState({ filter: className })
  }

  focusInput = () => {
    this.textInput.input.focus()
  }

  doneEditting = (event, id) => {
    const text = event.target.value
    if (event.key === 'Enter' && text) {
      const newTodo = [...this.state.todos]
      newTodo[id] = {
        ...newTodo[id],
        doubleClicked: false,
        text,
        checkmark: 'flex',
        iconOpen: false,
      }
      this.setState({ todos: newTodo })
    }
  }

  finishEdit = event => {
    const oldTodo = [...this.state.todos]
    const eventSrc = event.srcElement
    const { id: eventId, nodeName: eventNode, className: eventClass } = eventSrc
    const newTodo = oldTodo.map((todo, index) => {
      const { doubleClicked, iconOpen } = todo
      if (eventClass === 'icon-div' || eventNode === ('svg' || 'path')) {
        return todo
      } else if ((doubleClicked || iconOpen) && index.toString() === eventId) {
        return todo
      } else if (doubleClicked && eventClass !== 'icon-div') {
        todo = {
          ...todo,
          doubleClicked: false,
          checkmark: 'flex',
          iconOpen: false,
          text: document.getElementById(index).value,
        }
        return todo
      } else if (iconOpen && eventClass !== 'icon-div') {
        todo = {
          ...todo,
          doubleClicked: false,
          checkmark: 'flex',
          iconOpen: false,
        }
        return todo
      } else {
        return todo
      }
    })
    this.setState({ todos: newTodo })
  }

  render() {
    const { todos, filter, textDisable } = this.state
    const incomplete = todos.reduce(
      (count, todo) => (todo.done ? count : count + 1),
      0
    )
    const incompleteNum =
      incomplete > 0 ? `Incomplete (${incomplete})` : 'Incomplete'

    return (
      <div className="App">
        <ResourceProvider>
          <ThemeProvider theme={DemoTheme}>
            <View>
              <TitleBar {...styles.titleBar}>
                <Inset {...styles.inset}>
                  <Icon
                    name="book-open"
                    size="m"
                    color="white"
                    {...styles.iconStyle}
                  />
                  <Text color="contrast" {...styles.titleText}>
                    My Todos
                  </Text>
                </Inset>
                <Icon
                  name="plus-light"
                  size="m"
                  color="#FFFFFF"
                  onClick={this.focusInput}
                  {...styles.create}
                />
              </TitleBar>
              <Card>
                <div {...styles.new}>
                  <div {...styles.textInput}>
                    <TextInput
                      id="new"
                      name="new"
                      ref={node => (this.textInput = node)}
                      placeholder="Add new"
                      value={this.state.newText}
                      onKeyUp={this.handleKeyPress}
                      onChange={this.updateInput.bind(this)}
                      {...styles.textInput}
                    />
                  </div>
                  <Button
                    id="add-task"
                    onClick={this.addTodo}
                    disabled={textDisable}
                    {...styles.add}
                  >
                    add
                  </Button>
                </div>
                <div {...styles.buttonDiv}>
                  <Button
                    className="all"
                    onClick={this.changeFilter}
                    backgroundColor={filter !== 'all' ? buttonOpacity : ''}
                    {...styles.button}
                  >
                    <span className="all">All</span>
                  </Button>
                  <Button
                    className="incomplete"
                    onClick={this.changeFilter}
                    backgroundColor={
                      filter !== 'incomplete' ? buttonOpacity : ''
                    }
                    {...styles.button}
                  >
                    <span className="incomplete">{incompleteNum}</span>
                  </Button>
                  <Button
                    id="completed-button"
                    className="completed"
                    onClick={this.changeFilter}
                    backgroundColor={
                      filter !== 'completed' ? buttonOpacity : ''
                    }
                    {...styles.button}
                  >
                    <span className="completed">Completed</span>
                  </Button>
                </div>
                <GroupedCardList>
                  {todos.map((todo, index) => {
                    const {
                      done,
                      checkmark,
                      iconOpen,
                      doubleClicked,
                      text,
                    } = todo
                    const thisTodoItem = (
                      <TodoItem
                        handleRemove={this.handleRemove}
                        id={index}
                        done={done}
                        checkmarkDisplay={checkmark}
                        iconOpen={iconOpen}
                        doubleClicked={doubleClicked}
                        key={'checkbox' + index}
                        onDoubleClick={this.handleDoubleClick}
                        onSlideLeft={this.handleSliding}
                        doneEditting={this.doneEditting}
                        checkmarkClicked={this.checkmarkClicked}
                      >
                        {text}
                      </TodoItem>
                    )
                    if (
                      (filter === 'incomplete' && done === false) ||
                      ((filter === 'completed' && done === true) ||
                        filter === 'all')
                    ) {
                      return thisTodoItem
                    }
                  })}
                </GroupedCardList>
              </Card>
            </View>
          </ThemeProvider>
        </ResourceProvider>
      </div>
    )
  }
}

export default App
