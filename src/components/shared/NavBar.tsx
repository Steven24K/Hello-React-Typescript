import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { AppState } from '../../state'


type NavBarProps = {
    appState: AppState
}
export const NavBar = (props: NavBarProps) => {
    return <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/products'>Products</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>         
        </ul>
    </nav>
}