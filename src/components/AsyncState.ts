import { IOWidget, Action, Widget, any, promise, Unit, nothing, wait, string, button, div, stateful } from 'widgets-for-react'
import { Entity } from 'ts-lenses'
import { Person } from './SimpleAPI'


// 4. async state

export type HttpResult<a> = ({ kind: "result", value: a } | { kind: "unauthorized" } | { kind: "failed" }) & { status: number }

export type LoadedAsyncState<a> = { kind: "loaded", value: a }
export type LoadingAsyncState<a> = { kind: "loading", value?: a }

export type AsyncState<a> =
    LoadedAsyncState<a> |
    ((LoadingAsyncState<a> |
    { kind: "connection-error" } |
    { kind: "unauthorized", status: number } |
    { kind: "failed", status: number }) & { p: Promise<HttpResult<a>> })

export const unauthorizedAsyncState = <a>(status: number): AsyncState<a> =>
    ({ kind: "unauthorized", status: status, p: new Promise(_ => { }) })
export const errorAsyncState = <a>(status: number): AsyncState<a> =>
    ({ kind: "failed", status: status, p: new Promise(_ => { }) })
export const loadedAsyncState = <a>(v: a): AsyncState<a> =>
    ({ kind: "loaded", value: v })
export const loadingAsyncState = <a>(p: Promise<HttpResult<a>>, old_value?: a): AsyncState<a> =>
    ({ kind: "loading", value: old_value, p: p })


export const async = <a>(w: IOWidget<a, Action<AsyncState<a>>>, loading: IOWidget<LoadingAsyncState<a>, never>) => (s0: AsyncState<a>): Widget<Action<AsyncState<a>>> =>
    any<Action<AsyncState<a>>>()([
        s0.kind == "loaded" ?
            w(s0.value)
            : s0.kind == "loading" ?
                any<Action<AsyncState<a>>>()([
                    loading(s0).never(),
                    promise<Unit, Action<AsyncState<a>>>(
                        _ => s0.p.then<Action<AsyncState<a>>>(res => _ =>
                            res.kind == "result" ?
                                ({ ...s0, kind: "loaded", value: res.value })
                                : res.kind == "unauthorized" ?
                                    ({ ...s0, kind: "unauthorized", status: res.status })
                                    :
                                    ({ ...s0, kind: "failed", status: res.status })
                        ),
                        { on_fail: e => _ => ({ ...s0, kind: "connection-error" }) }
                    )({})
                ])
                : s0.kind == "connection-error" ?
                    wait<Action<AsyncState<a>>>(500)(() => _ => ({ ...s0, kind: "loading" }))
                    : nothing<Action<AsyncState<a>>>()
    ])

export const getPersonAsync = () => new Promise<HttpResult<Person>>((res, rej) => setTimeout(() => res({ kind: "result", value: { name: "Hank", surname: "Williams" }, status: 200 }), 1500))


const showPersonForm = (p: Person) =>
    any<Action<AsyncState<Person>>>()([
        string({ readonly: true })(JSON.stringify(p)).never(),
        button<Action<AsyncState<Person>>>("Reload")(() => _ => loadingAsyncState(getPersonAsync(), p))
    ])


export const showPerson = (p: Person) =>
    div<Action<AsyncState<Person>>>({ style: { position: "relative", padding: "15px" } })([
        showPersonForm(p)
    ])

export const showLoading = (s: LoadingAsyncState<Person>) =>
    any<never>()([
        string({
            readonly: true,
            className: `alert alert-info`,
            style: { position: "fixed", left: "15px", top: "15px" }
        })("Loading...").never(),
        s.value != undefined ?
            div({ style: { position: "relative", padding: "15px" } })([
                div({
                    style: {
                        position: "absolute", top: "0%", left: "0%", width: "100%", height: "100%",
                        backgroundColor: "gray", opacity: 0.3
                    }
                })(),
                showPersonForm(s.value),
            ]).never()
            :
            nothing()
    ])


export const asyncStateExample = ({
    widget: () => stateful<AsyncState<Person>>()(s0 =>
        async<Person>(
            showPerson,
            showLoading
        )(
            s0
        ).map<AsyncState<Person>>(a => a(s0))
    )(loadingAsyncState(getPersonAsync())),
    path: "/examples/async_state",
    name: "Async State",
    category: "forms",
    link_to_source: `https://github.com/hoppinger/Widgets-for-React/blob/master/dev/client/src/examples/loader.ts`
})