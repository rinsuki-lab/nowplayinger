import * as React from "react"
import Music from "../music";
import config from "../config";

interface Props {
    music: Music | null | undefined
}

export default class Send extends React.Component<Props> {
    render() {
        return (
            <div>
                <button disabled={!this.props.music} onClick={this.onClick.bind(this)}>Send!</button>
            </div>
        )
    }

    async onClick() {
        const world = Object.values(config.worlds)[0]
        const music = this.props.music
        if (!music) return
        const postText = music.title + " - " + music.artist + " / "+music.album+" #nowplaying"
        world.post(postText)
    }
}