import { stateful, Action, any, div, label, string, Widget, IOWidget, checkbox, promise, Unit, async, button, wait } from 'widgets-for-react'
import { Entity } from 'ts-lenses'

// 3. Simple API

export interface Person {
    name: string
    surname: string
}

export module My_API {
    export const get_person = () => new Promise<Person>((res, rej) => setTimeout(() => Math.random() > 0.8 ? res({ name: 'Steven', surname: 'Koerts' }) : rej('Cannot reach server.'), 500))
}

export interface LoadingState { status: 'loading' | 'load-error' }
export interface LoadedState { status: 'done', person: Person }
export type State = LoadedState | LoadingState

const get_person: Widget<Action<State>> = promise<Unit, Action<State>>(
    _ => My_API.get_person().then<Action<State>>(p => s => ({ ...s, status: 'done', person: p })),
    { on_fail: _ => s => Entity(s).set('status', _ => 'load-error' as any).commit() }
)({})

const field = (title: string, html_for: string, actual_field: Widget<never>): Widget<never> => div<never>({ className: 'row form-group' })(
    label<never>(title, { htmlFor: html_for, label_position: 'before', className: "col-sm-1 col-form-label" })(
        div<never>({ className: 'col-sm-3' })(
            actual_field
        )
    )
).never()

const show_data = (s: LoadedState) => any<Action<State>>()([
    field('Name', 'name', string({ readonly: true, id: 'name', className: 'form-control' })(s.person.name).never()),
    field('Surname', 'surname', string({ readonly: true, id: 'surname', className: 'form-control' })(s.person.surname).never()),
    div<Action<State>>({ className: 'btn-group' })(
        any<Action<State>>()([
            button<Action<State>>('Refresh', { disabled: s.status != 'done', className: 'btn btn-primary' })(() => s => Entity(s).set('status', _ => 'loading' as any).commit())
        ])
    )
])

const show_loading = any<Action<State>>()([
    string({ readonly: true, className: 'alert alert-info', style: { position: "fixed", left: "15px", top: "15px" } })('Loading...').never(),
    get_person
])

const show_load_error = any<Action<State>>()([
    string({ readonly: true, className: 'alert alert-danger', style: { position: "fixed", left: "15px", top: "15px" } })('Load error...').never(),
    wait<Action<State>>(500)(() => s => Entity(s).set('status', _ => 'loading' as any).commit())
])

export const simple_api = stateful<State>()(s => (
    s.status == 'loading' ?
        show_loading
        : s.status == 'done' ?
            show_data(s)
            : show_load_error
).map(a => a(s)))({ status: 'loading' }).filter(s => s.status == 'done')

