import { Action, fromJSX, Widget } from "widgets-for-react";
import { NotFoundPage } from "./components/errors/NotFound";
import { AboutPage } from "./components/pages/About.";
import { ContactPage } from "./components/pages/Contact";
import { HomePage } from "./components/pages/Home";
import { ProductDetailPage } from "./components/pages/ProductDetail";
import { ProductOverViewPage } from "./components/pages/ProductOverView";
import { NavBar } from "./components/shared/NavBar";
import { AppState } from "./state";

export const navbar = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => NavBar({
        appState: s0
    }))

export const home = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => HomePage({
        appState: s0
    }))

export const about = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => AboutPage({
        appState: s0
    }))

export const contact = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => ContactPage({
        appState: s0
    }))

export const product_overview = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => ProductOverViewPage({
        appState: s0
    }))

export const product_detail = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(setState => ProductDetailPage({
        appState: s0
    }))

export const notFound = (s0: AppState): Widget<Action<AppState>> =>
    fromJSX(_ => NotFoundPage({
        appState: s0
    }))