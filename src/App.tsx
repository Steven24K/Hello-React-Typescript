import '../static/css/site.css'
import { Action, any, async, browserRouter, doRouting, notFoundRouteCase, onlyIf, route, routerSwitch, Routes, stateful } from 'widgets-for-react';
import { AppState, initialAppState, isRouteChanged, RouteParams, setAppStateRoute, set_Products } from './state';
import { about, contact, home, product_detail, product_overview, notFound, navbar } from './views';
import { memoryRouter } from './components/MemoryRouter';
import { Product } from './models/Product';


export const App = stateful<AppState>()(s0 => memoryRouter<Action<AppState>>()(
    any<Action<AppState>>()([

        routerSwitch<RouteParams>({ key: 'my-router' })([
            route<{}, RouteParams>('/', () => ({ kind: 'home' })),

            route<{}, RouteParams>('/about', () => ({ kind: 'about' })),

            route<{}, RouteParams>('/contact', () => ({ kind: 'contact' })),

            route<{ order?: 'asc' | 'desc' }, RouteParams>('/products/:order?', a => ({ kind: 'products', order: a.order })),

            route<{ id: number }, RouteParams>('/product/:id', a => ({ kind: 'product', id: a.id })),



            notFoundRouteCase<RouteParams>(() => ({ kind: '404' }))
        ]).filter(newRoute => isRouteChanged(s0.route, newRoute))
            .map(route => s => setAppStateRoute(route, s)),

        async<Product[]>()(s0.products).map(a => s => set_Products(a(s.products))(s)),

        navbar(s0),

        onlyIf(s0.currentPage.kind == 'home-page', home(s0)),

        onlyIf(s0.currentPage.kind == 'about-page', about(s0)),

        onlyIf(s0.currentPage.kind == 'contact-page', contact(s0)),

        onlyIf(s0.currentPage.kind == 'products-overview', product_overview(s0)),

        onlyIf(s0.currentPage.kind == 'product-detail', product_detail(s0)),

        onlyIf(s0.currentPage.kind == 'notfound', notFound(s0))



    ])
).map(a => a(s0)))(initialAppState())