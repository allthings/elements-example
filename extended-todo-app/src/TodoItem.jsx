import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@allthings/elements/atoms/Icon'
import Text from '@allthings/elements/atoms/Text'
import Checkmark from '@allthings/elements/molecules/Checkmark'
import ListItem from '@allthings/elements/molecules/List/ListItem'
import TextInput from '@allthings/elements/molecules/TextInput'
import { css } from 'glamor'

const { number, string, bool } = PropTypes

const dynamicStyles = (checkmarkNo, icons, iconTransition, slideLeft) => ({
  check: css({
    display: checkmarkNo + ' !important',
  }),
  inline: {
    width: icons,
    transitionDelay: iconTransition,
  },
  remove: {
    right: slideLeft,
  },
  iconBackground: {
    right: slideLeft,
  },
})

const styles = {
  check: css({
    height: '40px',
    width: '40px',
    margin: '3px 0px',
  }),
  inline: css({
    overflow: 'hidden',
    display: 'inline-flex',
  }),
  remove: css({
    float: 'right',
    padding: '5px',
    margin: '3px',
    transition: 'all 300ms ease',
    ':hover': { cursor: 'pointer' },
  }),
  iconBackground: css({
    position: 'absolute',
    padding: '15px',
    float: 'right',
    transition: 'all 300ms ease',
    height: '35.5px',
    width: '40px',
  }),
  list: css({
    display: 'inline-flex',
  }),
  listItem: css({
    minHeight: '50px',
    width: '100%',
  }),
  task: css({
    display: 'inline-flex',
    width: '90%',
    padding: '10px 0',
  }),
  text: css({
    margin: '0px 10px',
    width: '100%',
    height: '50.5px',
    display: 'table',
  }),
  removeDiv: css({
    position: 'relative',
    overflow: 'hidden',
    height: '50.5px',
    width: '53.5px',
    padding: '0px 10px 15px 10px',
  }),
  editDiv: css({
    position: 'relative',
    overflow: 'hidden',
    height: '50.5px',
    width: '53.5px',
    padding: '0px 10px 15px 10px',
  }),
  gray: css({
    backgroundColor: 'gray',
    transition: 'all 300ms ease',
  }),
  red: css({
    backgroundColor: 'red',
    transition: 'all 300ms ease',
  }),
  editField: css({
    padding: 0,
    ':focus': { outline: 'none' },
  }),
  staticText: css({
    display: 'table-cell !important',
    verticalAlign: 'middle',
  }),
}

const classNames = {
  edit: ['icon-div', 'edit-icon'],
  iconDiv: ['icon-div', 'main-icon-div'],
  remove: ['icon-div', 'remove-icon'],
}

class TodoItem extends React.Component {
  static propTypes = {
    id: number.isRequired,
    children: string.isRequired,
    done: bool.isRequired,
  }

  state = {
    touchStart: undefined,
    icons: 0,
    iconTransition: '',
    slideLeft: -70,
    checkmark: 'flex',
  }

  handleRemove = () => {
    this.closeIcons('')
    this.props.handleRemove(this.props.id)
  }

  handleEdit = () => {
    this.closeIcons('')
    this.props.onDoubleClick(this.props.id)
  }

  handleEditComplete = event => {
    this.closeIcons('')
    this.props.doneEditting(event, this.props.id)
  }

  handleCheckClick = () => this.props.checkmarkClicked(this.props.id)

  openIcons = () =>
    this.setState({
      checkmark: 'none',
      slideLeft: 0,
      icons: 150,
      iconTransition: '',
    })

  closeIcons = transition =>
    this.setState({
      checkmark: 'flex',
      slideLeft: -70,
      icons: 0,
      iconTransition: transition || '',
      doubleClicked: false,
    })

  handleTouchStart = event => {
    this.setState({
      touchStart: event.changedTouches[0].clientX,
    })
  }

  handleTouchMove = event => {
    const { slideLeft, touchStart } = this.state
    const { onSlideLeft, id } = this.props
    const touchObj = event.changedTouches[0].clientX
    const dist = parseInt(touchObj) - touchStart
    if (dist < -10) {
      this.openIcons()
      onSlideLeft(id, 'open')
    } else if (dist > 5) {
      this.closeIcons('200ms')
      onSlideLeft(id, 'close')
    }
  }

  render() {
    const { id, children, done, doubleClicked, iconOpen } = this.props
    const { icons, iconTransition, slideLeft, checkmark } = this.state
    const checkmarkNo = iconOpen || doubleClicked ? 'none' : checkmark

    const stylesDynamic = !iconOpen
      ? dynamicStyles('flex', 0, '', -70)
      : dynamicStyles(checkmarkNo, icons, iconTransition, slideLeft)

    return (
      <div {...styles.list}>
        <ListItem {...styles.listItem}>
          <div {...styles.task}>
            <Checkmark
              id={`checkmark${id}`}
              checked={done}
              onClick={this.handleCheckClick}
              {...stylesDynamic.check}
              {...styles.check}
            />
            <div
              className="touch"
              onDoubleClick={this.handleEdit}
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              {...styles.text}
            >
              {doubleClicked ? (
                <TextInput
                  id={id}
                  className="edit-input"
                  name="edit"
                  defaultValue={children}
                  placeholder="Edit todo"
                  onKeyPress={this.handleEditComplete}
                  {...styles.editField}
                />
              ) : (
                <Text autoBreak={true} id={id} {...styles.staticText}>
                  {children}
                </Text>
              )}
            </div>
          </div>
          <div
            className= {classNames.iconDiv.join(' ')}
            style={stylesDynamic.inline}
            {...styles.inline}
          >
            <div className="icon-div" {...styles.editDiv}>
              <div
                className="icon-div"
                style={stylesDynamic.iconBackground}
                {...styles.iconBackground}
                {...styles.gray}
              >
                <Icon
                  className={classNames.edit.join(' ')}
                  name="edit"
                  size="m"
                  color="white"
                  onClick={this.handleEdit}
                  style={stylesDynamic.remove}
                  {...styles.remove}
                />
              </div>
            </div>
            <div className="icon-div" {...styles.removeDiv}>
              <div
                className="icon-div"
                style={stylesDynamic.iconBackground}
                {...styles.iconBackground}
                {...styles.red}
              >
                <Icon
                  className={classNames.remove.join(' ')}
                  name="remove-light-filled"
                  size="m"
                  color="white"
                  onClick={this.handleRemove}
                  style={stylesDynamic.remove}
                  {...styles.remove}
                />
              </div>
            </div>
          </div>
        </ListItem>
      </div>
    )
  }
}

export default TodoItem
