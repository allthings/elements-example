import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ColorPalette } from '@allthings/colors'
import { hot } from 'react-hot-loader'
import { ResourceProvider, ThemeProvider } from '@allthings/elements'
import HorizontalRouter from './HorizontalRouter'
import TodoGroups from './TodoGroups'
import TodoList from './TodoList'
import 'cross-fetch/polyfill'

const DemoTheme = {
  primary: ColorPalette.red,
  text: ColorPalette.text.primary,
  secondaryText: ColorPalette.text.primary,
  titleColor: ColorPalette.text.primary,
  contrast: ColorPalette.white,
  disabled: ColorPalette.grey,
  background: ColorPalette.background.bright,
}

const ToDoGroups = ({ match }) => <TodoGroups />
const ToDoList = ({ match }) => <TodoList />

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={DemoTheme}>
        <ResourceProvider>
          <BrowserRouter>
            <HorizontalRouter
              routes={[
                { path: '/', component: ToDoGroups },
                { path: '/todos/:id', component: ToDoList },
              ]}
            />
          </BrowserRouter>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}

export default hot(module)(App)
