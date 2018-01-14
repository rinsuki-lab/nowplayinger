import * as React from "react"
import Music from "../music";
import nowplaying from "itunes-nowplaying-mac"

interface Props {
    onChanged: (music: Music) => void
}

export default class Source extends React.Component<Props> {
    render() {
        return (
            <button onClick={this.changeEvent.bind(this)}>Reload Music Data</button>
        )
    }
    async changeEvent() {
        const itunes = await nowplaying()
        if (!itunes) return
        var music = new Music()
        music.title = itunes.name
        music.album = itunes.album.name
        music.artist = itunes.artist
        this.props.onChanged(music)
    }
}