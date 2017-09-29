import React, { Component } from 'react'
import { ColorPalette } from '@allthings/colors'
import Card from '@allthings/elements/molecules/Card'
import { List } from '@allthings/elements/molecules/List'
import Inset from '@allthings/elements/atoms/Inset'
import TitleBar from '@allthings/elements/organisms/TitleBar'
import Text from '@allthings/elements/atoms/Text'
import ThemeProvider from '@allthings/elements/behaviour/ThemeProvider'
import TodoItem from './TodoItem'

const DemoTheme = {
  primary: ColorPalette.red,
  text: ColorPalette.text.primary,
  secondaryText: ColorPalette.text.primary,
  titleColor: ColorPalette.text.primary,
  contrast: ColorPalette.white,
  disabled: ColorPalette.grey,
  background: ColorPalette.background.bright
}

class App extends Component {
  state = {
    todos: [
      { id: 1, text: 'Search for cocktail recipes for the party', done: false },
      { id: 2, text: 'Create nice invitation cards', done: false },
      { id: 3, text: 'Ask some people to bring some finger food', done: false }
    ]
  }

  handleClick = id => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done
          }
        } else {
          return todo
        }
      })
    }))
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={DemoTheme}>
          <div>
            <TitleBar>
              <Inset>
                <Text size="m" color="contrast">
                  Todo
                </Text>
              </Inset>
            </TitleBar>
            <Card>
              <List>
                {this.state.todos.map(todo => (
                  <TodoItem
                    onClick={this.handleClick}
                    id={todo.id}
                    done={todo.done}
                  >
                    {todo.text}
                  </TodoItem>
                ))}
              </List>
            </Card>
          </div>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
