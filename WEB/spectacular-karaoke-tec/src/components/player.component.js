import React, { Component } from "react";
import { KaraokeClient } from '../client/KaraokeClient';
import Music from './music.component'
import cdg from "../cdg.js/src/cdg"
import natural from 'natural'


export default class Player extends Component {
  KaraokeClient = new KaraokeClient();

  constructor() {
    super();
    this.state = {
      data: 'a',
      urla: '',
      lyrics: `
      Time slows down when it can get no worse
      I can feel it running out on me
      I don't want these to be my last words
      All forgotten 'cause that's all they'll be
      Now there's only one thing I can do
      Fight until the end like I promised to
      Wishing there was something left to lose
      This could be the day I die for you
      What do you see before it's over?
      Blinding flashes getting closer
      Wish that I had something left to lose
      This could be the day I die for you
      This could be the day I die for you
      This could bе the day I die for you
      This could be thе day
      Everything I know, everything I hold tight
      When to let it go, when to make 'em all fight
      When I'm in control, when I'm out of my mind
      When I gotta live, when I gotta die, gotta die
      Everything I know, everything I hold tight
      When to let it go, when to make 'em all fight
      When I'm in control, when I'm out of my mind
      When I gotta live, when I gotta die
      This could be the day I die for you
      Everything I know, everything I hold tight
      When to let it go, when to make 'em all fight
      When I'm in control, when I'm out of my mind (This could be the day)
      When I gotta live, when I gotta die
      Feeling like there's nothing I can do
      This could be the end it's mine to choose
      It's taken me my lifetime just to prove
      This could be the day I die for you
      Don't let it be the day…
      What do you see before it's over?
      Blinding flashes getting closer
      Sacrificing everything I knew
      This could be the day I die for you
      This could be the day I die for you
      Everything I know, everything I hold tight
      When to let it go, when to make 'em all fight
      When I'm in control, when I'm out of my mind (This could be the day)
      When I gotta live, when I gotta die`,
      found: '',
      foundDis: false,
      valueName: '',
      valueArtist: '',
      valueAlbum: '',
      valueLyrics: '',
      selectedFile: null,
      wiki: '',
      artista: ''


    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeArtist = this.handleChangeArtist.bind(this);
    this.handleChangeAlbum = this.handleChangeAlbum.bind(this);
    this.handleChangeLyrics = this.handleChangeLyrics.bind(this);
    this.loadKaraoke = this.loadKaraoke.bind(this);
    this.arraySong = []
    this.avg = 0

  }

  componentDidMount() {


    let player = cdg.init("cdg", { autoplay: false, showControls: true });
    player.loadTrack({
      audioFilePrefix: 'demo', // prefix of the audio file. Required
      cdgFilePrefix: 'demo', // prefix of the CDG file. Optional, defaults to audioFilePrefix value
      mediaPath: '/', // the path to the directory containing the CDG and audio files. Default: './'
      audioFormat: 'mp3', // Format and extension of the audio file. 'mp3' or 'ogg' are curently supported. Default: 'mp3'
      cdgFileExtension: 'cdg' // Default: 'cdg'
    });

    // The player also exposes play(), pause() and stop() methods which can be easily bound to event handlers
    document.getElementById("stopbtn").addEventListener("click", function () {
      player.stop();
    });

    this.loadDataSongs();
  }

  analyze() {
    this.loadKaraoke();
  }

  song(selection) {
    this.loadSong(selection)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.found !== this.props.found) {
      this.setState({
        found: this.props.found,
        foundDis: true
      })
      console.log(this.state.found)

    }
  }
  async loadDataSongs() {
    const newData = await this.KaraokeClient.getSongsData();
    this.setState({
      data: newData
    });
  }

  async loadKaraoke() {
    const newData = await this.KaraokeClient.getKaraokeData();
    this.arraySong = newData
    this.analyzeLetter();
  }

