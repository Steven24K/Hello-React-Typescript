import { Action, nothing, Widget } from "widgets-for-react";
import { AppState } from "./state";
import { about, contact, home, notFound, product_detail, product_overview } from "./views";

export const page = (s0: AppState): Widget<Action<AppState>> => {
    if (s0.currentPage.kind == 'home-page') {
        return home(s0)
    }
    if (s0.currentPage.kind == 'about-page') {
        return about(s0)
    }
    if (s0.currentPage.kind == 'contact-page') {
        return contact(s0)
    }
    if (s0.currentPage.kind == 'products-overview') {
        return product_overview(s0)
    }
    if (s0.currentPage.kind == 'product-detail') {
        return product_detail(s0)
    }
   if (s0.currentPage.kind == 'notfound') {
       return notFound(s0)
   }
   return nothing()
}