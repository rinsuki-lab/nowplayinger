import * as React from "react"
import Music from "../music"

interface Props {
    music: Music | null | undefined
}

export default class Preview extends React.Component<Props> {
    render() {
        if (!this.props.music) {
            return (
                <div>
                    <h2>Now Loading...</h2>
                </div>
            )
        }
        return (
            <div>
                <h2>{this.props.music.title}</h2>
                <span>{this.props.music.artist}&nbsp; ─ &nbsp;{this.props.music.album}</span>
            </div>
        )
    }
}