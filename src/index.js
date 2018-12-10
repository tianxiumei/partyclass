import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App.js'
import { HashRouter as Router } from 'react-router-dom'
import create from './utils/createstore.js'
let store=create()
render(
  <Provider store={store}>
	   <Router store={store}>
	      <App/>
	    </Router>
  </Provider>,
  document.getElementById('root')
)