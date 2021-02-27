import { Map } from "immutable"
import { Entity } from "ts-lenses"
import { AsyncState, Fun, loadingAsyncState, unloadedAsyncState } from "widgets-for-react"
import { get_all_products } from "./api"
import { Product } from "./models/Product"

export type AppState = {
    route: RouteParams
    currentPage: HomePageState | AboutPageState | ContactPageState | ProductOverViewPageState | ProductDetailPageState | NotFoundPageState | NeverPageState
    products: AsyncState<Map<number, Product>>
}

export let initialAppState = (): AppState => ({
    route: { kind: 'home' },
    currentPage: HomePageState(),
    products: unloadedAsyncState(),
})

export interface DefaultComponentProps {
    appState: AppState
    setState: (_: Fun<AppState, AppState>) => void
}

export type RouteParams = { kind: 'home' } |
{ kind: 'about' } |
{ kind: 'contact' } |
{ kind: 'products', order?: 'asc' | 'desc' } |
{ kind: 'product', id: number } |
{ kind: '404' }

export const isRouteChanged = (oldRoute: RouteParams, newRoute: RouteParams) => oldRoute.kind != newRoute.kind
    || (oldRoute.kind == 'product' && newRoute.kind == 'product' && oldRoute.id != newRoute.id)
    || (oldRoute.kind == 'products' && newRoute.kind == 'products' && oldRoute.order != oldRoute.order)

export type NeverPageState = { kind: 'never' }

export type HomePageState = { kind: 'home-page', color: string }
let HomePageState = (): HomePageState => ({ kind: 'home-page', color: 'white' })

export type AboutPageState = { kind: 'about-page' }
let AboutPageState = (): AboutPageState => ({ kind: 'about-page' })

export type ContactPageState = { kind: 'contact-page' }
let ContactPageState = (): ContactPageState => ({ kind: 'contact-page' })

export type ProductOverViewPageState = { kind: 'products-overview' }
let ProductOverViewPageState = (): ProductOverViewPageState => ({ kind: 'products-overview' })

export type ProductDetailPageState = { kind: 'product-detail', productId: number }
let ProductDetailPageState = (id: number): ProductDetailPageState => ({ kind: 'product-detail', productId: id })

export type NotFoundPageState = { kind: 'notfound' }
let NotFoundPageState = (): NotFoundPageState => ({ kind: 'notfound' })

export let setAppStateRoute = (route: RouteParams, appState: AppState): AppState => {

    switch (route.kind) {
        case 'home':
            return Entity(appState)
                .set('route', _ => route)
                .set('currentPage', _ => HomePageState())
                .commit()
        case 'about':
            return Entity(appState)
                .set('route', _ => route)
                .set('currentPage', _ => AboutPageState())
                .commit()
        case 'contact':
            return Entity(appState)
                .set('route', _ => route)
                .set('currentPage', _ => ContactPageState())
                .commit()
        case 'products':
            return Entity(appState)
                .set('route', _ => route)
                .set('currentPage', _ => ProductOverViewPageState())
                .set('products', data => {
                    if (data.kind == 'loaded') {
                        return data
                    }
                    return loadingAsyncState(() => get_all_products())
                })
                .commit()
        case 'product':
            return Entity(appState)
                .set('route', _ => route)
                .set('currentPage', _ => ProductDetailPageState(route.id))
                .commit()
        default:
            return Entity(appState)
                .set('route', _ => route)
                .commit()
    }
}

export let set_Products = (newProducts: AsyncState<Map<number, Product>>) => (s0: AppState): AppState =>
    Entity(s0).set('products', _ => newProducts).commit()

