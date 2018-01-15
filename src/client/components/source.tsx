import * as React from "react"
import Music from "../music";
import config from "../config";
import * as FontAwesome from "react-fontawesome"

interface Props {
    onChanged: (music: Music) => void
}

interface State {
    selectedPlayer: string
}

export default class Source extends React.Component<Props, State> {
    render() {
        var options = Object.values(config.players).map(player => {
            return <option value={player.getUniqueKey()} key={player.getUniqueKey()}>{player.getDisplayName()}</option>
        })
        return (
            <div>
                <select onChange={this.onChangePlayer.bind(this)}>
                    {options}
                </select>
                <button onClick={this.changeEvent.bind(this)}><FontAwesome name="refresh"/></button>
            </div>
        )
    }
    onChangePlayer(e: any) {
        this.setState({selectedPlayer: e.target.value as string})
    }
    async changeEvent() {
        const player = config.players[(this.state || {}).selectedPlayer] || Object.values(config.players)[0]
        if (!player) return
        const music = await player.getNowplaying()
        if (!music) return
        this.props.onChanged(music)
    }
}