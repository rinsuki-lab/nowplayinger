import * as React from "react"
import * as FontAwesome from "react-fontawesome"
import ModalDialog from "./dialogs/modal"
import { WorldManager } from "../plugins/core/world";
import config from "../config";

interface State {
    popupOpen: boolean
    selectWorld: string | undefined
}

export default class Settings extends React.Component<{}, State>{
    constructor(props: {}) {
        super(props)
        this.state = {
            popupOpen: false,
            selectWorld: undefined,
        }
    }
    render() {
        return <div>
            <button className="configButton" onClick={this.togglePopup.bind(this)}>
                <FontAwesome name="cog" />
            </button>
            {this.state.popupOpen ? 
                <ModalDialog>
                    test
                    <div>
                        <h2>Add World</h2>
                        <select onChange={this.onChangeWorldSelect.bind(this)}>
                            {Object.keys(WorldManager.worlds).map(world_name => {
                                return <option value={world_name} key={world_name}>{world_name}</option>
                            })}
                        </select>
                        <button onClick={this.addWorld.bind(this)}>add world</button>
                    </div>
                    <button onClick={this.togglePopup.bind(this)}>close</button>
                </ModalDialog>
            : undefined}
        </div>
    }

    togglePopup() {
        this.setState({popupOpen: !this.state.popupOpen})
    }

    onChangeWorldSelect(e: any) {
        this.setState({selectWorld: e.target.value})
    }

    async addWorld() {
        this.refs
        await config.auth(this.state.selectWorld ? WorldManager.worlds[this.state.selectWorld] : Object.values(WorldManager.worlds)[0])
    }
}