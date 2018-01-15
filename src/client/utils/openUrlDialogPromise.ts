import * as React from "react"
import * as ReactDOM from "react-dom"
import OpenUrlDialog from "../components/dialogs/openUrl";

export default function openUrl(url: string, message: string | undefined = undefined) {
    return new Promise<void>((resolve, reject) => {
        var root = document.createElement("div")
        document.body.appendChild(root)
        ReactDOM.render(React.createElement(OpenUrlDialog, {
            url,
            title: message,
            callback: () => {
                ReactDOM.unmountComponentAtNode(root)
                resolve()
            }
        }), root)
    })
}