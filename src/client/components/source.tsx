import * as React from "react"
import Music from "../music";
import config from "../config";

interface Props {
    onChanged: (music: Music) => void
}

export default class Source extends React.Component<Props> {
    render() {
        var options = config.players.map(player => {
            return <option value={player.getUniqueKey()}>{player.getDisplayName()}</option>
        })
        return (
            <div>
                player: 
                <select>
                    {options}
                </select>
                <button onClick={this.changeEvent.bind(this)}>Reload Music Data</button>
            </div>
        )
    }
    async changeEvent() {
        const player = config.players[0]
        if (!player) return
        const music = await player.getNowplaying()
        if (!music) return
        this.props.onChanged(music)
    }
}