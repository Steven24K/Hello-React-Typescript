import { Action, notFoundRouteCase, route, routerSwitch, Widget } from "widgets-for-react";
import { AppState, isRouteChanged, RouteParams, setAppStateRoute } from "./state";

export const routes = (s0: AppState): Widget<Action<AppState>> => routerSwitch<RouteParams>({ key: 'my-router' })([
    route<{}, RouteParams>('/', () => ({ kind: 'home' })),

    route<{}, RouteParams>('/about', () => ({ kind: 'about' })),

    route<{}, RouteParams>('/contact', () => ({ kind: 'contact' })),

    route<{ order?: 'asc' | 'desc' }, RouteParams>('/products/:order?', a => ({ kind: 'products', order: a.order })),

    route<{ id: number }, RouteParams>('/product/:id', a => ({ kind: 'product', id: isNaN(a.id) ? 0 : +a.id })),

    notFoundRouteCase<RouteParams>(() => ({ kind: '404' }))
]).filter(newRoute => isRouteChanged(s0.route, newRoute))
    .map(route => s => setAppStateRoute(route, s))