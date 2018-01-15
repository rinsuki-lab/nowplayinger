import * as React from "react"
import ModalDialog from "./modal"
import { shell } from "electron";
import * as ReactDOM from "react-dom";

interface Props {
    url: string
    title: string | undefined
    callback: () => void
}

export default class OpenUrlDialog extends React.Component<Props> {
    render() {
        return <ModalDialog>
            <div>{this.props.title || "次の URL を開いてください:"} </div>
            <input value={this.props.url} />
            <button onClick={this.openURL.bind(this)}>開く</button>
            <button onClick={this.okClicked.bind(this)}>OK</button>
        </ModalDialog>
    }

    openURL() {
        shell.openExternal(this.props.url)
    }

    okClicked() {
        this.props.callback()
    }
}