import React from 'react'
import '../static/css/site.css'

import {
    MemoryRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import { Entity } from 'ts-lenses';
import { hello_world_app } from './components/HelloWorld';
import { simpleForm } from './components/SimpleForm';
import { simple_api } from './components/SimpleAPI';
import { asyncStateExample } from './components/AsyncState';

const native_react_component = (color: string, onChange: (value: string) => void) => <div className='App' style={{ backgroundColor: color }}>
    <div>
        <div className="credits">
            Made by <a target="_blank" href="https://stevenkoerts.nl/">Steven Koerts</a> <a target="_blank" href="https://github.com/Steven24K">GitHub</a>
        </div>

        <div className='container'>
            <div className='picker-container'>
                <h1>Pick your favorit color!</h1>
                <input className='picker' onChange={event => onChange(event.target.value)} type='color' value={color} />
            </div>
        </div>

    </div>
</div>

type AppState = {
    color: string
}

type AppProps = {}
export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = { color: 'white' }
    }

    render() {
        return <Router>
            <div>
                <nav>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/hello'>Hello React Widgets</Link>
                    </li>
                    <li>
                        <Link to='/form'>Simple Form</Link>
                    </li>
                    <li>
                        <Link to='/api'>Simple API</Link>
                    </li>
                    <li>
                        <Link to='/async'>Async State</Link>
                    </li>
                </nav>
            </div>

            <Switch>
                <Route exact path='/'>
                    {native_react_component(this.state.color, (value) => this.setState(s => Entity(s).set('color', _ => value).commit()))}
                </Route>
                <Route path='/hello' >
                    {hello_world_app.run(res => console.log("The widget has produced some output data ", res))}
                </Route>
                <Route path='/form'>
                    {simpleForm.run(res => console.log('Simpleform ',res))}
                </Route>
                <Route path='/api'>
                    {simple_api.run(res => console.log('Simple API ',res))}
                </Route>
                <Route path='/async'>
                    {asyncStateExample.widget().run(res => console.log('Async state ',res))}
                </Route>
            </Switch>

        </Router>
    }
    
}