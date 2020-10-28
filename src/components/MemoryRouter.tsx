import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fromJSX, Options, Widget } from 'widgets-for-react'


export function memoryRouter<o>(options?: Options): (w: Widget<o>) => Widget<o> {
    return (w: Widget<o>) => fromJSX(onDone => <MemoryRouter key={options?.key}>
        {w.run(onDone)}
    </MemoryRouter>)
}