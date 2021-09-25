import React, { Component } from "react";
import { KaraokeClient } from '../client/KaraokeClient';
import  Music  from './music.component'

export default class Player extends Component {
    KaraokeClient = new KaraokeClient();

    constructor(){
        super();
        this.state = {
          data: 'a',
          urla: 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/Tupac_Changes.mp3'

        }
      }
    
      componentDidMount(){
        this.loadData();
      }

      async loadData(){
        const newData = await this.KaraokeClient.getSongsData();
        this.setState({
          data:newData
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
                    {Array.from(this.state.data).map((value) =>
                      <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                        {value.Key}
                        <span class="badge bg-primary rounded-pill">14</span>
                      </button>)}
                  </div>
              </div>
                <Music url={this.state.urla}></Music>
            </div>
            )
          }
        }