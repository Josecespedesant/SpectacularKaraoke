import KaraokeLyric from 'react-karaoke-lyric';
import React, { Component } from "react";

export default class Player extends Component {

    render() {
        return (
            <div class="card mb-4">
                            <div class="card-header">
                            <i class="fas fa-music me-1"> </i>
                                Current song <span type="button" class="badge bg-primary rounded-pill">Sync</span>
                                <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: 400}} aria-valuenow="00" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>

                            <div class="list-group list-group-flush">
                            <KaraokeLyric class="list-group-item active d-flex justify-content-center align-items-start" text="or an anchor to be keyboard accessible. Provide a valid, navigable address as the href value" percentage="9" activeStyle={{  'font-size': '25px' }} fontStyle={{  'font-size': '25px' }}/>
                            <KaraokeLyric class="list-group-item active d-flex justify-content-center align-items-start" text="The next lyrics" percentage="0" activeStyle={{  'font-size': '25px' }} fontStyle={{  'font-size': '25px' }}/>
                            <KaraokeLyric class="list-group-item active d-flex justify-content-center align-items-start" text="The next lyrics" percentage="0" activeStyle={{  'font-size': '25px' }} fontStyle={{  'font-size': '25px' }}/>
                            <KaraokeLyric class="list-group-item active d-flex justify-content-center align-items-start" text="The next lyrics" percentage="0" activeStyle={{  'font-size': '25px' }} fontStyle={{  'font-size': '25px' }}/>
                            </div>
                        </div>
        
)
}
}