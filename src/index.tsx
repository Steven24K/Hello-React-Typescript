import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'


ReactDOM.render(App.run(appState => console.log('App has produced the following output: ', appState)), document.getElementById('root'))