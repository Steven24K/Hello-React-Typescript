import React from 'react'
import '../static/css/site.css'

type AppState = { color: string }
type AppProps = {}
export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = { color: 'white' }
    }

    render() {
        return <div className='App' style={{ backgroundColor: this.state.color }}>
            <div>
                <div className="credits">
                    Made by <a target="_blank" href="https://stevenkoerts.nl/">Steven Koerts</a> <a target="_blank" href="https://github.com/Steven24K">GitHub</a>
                </div>

                <div className='container'>
                    <div className='picker-container'>
                        <h1>Pick your favorit color!</h1>
                        <input className='picker' onChange={event => this.setState({ ...this.state, color: event.target.value })} type='color' value={this.state.color} />
                    </div>
                </div>

            </div>
        </div>
    }
}