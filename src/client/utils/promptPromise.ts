import * as React from "react"
import * as ReactDOM from "react-dom";
import PromptDialog from "../components/dialogs/prompt";

export default function prompt(message: string, defaultValue: string = "") {
    return new Promise<string | null>((resolve, reject) => {
        var root = document.createElement("div")
        document.body.appendChild(root)
        ReactDOM.render(React.createElement(PromptDialog, {
            title: message,
            defaultValue,
            callback: (result: string | null) => {
                ReactDOM.unmountComponentAtNode(root)
                root.remove()
                resolve(result)
            }
        }), root)
    })
}