import React, { Component } from "react";
import { KaraokeClient } from '../client/KaraokeClient';
import Music from './music.component'

export default class Player extends Component {
  KaraokeClient = new KaraokeClient();

  constructor() {
    super();
    this.state = {
      data: 'a',
      urla: '',
      lyrics: `Please select a song to show your lyrics here!`,
      found: '',
      foundDis: false,
      valueName:'',
      valueArtist:'',
      valueAlbum:'',
      valueLyrics:'',
      selectedFile: null
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeArtist = this.handleChangeArtist.bind(this);
    this.handleChangeAlbum = this.handleChangeAlbum.bind(this);
    this.handleChangeLyrics = this.handleChangeLyrics.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadDataSongs();
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

  async loadSong(name) {
    const newURL = await this.KaraokeClient.getSong(name);
    this.setState({
      urla: newURL.key,
      lyrics: newURL.lyrics
    });
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
    await this.KaraokeClient.newSong(this.state.selectedFile,this.state.valueName,this.state.valueArtist,this.state.valueAlbum,this.state.valueLyrics);
    //this.setState({
    //  data: newData
    //});
    console.log(this.state.valueName,this.state.valueArtist,this.state.valueArtist,this.state.valueLyrics,this.state.selectedFile)
    event.preventDefault();
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
                        <span class="badge bg-primary rounded-pill">{index + 1}</span>
                      </button>)}
                  </div>
                </div>
                <Music url={this.state.urla} lyrics={this.state.lyrics}></Music>
                <div class="row">
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-primary text-white mb-4">
                      <div class="card-body">Featured Song 1</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link">View Details</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-warning text-white mb-4">
                      <div class="card-body">Featured Song 2</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link">View Details</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-success text-white mb-4">
                      <div class="card-body">Featured Song 3</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link">View Details</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-md-6">
                    <div class="card bg-danger text-white mb-4">
                      <div class="card-body">Featured Song 4</div>
                      <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="small text-white stretched-link">View Details</a>
                        <div class="small text-white"><i class="fas fa-angle-right"></i></div>
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
      </body>

    )
  }
}