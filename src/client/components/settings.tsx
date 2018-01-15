import * as React from "react"
import * as FontAwesome from "react-fontawesome"
import ModalDialog from "./dialogs/modal"
import { WorldManager } from "../plugins/core/world";
import config from "../config";

interface State {
    popupOpen: boolean
}

export default class Settings extends React.Component<{}, State>{
    constructor(props: {}) {
        super(props)
        this.state = {
            popupOpen: false
        }
    }
    render() {
        return <div>
            <button onClick={this.togglePopup.bind(this)}>
                <FontAwesome name="cog" />
            </button>
            {this.state.popupOpen ? 
                <ModalDialog>
                    test
                    <button onClick={this.addWorld.bind(this)}>add world</button>
                    <button onClick={this.togglePopup.bind(this)}>close</button>
                </ModalDialog>
            : undefined}
        </div>
    }

    togglePopup() {
        this.setState({popupOpen: !this.state.popupOpen})
    }

    async addWorld() {
        await config.auth(WorldManager.worlds["mastodon"])
    }
}