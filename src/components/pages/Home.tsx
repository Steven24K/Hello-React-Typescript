import * as React from 'react'
import { Entity } from 'ts-lenses'
import { AppState, DefaultComponentProps } from '../../state'

interface HomePageProps extends DefaultComponentProps {

}

export const HomePage = (props: HomePageProps) => {
    if (props.appState.currentPage.kind != 'home-page') return <span></span>

    return <div className='App' style={{ backgroundColor: props.appState.currentPage.color }}>
        <div>
            <div className="credits">
                Made by <a target="_blank" href="https://stevenkoerts.nl/">Steven Koerts</a> <a target="_blank" href="https://github.com/Steven24K">GitHub</a>
            </div>

            <div className='container'>
                <div className='picker-container'>
                    <h1>Pick your favorit color!</h1>
                    <input className='picker' 
                    onChange={event => { props.setState(s => ({...s, currentPage: {
                        ...s.currentPage, 
                        color: event.target.value
                    }})) }}
                     type='color' 
                     value={props.appState.currentPage.color} 
                     />
                </div>
            </div>

        </div>
    </div>

}