  async loadSong(name) {
    const newURL = await this.KaraokeClient.getSong(name);
    this.setState({
      urla: newURL.key,
      lyrics: newURL.lyrics,
      wiki: newURL.wiki,
      artista: newURL.artist
    });
    console.log(this.state.wiki)
  }

  analyzeLetter() {
    var tokenizer = new natural.WordTokenizer();
    var songLyrics = tokenizer.tokenize(this.state.lyrics)
    var prom = []
    var i = 0
    var a = 1
    for (; i < songLyrics.length; i++) {
      if (a + 1 >= this.arraySong.length) {
        //prom.push(1)
      } else {
        if (natural.DiceCoefficient(this.arraySong[a - 1], songLyrics[i]) > natural.DiceCoefficient(this.arraySong[a], songLyrics[i])) {
          prom.push(natural.DiceCoefficient(this.arraySong[a - 1], songLyrics[i]))
          a -= 1
        } else {
          if (natural.DiceCoefficient(this.arraySong[a + 1], songLyrics[i]) > natural.DiceCoefficient(this.arraySong[a], songLyrics[i])) {
            prom.push(natural.DiceCoefficient(this.arraySong[a + 1], songLyrics[i]))
            a += 1
          } else {
            prom.push(natural.DiceCoefficient(this.arraySong[a], songLyrics[i]))
          }
        }
      }
      a++
    }

    let sum = prom.reduce((previous, current) => current += previous);
    this.avg = sum / prom.length;
    console.log(songLyrics)
    console.log(this.arraySong)
    console.log(prom)
    console.log(this.avg)
    this.forceUpdate()
  }

  handleChangeName(event) {
    this.setState({ valueName: event.target.value });
  }

  handleChangeArtist(event) {
    this.setState({ valueArtist: event.target.value });
  }

  handleChangeAlbum(event) {
    this.setState({ valueAlbum: event.target.value });
  }

  handleChangeLyrics(event) {
    this.setState({ valueLyrics: event.target.value });
  }

  onFileChange = event => {

    this.setState({ selectedFile: event.target.files[0] });

  };

  async handleSubmit(event) {
    await this.KaraokeClient.newSong(this.state.selectedFile, this.state.valueName, this.state.valueArtist, this.state.valueAlbum, this.state.valueLyrics);
    //this.setState({
    //  data: newData
    //});
    console.log(this.state.valueName, this.state.valueArtist, this.state.valueArtist, this.state.valueLyrics, this.state.selectedFile)
    event.preventDefault();
  }

  deleteSong() {
    alert("Your song was succesfully deleted!")
  }

