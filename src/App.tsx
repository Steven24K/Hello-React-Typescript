import * as React from 'react'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import '../static/css/site.css'

const data: string[] = [
    "banana",
    "apple",
    "pineapple",
    "orange",
    "mango",
    "coconut"
]
interface AppState {
    search: string
}

interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = { search: '' }
    }

    render() {
        return <div className="App">
            <h1>Hello React Typescript</h1>
            <p>Start editing the <code>App.tsx</code> file to get started</p>

            <input
                placeholder="Search to filter"
                value={this.state.search}
                onChange={e => this.setState(s => ({ ...s, search: e.target.value }))}
            />

            <ul>
                {data.filter(d => this.state.search.includes(d) || d.includes(this.state.search) || this.state.search == '').map(d => <li key={d}>{d}</li>)}
            </ul>

            <h3>Hot module reloading is on!</h3>

            {/**Small routing example */}
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path='/' exact render={() => <h1>Home</h1>}/>
                    <Route path='/about' render={() => <h1>About</h1>}/>
                    <Route path='/contact' render={() => <h1>Contact</h1>}/>
                </Switch>
            </BrowserRouter>
        </div>
    }
}