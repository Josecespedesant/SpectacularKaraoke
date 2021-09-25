import React, { Component } from 'react';

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

class Lyrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lyrics: null,
      lyricsArray: null,
      currentWord: 0,
      timer: null,
      finished: true,
    }
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

  componentDidMount() {
    this.playLyrics();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentWord <= nextState.lyricsArray.length
  }

  componentWillUnmount() {
    this.stopTimer();
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
    console.log()
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
      <div className="lyrics">
        <pre>
          { this.renderHighlightedLyrics() } { this.renderRemainingLyrics() }
        </pre>
        
      </div>
    );
  }
}

Lyrics.defaultProps = {
  speed: 250,
}

export default Lyrics;
