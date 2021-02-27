import * as React from 'react'
import { DefaultComponentProps } from '../../state'

interface ContactPageProps extends DefaultComponentProps { }

export const ContactPage = (props: ContactPageProps) => {
    return <div className="container">
        <h1>Contact</h1>

        <p>
            Check out my <a target="_blank" href="https://stevenkoerts.nl">Website</a> or <a target="_blank" href="https://github.com/Steven24K">GitHub</a> to see my other projects. 
        </p>
    </div>
}