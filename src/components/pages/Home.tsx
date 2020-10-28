import * as React from 'react'
import { AppState } from '../../state'

type HomePageProps = {
    appState: AppState
}

export const HomePage = (props: HomePageProps) => {
    return <div>
        <h1>Home</h1>
    </div>
}