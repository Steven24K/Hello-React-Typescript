import * as React from 'react'
import { AppState } from '../../state'

type AboutPageProps = {
    appState: AppState
}

export const AboutPage = (props: AboutPageProps) => {
    return <div>
        <h1>About</h1>
    </div>
}