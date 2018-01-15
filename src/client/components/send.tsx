import * as React from "react"
import Music from "../music";
import config from "../config";

interface Props {
    music: Music | null | undefined
}

interface State {
    isPosting: boolean
    selectedWorld: string
}

export default class Send extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedWorld: "",
            isPosting: false
        }
    }
    render() {
        var options = Object.values(config.worlds).map(world => {
            return <option value={world.getUniqueKey()} key={world.getUniqueKey()}>{world.getDisplayName()}</option>
        })
        return (
            <div>
                world: 
                <select onChange={this.onChangeWorld.bind(this)}>
                    {options}
                </select>
                <button disabled={!this.props.music || this.state.isPosting} onClick={this.onClick.bind(this)}>Send!</button>
            </div>
        )
    }
    onChangeWorld(e: any) {
        this.setState({selectedWorld: e.target.value as string})
    }

    async onClick() {
        const world = config.worlds[(this.state || {}).selectedWorld] || Object.values(config.worlds)[0]
        const music = this.props.music
        if (!music) return
        const postText = music.title + " - " + music.artist + " / "+music.album+" #nowplaying"
        this.setState({isPosting: true})
        try {
            await world.post(postText)
        } catch(e) {
            throw e
        } finally {
            this.setState({isPosting: false})
        }
    }
}