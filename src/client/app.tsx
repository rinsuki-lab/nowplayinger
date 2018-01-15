import * as React from "react";
import Source from "./components/source";
import Preview from "./components/preview";
import Music from "./music";
import Send from "./components/send";
import Settings from "./components/settings"
import * as FontAwesome from "react-fontawesome"

interface State {
    music: Music | null | undefined
}

interface Props {

}

import "./app.css"
import { ipcRenderer } from "electron";

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            music: undefined
        }
    }
    render() {
        return (
            <div className="parent">
                <div className="header"><div>
                    <h1>NowPlaying</h1>
                    <button className="closeButton" onClick={this.close.bind(this)}><FontAwesome name="times" /></button>
                    <Settings />
                    <Source onChanged={this.updateMusic.bind(this)}/>
                </div></div>
                <div className="main">
                    <Preview music={this.state.music}/>
                </div>
                <div className="footer">
                    <Send music={this.state.music}/>
                </div>
            </div>
        )
    }
    updateMusic(music: Music) {
        this.setState({music})
    }

    close() {
        ipcRenderer.send("quit-app")
    }
}