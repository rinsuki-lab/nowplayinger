import * as React from "react"
import ModalDialog from "./modal";

interface Props {
    title: string
    defaultValue: string | undefined
    callback: (result: string | null) => void
}

interface State {
    value: string
}

export default class PromptDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            value: this.props.defaultValue || ""
        }
    }
    render() {
        return <ModalDialog>
            <div>{this.props.title}</div>
            <input value={this.state.value} onChange={this.change.bind(this)}/>
            <button onClick={this.okClick.bind(this)}>OK</button>
            <button onClick={this.cancelClick.bind(this)}>Cancel</button>
        </ModalDialog>
    }

    change(e: any) {
        this.setState({value: e.target.value})
    }
    
    okClick() {
        this.props.callback(this.state.value)
    }

    cancelClick() {
        this.props.callback(null)
    }
}