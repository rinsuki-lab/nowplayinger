import * as React from "react";
import Source from "./components/source";
import Preview from "./components/preview";
import Music from "./music";
import Send from "./components/send";
import Settings from "./components/settings"

interface State {
    music: Music | null | undefined
}

interface Props {

}

import "./app.css"

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
}