import { stateful, div, label, string, Action, IOWidget, checkbox, Widget, any } from "widgets-for-react";
import { Entity } from 'ts-lenses'

// 2. Simple Form
interface FormData {
    name: string
    email: string
    is_human: boolean
}

export type FormAction = Action<FormData>

const set_name = (new_name: string): FormAction => (form_data: FormData) => Entity(form_data).set('name', _ => new_name).commit()
const set_email = (new_email: string): FormAction => (form_data: FormData) => Entity(form_data).set('email', _ => new_email).commit()
const set_is_human = (new_is_human: boolean): FormAction => (form_data: FormData) => Entity(form_data).set('is_human', _ => new_is_human).commit()

export const FormField = (title: string, htmlFor: string, actual_field: Widget<FormAction>): Widget<FormAction> => div<FormAction>({ className: 'row form-group', key: htmlFor })(
    label<FormAction>(title, { htmlFor: htmlFor, label_position: 'before', className: 'col-sm-1 col-form-label' })(
        div<FormAction>({ className: 'col-sm-3' })(
            actual_field
        )
    )
)



export const FormComponent: IOWidget<FormData, FormAction> = form_data => any<FormAction>()([
    FormField('Name', 'name', string({ id: 'name', className: 'form-control' })(form_data.name).map(set_name)),
    FormField('Email', 'email', string({ id: 'email', className: 'form-control' })(form_data.email).map(set_email)),
    FormField('Are you human?', 'is-human', checkbox<boolean>({ selected_value: true, unselected_value: false, id: 'is-human', className: 'form-control' })(form_data.is_human).map(set_is_human)),
])

export const simpleForm = stateful<FormData>()(form_data => FormComponent(form_data).map(action => action(form_data)))({ email: 'info@example.com', name: 'Steven 24K', is_human: true })
