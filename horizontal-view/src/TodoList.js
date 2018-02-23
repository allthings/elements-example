import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { ColorPalette } from '@allthings/colors'
import { Card, List, Inset, SquareIconButton, TitleBar, Text, ThemeProvider } from '@allthings/elements'
import TodoListItem from './TodoListItem'

class TodoList extends Component {
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

  onBackButtonClick = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="TodoList">
        <TitleBar>
          <SquareIconButton
            icon="arrow-left-filled"
            iconColor="white"
            onClick={this.onBackButtonClick}
          />
          <Text strong color="white">
            Todos
          </Text>
        </TitleBar>
        <Card>
          <List>
            {this.state.todos.map(todo => (
              <TodoListItem
                onClick={this.handleClick}
                id={todo.id}
                done={todo.done}
              >
                {todo.text}
              </TodoListItem>
            ))}
          </List>
        </Card>
      </div>
    )
  }
}

export default withRouter(TodoList)
