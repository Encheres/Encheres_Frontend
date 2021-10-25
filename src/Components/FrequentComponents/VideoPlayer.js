import React, {Component} from "react";
import ReactPlayer from "react-player";
import { ipfs_base_url } from "../../apis_redux/apis/encheres";
import './styles.css'


class VideoPlayer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <ReactPlayer url={ipfs_base_url + this.props.url} playing={this.props.playing} controls={true} style={{width:"fit-content", maxWidth:'100%', height:'auto'}}/>
            </>
        )
    }
}
export default VideoPlayer;