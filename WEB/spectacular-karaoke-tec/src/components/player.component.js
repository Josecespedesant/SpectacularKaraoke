import React, { Component } from "react";
import { KaraokeClient } from '../client/KaraokeClient';
import  Music  from './music.component'

export default class Player extends Component {
    KaraokeClient = new KaraokeClient();

    constructor(){
        super();
        this.state = {
          data: 'a',
          urla: '',
          lyrics:`Please select a song to show your lyrics here!`
        }
        
      }
    
      componentDidMount(){
        this.loadDataSongs();
      }

      song(selection){
        this.loadSong(selection)
      }

      async loadDataSongs(){
        const newData = await this.KaraokeClient.getSongsData();
        this.setState({
          data:newData
        });
      }

      async loadSong(name){
        const newURL = await this.KaraokeClient.getSong(name);
        this.setState({
          urla:newURL.key,
          lyrics:newURL.lyrics
        });
      }

    render() {
        return (
            <div class="card mb-4">

              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-table me-1"></i>
                    Featured Song List
                </div>

                  <div class="list-group list-group-flush">
                    {Array.from(this.state.data).map((value,index) =>
                      <button type="button" onClick={()=>this.song(value)} class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                        {value}
                        <span class="badge bg-primary rounded-pill">{index+1}</span>
                      </button>)}
                  </div>
              </div>
                <Music url={this.state.urla} lyrics={this.state.lyrics}></Music>
            </div>
            )
          }
        }