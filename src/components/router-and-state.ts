import { HttpResult, AsyncState, loadingAsyncState, loadedAsyncState, div, hn, string, Widget, Action, nav, any, button_wrapper, span, unorderedList } from "widgets-for-react";



interface Article { id: string, title: string, content: string }

module MyApi {
    const chance = {
        city: () => 'Schiedam',
        paragraph: () => 'Lorum ipsum...'
    }
    export const articles = new Map<string, Article>().set(
        "1", { id: "1", title: chance.city(), content: chance.paragraph() })
        .set(
            "2", { id: "2", title: chance.city(), content: chance.paragraph() })
        .set(
            "3", { id: "3", title: chance.city(), content: chance.paragraph() })
        .set(
            "4", { id: "4", title: chance.city(), content: chance.paragraph() })

    export const getArticle = (id: string): Promise<HttpResult<Article>> => new Promise((res, rej) => {
        if (Math.random() <= 0.3 && articles.has(id))
            return setTimeout(() =>
                res({ kind: "result", value: articles.get(id)!, status: 200 }), 500)
        else return setTimeout(() =>
            rej("Connection error"), 500)
    })
}

interface ArticleId { id: string }

type AppState = {
    allArticles: Map<string, Article & { loadedAt: Date }>
    article: AsyncState<Article>
} & ArticleId


const initialState = (id: string): AppState => ({
    article: loadingAsyncState(() => MyApi.getArticle(id)),
    allArticles: new Map(),
    id
})


const storeNewArticle = (newArticle: AsyncState<Article>) => (s: AppState): AppState => {
    return ({
        ...s, article: newArticle,
        allArticles: newArticle.kind == "loaded" ?
            s.allArticles.set(newArticle.value.id, { ...newArticle.value, loadedAt: new Date(Date.now()) }) : s.allArticles
    })
}

const mergeAppStates = (oldState: AppState, newState: AppState) => {
    let allArticles = oldState.allArticles
    if (allArticles.has(newState.id)) {
        if ((Date.now() - allArticles.get(newState.id)!.loadedAt.valueOf()) / 1000 <= 360)
            return { ...oldState, allArticles: allArticles, id: newState.id, article: loadedAsyncState(allArticles.get(newState.id)!) }
    }
    return {
        ...oldState, id: newState.id,
        allArticles: allArticles,
        article: loadingAsyncState(() => MyApi.getArticle(newState.id))
    }
}


const article = (s0: AppState) => (article: Article): Widget<Action<AsyncState<Article>>> =>
    div({ className: "container" })(
        div({ className: "row" })(
            div({ className: "col" })([
                hn(2, article.title)(),
                string({ readonly: true, readonly_element: "p" })(article.content),
            ])
        )
    ).never()


// const navbar = (s0: AppState): Widget<Action<AppState>> =>
//     nav({ id: "navbar-example2", className: "navbar navbar-expand-lg navbar-light bg-light" })(
//         any()([
//             button_wrapper(
//                 span({ className: "navbar-toggler-icon" })(),
//                 {
//                     className: "navbar-toggler",
//                     extraProperties: {
//                         "type": "button", "data-toggle": "collapse", "data-target": "#navbarSupportedContent",
//                         "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation"
//                     }
//                 })(() => ({})),
//             div({ className: "collapse navbar-collapse", id: "navbarSupportedContent" })(
//                 unorderedList({ className: "navbar-nav ml-auto" })(
//                     MyApi.articles.map(a =>
//                         ({
//                             options: { className: `nav-item dropdown ${a && a.id == s0.id ? "active" : ""}` },
//                             widget:
//                                 nav_link(`${a.title}`, `/router_sample/articles/${a.id}`,
//                                     { className: "nav-link", role: "button" }).never<Action<AppState>>(),
//                         })
//                     )
//                 )
//             )
//         ])
//     ).never()