import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./app"

addEventListener("load", () => {
    var root = document.createElement("div")
    root.id = "root"
    document.body.appendChild(root)
    ReactDOM.render(<App />, root)
})