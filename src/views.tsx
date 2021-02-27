import { Map } from "immutable";
import { Action, any, async, fromJSX, Widget } from "widgets-for-react";
import { NotFoundPage } from "./components/errors/NotFound";
import { AboutPage } from "./components/pages/About.";
import { ContactPage } from "./components/pages/Contact";
import { HomePage } from "./components/pages/Home";
import { ProductDetailPage } from "./components/pages/ProductDetail";
import { ProductOverViewPage } from "./components/pages/ProductOverView";
import { Footer } from "./components/shared/Footer";
import { NavBar } from "./components/shared/NavBar";
import { Product } from "./models/Product";
import { AppState, set_Products } from "./state";

export const navbar = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => NavBar({
        appState: s0,
        setState: setState
    }))

export const footer = (): Widget<Action<AppState>> =>
    fromJSX(_ => Footer())

export const home = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => HomePage({
        appState: s0,
        setState: setState
    }))

export const about = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => AboutPage({
        appState: s0,
        setState: setState
    }))

export const contact = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => ContactPage({
        appState: s0,
        setState: setState
    }))

export const product_overview = (s0: AppState): Widget<Action<AppState>> => any<Action<AppState>>()([
    async<Map<number, Product>>()(s0.products).map(a => s => set_Products(a(s.products))(s)),
    fromJSX(setState => ProductOverViewPage({
        appState: s0,
        setState: setState
    }))
])

export const product_detail = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => ProductDetailPage({
        appState: s0,
        setState: setState
    }))

export const notFound = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => NotFoundPage({
        appState: s0,
        setState: setState
    }))