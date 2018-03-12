import React from 'react'
import PropTypes from 'prop-types'
import { Checkmark, ListItem, Text, Inset } from '@allthings/elements'

class TodoListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }

  handleClick = () => this.props.onClick(this.props.id)

  render() {
    return (
      <ListItem onClick={this.handleClick}>
        <Checkmark checked={this.props.done} />
        <Inset>
          <Text>{this.props.children}</Text>
        </Inset>
      </ListItem>
    )
  }
}

export default TodoListItem
