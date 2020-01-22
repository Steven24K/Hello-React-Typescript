import React from 'react'


type AppState = {}
type AppProps = {}
export default class App extends React.Component<AppState, AppProps> {
    constructor(props: AppProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <div>Hello World!!!!!!!</div>
    }
}