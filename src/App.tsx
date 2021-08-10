import '../static/css/site.css'
import { Action, any, stateful } from 'widgets-for-react';
import { AppState, initialAppState } from './state';
import { footer, navbar } from './views';
import { memoryRouter } from './components/MemoryRouter';
import { page } from './page';
import { routes } from './routes';


export const App = stateful<AppState>()(s0 => memoryRouter<Action<AppState>>()(
    any<Action<AppState>>()([

        routes(s0),

        navbar(s0),

        page(s0),

        footer()
    ])
).map(a => a(s0)))(initialAppState())