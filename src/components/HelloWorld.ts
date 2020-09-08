import { stateful, div, label, string } from "widgets-for-react";

// 1. Hello React Widgets
export let hello_world_app = stateful<string>()(s => div<string>({ className: 'form-froup' })(
    label<string>("Type text here", { htmlFor: "main-input", label_position: "before" })(
        div<string>({ className: 'input-group' })(
            string({ id: 'main-input', className: "form-control" })(s)
        )
    )
)
)("Hello World!!!")
