/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import Login from "./login.component";
import { KaraokeClient } from '../client/KaraokeClient';
import Player from "./player.component"

export default class NavBar extends Component {
  KaraokeClient = new KaraokeClient();

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      by: '',
      data: '',
      urla: 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/Tupac_Changes.mp3',
      lyrics: `NEW TEST LIRYCS`

    };
    this.active1 = false
    this.active2 = false
    this.active3 = false
    this.active4 = false
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  async search(by, thing) {
    switch (by) {
      default:
        break;

      case ('lyric'):
        const newData1 = await this.KaraokeClient.searchLyric(thing);
        this.setState({
          data: newData1
        });
        console.log(this.state.data)
        break;
      case ('artist'):
        const newData2 = await this.KaraokeClient.searchOther(by, thing);
        this.setState({
          data: newData2
        });
        console.log(this.state.data)
        break;

      case ('name'):
        const newData3 = await this.KaraokeClient.searchOther(by, thing);
        this.setState({
          data: newData3
        });
        console.log(this.state.data)
        break;
      case ('album'):
        const newData4 = await this.KaraokeClient.searchOther(by, thing);
        this.setState({
          data: newData4
        });
        console.log(this.state.data)
        break;

    }
  }

  by(bys) {
    this.setState({ by: bys })
    switch (bys) {
      default:
        break;

      case ('lyric'):
        this.active1 = true
        this.active2 = false
        this.active3 = false
        this.active4 = false
        break;

      case ('artist'):
        this.active1 = false
        this.active2 = true
        this.active3 = false
        this.active4 = false
        break;

      case ('name'):
        this.active1 = false
        this.active2 = false
        this.active3 = true
        this.active4 = false
        break;

      case ('album'):
        this.active1 = false
        this.active2 = false
        this.active3 = false
        this.active4 = true
        break;
    }
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.search(this.state.by, this.state.value)
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a className="navbar-brand" href="/">Spectacular Karaoke TEC</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" onSubmit={this.handleSubmit}>
                <div class="input-group">
                  <input class="form-control" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                  <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                      <li><a class={this.active1 ? "dropdown-item active" : "dropdown-item"} onClick={() => this.by('lyric')} >By Lyrics</a></li>
                      <li><a class={this.active2 ? "dropdown-item active" : "dropdown-item"} onClick={() => this.by('artist')} >By Artist</a></li>
                      <li><a class={this.active3 ? "dropdown-item active" : "dropdown-item"} onClick={() => this.by('name')} >By Name</a></li>
                      <li><a class={this.active4 ? "dropdown-item active" : "dropdown-item"} onClick={() => this.by('album')} >By Album</a></li>
                    </ul>
                  </div>
                  <button class="btn btn-outline-primary" type="submit" value="Submit"><i class="fas fa-search"></i></button>
                </div>
              </form>
              <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="navbarDropdown">
                    <Login></Login>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <Player found={this.state.data}/>
      </div>
    );
  }

}
