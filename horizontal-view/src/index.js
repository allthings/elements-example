import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { ColorPalette } from '@allthings/colors'
import App from './App'

function renderApp() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('./App', renderApp)
}
