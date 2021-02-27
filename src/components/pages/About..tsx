import * as React from 'react'
import { DefaultComponentProps } from '../../state'

interface AboutPageProps extends DefaultComponentProps { }

export const AboutPage = (props: AboutPageProps) => {
    return <div className="container">
        <h1>About</h1>
        <p>
            This is a custom React toolchain for starting a single page React app with Typescript.
        </p>

        <h2>Hello React App</h2> 

        <p>
            Offcourse you have <a target="_blank" href="https://create-react-app.dev/">Create React App</a>, wich is nice to quickly setup a React application, 
            but you can also build it yourself from scratch. 
        </p>

        <p>
            I use this toolchain to when I want to demo something, build a prototype or start a new project. Just simply clone the repo <code>git@github.com:Steven24K/Hello-React-Typescript.git</code>
            and run <code>npm i</code> followed by <code>npm run start</code> and start editing the components. 
        </p>

        <h3>Motivation</h3>

        <p>
            I started this project cause I was curious to see how React worked and what you needed to get started. In school I always was told to use create-react-app or
            <code> dotnet new react</code>. 
            Building something from scratch can learn you how thing work. 
        </p>

        <h2>What's under the hood?</h2>

        <p>
            This toolchain is very minimal, it supports features such as hot module reloading and allready implements the React router. As a compiler it uses Typescript and
            to bundle all assets its using Webpack and thats basically all you need to start developing with React. When using Javascript you can use Babel as a compiler. 
            I also created a Javascript version of this toolchain. You can find that <a target="_blank" href="https://github.com/Steven24K/Hello-React">here.</a>
        </p>
    </div>
}