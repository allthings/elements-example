import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Card, ChevronRightListItem, List, Inset, TitleBar, Text } from '@allthings/elements'

class TodoGroups extends Component {
  state = {
    todoGroups: [
      { id: 1, text: 'Group 1' },
      { id: 2, text: 'List of more ToDos' },
      { id: 3, text: 'One more item' }
    ]
  }

  handleClick = id => {
    this.props.history.push("/todos/1")
  }

  render() {
    return (
      <div className="TodoGroups">
        <TitleBar>
            <Inset>
              <Text strong color="white">
                Todo Categories
              </Text>
            </Inset>
        </TitleBar>
        <Card>
          <List>
            {this.state.todoGroups.map(group => (
              <ChevronRightListItem
                onClick={this.handleClick}
                id={group.id}
              >
                {group.text}
              </ChevronRightListItem>
            ))}
          </List>
        </Card>
      </div>
    )
  }
}

export default withRouter(TodoGroups)
