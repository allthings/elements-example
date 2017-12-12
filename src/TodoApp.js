import React, { Component } from 'react'
import { ColorPalette } from '@allthings/colors'
import Card from '@allthings/elements/molecules/Card'
import Inset from '@allthings/elements/atoms/Inset'
import TitleBar from '@allthings/elements/organisms/TitleBar'
import Text from '@allthings/elements/atoms/Text'
import ThemeProvider from '@allthings/elements/behaviour/ThemeProvider'
import TodoItem from './TodoItem'
import ResourceProvider from '@allthings/elements/behaviour/ResourceProvider'
import View from '@allthings/elements/atoms/View'
import TextInput from '@allthings/elements/molecules/TextInput'
import { css } from 'glamor'
import Icon from '@allthings/elements/atoms/Icon'
import GroupedCardList from '@allthings/elements/organisms/CardList/GroupedCardList'
import Button from '@allthings/elements/molecules/Button'

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
			{ id: 0, text: 'Search for cocktail recipes for the party', done: false, doubleClicked: false, checkmark: 'flex', iconOpen: false },
			{ id: 1, text: 'Create nice invitation cards', done: false, doubleClicked: false, checkmark: 'flex', iconOpen: false },
			{ id: 2, text: 'Ask some people to bring some finger food', done: false, doubleClicked: false, checkmark: 'flex', iconOpen: false }
		],
		filter: 'all',
		textValue: true
	}

	componentDidMount = () => {
		document.addEventListener('touchend', this.finishEdit)
		document.addEventListener('mouseup', this.finishEdit)
	}

	handleRemove = id => {
		console.log('id is', this)
		const newTodo = this.state.todos.slice()
		newTodo.splice(id, 1)
		this.setState({ todos: newTodo })
	}

	handleDoubleClick = id => {
		const newTodo = this.state.todos.slice()
		newTodo[id].doubleClicked = true

		this.setState({ todos: newTodo })
	}

	checkmarkClicked = id => {
		const newTodo = this.state.todos.slice()
		newTodo[id].done = !this.state.todos[id].done
		this.setState({
			todos: newTodo
		})
	}

	handleKeyPress = event => {
		const text = event.target.value
		if (event.key === 'Enter' && text) {
			this.addTodo()
		} else {
			//dont access dom; use 'ref'> put it in state
			const textExists = document.getElementById('new').value
			if (textExists && this.state.textValue) {
				this.setState({ textValue: false })
			} else if(!textExists && !this.state.textValue) {
				this.setState({ textValue: true })
			}
		}
	}

	addTodo = event => {
		const text = document.getElementById('new').value
		const newTodo = this.state.todos.slice()
		const item = {
			id: newTodo.length,
			text,
			done: false
		}
		newTodo.push(item)
		this.setState({
			todos: newTodo,
			textValue: true
		})
		//dont set value
		document.getElementById('new').value = ''
		document.getElementById('new').blur()
	}

	changeFilter = event => {
		const id = event.target.id
		this.setState({ filter: id })
	}

	focusInput = event => {
		document.getElementById('new').focus()
	}

	doneEditting = (event, id) => {
		const text = event.target.value
		if (event.key === 'Enter' && text) {
			const newTodo = this.state.todos.slice()
			newTodo[id].doubleClicked = false
			newTodo[id].text = text
			newTodo[id].checkmark = 'flex'
			newTodo[id].iconOpen = false

			this.setState({ todos: newTodo })
		}
	}

	finishEdit = event => {
		const oldTodo = this.state.todos.slice()
		const newTodo = oldTodo.map((todo, index) => {
			if (todo.doubleClicked && (index.toString() !== event.srcElement.id)) {
				todo.doubleClicked = false
				todo.checkmark = 'flex'
				todo.iconOpen = false
				todo.text = document.getElementById(index).value
				return todo
			} else if (todo.doubleClicked && (index.toString() === event.srcElement.id)) {
				return todo
			} else {
				return todo
			}
		})
		this.setState({ todos: newTodo })
	}

	render() {
		const styles = {
			create: css({
				':hover': { cursor: 'pointer '}
			}),
			inset: css({
				width: '95%'
			}),
			new: css({
				padding: 0,
				width: '100%',
				display: 'flex'
			}),
			iconStyle: css({
				display: 'inline-block',
				marginRight: '10px',
				position: 'absolute'
			}),
			titleBar: css({
				padding: '10px 15px 10px 0px'
			}),
			titleText: css({
				display: 'inline-block',
				padding: '0 35px',
				position: 'relative'
			}),
			buttonDiv: css({
				textAlign: 'center'
			}),
			button: css({
				margin: '3px'
			}),
			textInput: css({
				display: 'inline-block',
				width: '100%',
				':focus': { outline: 'none' }
			}),
			add: css({
				display: 'inline-block',
				float: 'right',
				margin: '15px 10px 15px 0px'
			})
		}

		const { todos } = this.state

		const incomplete = todos.reduce((accumulator, currentValue) => {
			if (currentValue.done === false) {
				accumulator++
			}
			return accumulator
		}, 0)

		const incompleteNum = incomplete > 0 ? `Incomplete (${incomplete})` : 'Incomplete'
		const opacity = 'rgba(232, 76, 61, 0.5)'

		return (
			<div className="App">
				<ResourceProvider>
					<ThemeProvider theme={DemoTheme}>
						<View>
							<TitleBar {...styles.titleBar}>
								<Inset {...styles.inset}>
									<Icon name="book-open" size="m" color="white" {...styles.iconStyle} />
									<Text color="contrast" {...styles.titleText}>My Todos</Text>
								</Inset>
								<Icon name="plus-light" size="m" color="#FFFFFF" onClick={this.focusInput} {...styles.create} />
							</TitleBar>
							<Card>
								<div {...styles.new}> 
									<div {...styles.textInput}>
										<TextInput id="new" name="new" placeholder="Add new" onKeyUp={this.handleKeyPress} {...styles.textInput} />
									</div>
									<Button onClick={this.addTodo} disabled={this.state.textValue} {...styles.add}>add</Button>
								</div>
								<div {...styles.buttonDiv}>
									<Button id="all" onClick={this.changeFilter} backgroundColor={this.state.filter !== "all" ? opacity : ''} {...styles.button}><span id="all">All</span></Button>
									<Button id="incomplete" onClick={this.changeFilter} backgroundColor={this.state.filter !== "incomplete" ? opacity : ''} {...styles.button}><span id="incomplete">{incompleteNum}</span></Button>
									<Button id="completed" onClick={this.changeFilter} backgroundColor={this.state.filter !== "completed" ? opacity : ''} {...styles.button}><span id="completed">Completed</span></Button>
								</div>
								<GroupedCardList>
									{this.state.todos.map((todo, index) => {
										if (this.state.filter === "incomplete") {
											if (todo.done === false) {
												return (
													<TodoItem
														handleRemove={this.handleRemove}
														id={index}
														done={todo.done}
														checkmarkDisplay={todo.checkmark}
														iconOpen={todo.iconOpen}
														doubleClicked={todo.doubleClicked}
														key={'checkbox' + index}
														onDoubleClick={this.handleDoubleClick}
														doneEditting={this.doneEditting}
														checkmarkClicked={this.checkmarkClicked}
													>
														{todo.text}
													</TodoItem>
												)
											}
										} else if (this.state.filter === "completed") {
											if (todo.done === true) {
												return (
													<TodoItem
														handleRemove={this.handleRemove}
														id={index}
														done={todo.done}
														checkmarkDisplay={todo.checkmark}
														iconOpen={todo.iconOpen}
														doubleClicked={todo.doubleClicked}
														key={'checkbox' + index}
														onDoubleClick={this.handleDoubleClick}
														doneEditting={this.doneEditting}
														checkmarkClicked={this.checkmarkClicked}
													>
														{todo.text}
													</TodoItem>
												)
											}
										} else if (this.state.filter === "all") {
											return (
												<TodoItem
													handleRemove={this.handleRemove}
													id={index}
													done={todo.done}
													checkmarkDisplay={todo.checkmark}
													iconOpen={todo.iconOpen}
													doubleClicked={todo.doubleClicked}
													key={'checkbox' + index}
													onDoubleClick={this.handleDoubleClick}
													doneEditting={this.doneEditting}
													checkmarkClicked={this.checkmarkClicked}
												>
													{todo.text}
												</TodoItem>
											)
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
