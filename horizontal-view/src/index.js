import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { ColorPalette } from '@allthings/colors'
import App from './App'

function renderApp() {
  render(<App />, document.getElementById('app'))
}

renderApp()

if (module.hot) {
  module.hot.accept('./App', renderApp)
}
