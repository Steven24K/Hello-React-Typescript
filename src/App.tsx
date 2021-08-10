import * as React from 'react'
import { BrowserRouter, NavLink, Route, Switch, } from 'react-router-dom'
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
    counter: number
}

const zeroAppState = (): AppState => ({ search: '', counter: 0 })
interface AppProps {

}

export const App = (props: AppProps) => {
    const [appState, setState] = React.useState<AppState>(zeroAppState())

    React.useEffect(() => {
        document.title = `You clicked ${appState.counter} times`
    })

    return <div className="App">
        <h1>Hello React Typescript</h1>
        <p>Start editing the <code>App.tsx</code> file to get started</p>

        <button onClick={() => setState(s => ({...s, counter: s.counter +1}))}>
            The awesome {appState.counter}
        </button>

        <input
            placeholder="Search to filter"
            value={appState.search}
            onChange={e => setState(s => ({ ...s, search: e.target.value }))}
        />

        <ul>
            {data.filter(d => appState.search.includes(d) || d.includes(appState.search) || appState.search == '').map(d => <li key={d}>{d}</li>)}
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
                <Route path='/' exact render={() => <h1>Home</h1>} />
                <Route path='/about' render={() => <h1>About</h1>} />
                <Route path='/contact' render={() => <h1>Contact</h1>} />
            </Switch>
        </BrowserRouter>
    </div>
}