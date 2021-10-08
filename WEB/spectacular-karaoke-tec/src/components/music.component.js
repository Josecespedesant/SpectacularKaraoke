import React, { Component } from "react";

function lyricsToArray(lyrics) {
  if (lyrics) {
    const lines = lyrics.split('\n');
    const words = lines.reduce((words, line) => {
      words = words.concat(line.split(' '))
      words.push('\n');
      return words;
    }, []);
    return words;
  }
  return [];
}

export default class Music extends Component {
    constructor(){
        super();
        this.state = {
          lyrics: null,
          lyricsArray: null,
          currentWord: 0,
          timer: null,
          finished: true,
          play: false
        }
        this.urlm=''
        this.audio = new Audio()
    }

    static getDerivedStateFromProps(props, state) {
      if (props.lyrics !== state.lyrics) {
        return {
          ...state,
          lyrics: props.lyrics,
          lyricsArray: lyricsToArray(props.lyrics),
          currentWord: 0,
          finished: !props.lyrics,
        }
      }
      return null;
    }
    componentWillMount() {
      this.audio = new Audio(this.props.url)
      this.audio.addEventListener('ended', () => this.play= false );
    }

    componentWillUnmount() {
      this.stopTimer();
      this.audio.removeEventListener('ended', () => this.play= false );  
    }

    componentDidUpdate(prevProps) {
      if (prevProps.url !== this.props.url) {
        this.audio.pause()
        this.audio.removeEventListener('ended', () => this.play= false ); 
        this.audio = new Audio(this.props.url)
        this.audio.addEventListener('ended', () => this.play= false );
        this.play ?  this.togglePlay() : this.nextWord() ;
        

        this.setState({
          lyrics:this.props.lyric,
          lyricsArray: lyricsToArray(this.props.lyric),
          currentWord: 0,
          finished: !this.props.lyric})
        
      }
    }
  
    togglePlay = () => {
      this.play= !this.play;
      this.play ? this.audio.play() : this.audio.pause();
      this.play ? this.playLyrics() : this.stopLyrics();
    }

    playLyrics = () => {
      this.setState({
        timer: setInterval(this.nextWord, this.props.speed),
      });
    }
  
    stopTimer = () => {
      if (this.state.timer) {
        this.setState({
          timer: clearInterval(this.state.timer),
        });
      }
    }
  
    stopLyrics = () => {
      this.stopTimer();
      this.setState({
        timer: null,
      });
      
    }

    nextWord = () => {
      if (this.state.currentWord <= this.state.lyricsArray.length) {
        this.setState(prevState => {
          return { currentWord: prevState.currentWord + 1 }
        })
      } else if (!this.state.finished) {
        this.setState({ finished: true }, () => {
          !!this.props.onFinish && this.props.onFinish();
        })
      }
    }
  
    renderHighlightedLyrics = () => {
      const { lyricsArray, currentWord } = this.state;
      if (currentWord === 0) {
        return null;
      }
      if (currentWord<60){
        return <span class="fw-bolder text-primary"> {lyricsArray.slice(0, currentWord).join(' ')}</span>
      }else{
  
        return <><span class="fw-bolder text-white"> {lyricsArray.slice(currentWord-60, currentWord-40).join(' ')}</span> <span class="fw-bolder text-primary"> {lyricsArray.slice(currentWord-40, currentWord).join(' ')}</span></>
      }
      
    }
  
    renderRemainingLyrics = () => {
      const { lyricsArray, currentWord } = this.state;
      return <span className="fw-lighter">{lyricsArray.slice(currentWord,currentWord+40).join(' ')}</span>
    }
  
    render() {
      return (
        <>
        <div class="card-header">
        <i class="fas fa-music me-1"> </i>
          Current song <span type="button" class="badge bg-primary rounded-pill">Sync</span>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style={{width: 400}} aria-valuenow="00" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <button class="list-group-item d-flex justify-content-center align-items-start" onClick={this.togglePlay}> {this.play ? 'Pause ⏸︎' :'Play ▶' } </button>
          <div class="list-group list-group-flush">
          <div className="lyrics">
        <pre>
          { this.renderHighlightedLyrics() } { this.renderRemainingLyrics() }
        </pre>
        
      </div>
        </div>
        </>
      );
    }
  }

  Music.defaultProps = {
    speed: 300,
  }