  render() {
    return (
      <body>
        <div>
          <div>
            <main>
              <div class="container-fluid px-4">
                <h1 class="mt-4">Song List <button class="btn btn-success" type="submit" value="Submit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-plus"></i> New Song</button></h1>

                <ol class="breadcrumb mb-4">
                  <li class="breadcrumb-item active">Main Page</li>
                </ol>
                {this.state.found !== '' ? <div class="card mb-4">
                  <div class="card-header">
                    <i class="fas fa-search"></i>
                    Results of the Search
                  </div>
                  <div class="list-group list-group-flush">
                    <button type="button" onClick={() => this.song(this.state.found.artist + '-' + this.state.found.name)} class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                      {this.state.found.artist}-{this.state.found.name}
                    </button>
                  </div>
                </div> : <></>}

                <div class="card mb-4">
                  <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    Featured Song List
                  </div>
                  <div class="list-group list-group-flush">
                    {Array.from(this.state.data).map((value, index) =>
                      <button type="button" onClick={() => this.song(value)} class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                        {value}
                        <button class="btn btn-outline-primary" onClick={this.deleteSong}><i class="fas fa-trash"></i> <span class="badge bg-primary rounded-pill">{index + 1}</span></button>
                      </button>)}
                  </div>

                </div>
                <div class="card mb-4">
                  <div class="card-header">
                    <i class="fas fa-music me-1"> </i>
                    Current song <span type="button" class="badge bg-primary rounded-pill">Sync</span>
                  </div>
                  <div class="list-group list-group-flush">
                    <div class="row">
                      <div class="col-xl-4 col-md-6">
                        <div class="accordion mx-4 my-4" id="accordionFlushExample">
                          <div class="accordion-item">
                            <h4 class="form-label mx-3 my-2" id="flush-headingOne">
                              Selected Song Artist: {this.state.artista}
                            </h4>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Artist aliases
                              </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                                <ul class="list-group">
                                  {this.state.wiki.aliases ? Array.from(this.state.wiki.aliases).map((value, index) => <li class="list-group-item">{value}</li>) : <h4>Please select an Song</h4>}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Artist Begin
                              </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                                <ul class="list-group">
                                  <li class="list-group-item">Area: {this.state.wiki.begin_area}</li>
                                  <li class="list-group-item">Time: {this.state.wiki.begin_life}</li>
                                  <li class="list-group-item">Country: {this.state.wiki.country}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Artist End
                              </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                                <ul class="list-group">
                                  <li class="list-group-item">Area: {this.state.wiki.end_area}</li>
                                  <li class="list-group-item">Time: {this.state.wiki.end_life}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingFour">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                Artist Personal and Music Information
                              </button>
                            </h2>
                            <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                              <ul class="list-group">
                              <li class="list-group-item">Gender: {this.state.wiki.gender}</li>
                              {this.state.wiki.aliases?Array.from(this.state.wiki.genres).map((value, index) =><li class="list-group-item">Genre: {value}</li>):<h4>Please select an Song</h4>}
                              
                                  </ul>
                                </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div class="col-xl-4 col-md-6">
                        <div className="lyrics">
                          <div id="cdg"></div>
                          <p>
                            <button id="stopbtn" class='btn btn-outline-primary'>Stop</button>
                            <button id="stopbtn" onClick={this.loadKaraoke} class='btn btn-outline-primary'>Analyze</button>

                          </p>

                        </div>
                      </div>
                      <div class="col-xl-4 col-md-6">
                        <div class="card bg-danger text-white mx-4 my-4">
                          <div class="card-body">Score!</div>
                          <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link">Accuracy: </a>
                            <div class="small text-white"> {this.avg * 100} %</div>
                          </div>
                        </div>
                      </div>
                      <div className="lyrics">
                        <div id="cdg"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
              <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                  <div class="text-muted">Copyright &copy; YenUS 2021</div>

                </div>
              </div>
            </footer>
          </div>


          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add a New Song</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div class="modal-body">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">Song Name</span>
                      <input type="text" value={this.state.valueName} onChange={this.handleChangeName} class="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">Song Artist</span>
                      <input type="text" value={this.state.valueArtist} onChange={this.handleChangeArtist} class="form-control" placeholder="Artist" aria-label="Artist" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">Song Album</span>
                      <input type="text" value={this.state.valueAlbum} onChange={this.handleChangeAlbum} class="form-control" placeholder="Album" aria-label="Album" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Lyrics</span>
                      <textarea class="form-control" value={this.state.valueLyrics} onChange={this.handleChangeLyrics} aria-label="Your song lyrics"></textarea>
                    </div>
                    <div class="input-group mb-3">
                      <label class="input-group-text" for="inputGroupFile01">Upload Song File</label>
                      <input type="file" onChange={this.onFileChange} class="form-control" id="inputGroupFile01" />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button class="btn btn-success" type="submit" value="Submit">Save New Song</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
        <script type="text/javascript" src="dist/jszip-utils.js"></script>
        <script type="text/javascript" src="my/assets/jszip.min.js"></script>
        <script type="text/javascript" src="my/assets/jszip-utils.min.js"></script>
        <script type="text/javascript" src="my/assets/jsmediatags.min.js"></script>
      </body>

    )
  }
}