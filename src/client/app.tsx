import * as React from "react";
import Source from "./components/source";
import Preview from "./components/preview";
import Music from "./music";
import Send from "./components/send";

interface State {
    music: Music | null | undefined
}

interface Props {

}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            music: undefined
        }
    }
    render() {
        return (
            <div>
                <h1>NowPlaying</h1>
                <Source onChanged={this.updateMusic.bind(this)}/>
                <Preview music={this.state.music}/>
                <Send music={this.state.music}/>
            </div>
        )
    }
    updateMusic(music: Music) {
        this.setState({music})
    }
}