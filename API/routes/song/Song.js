
var count = 0;
class Song {
  constructor(name, artist, album, lyrics, genre, premium) {
    this.id = count+ 1;
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.lyrics = lyrics;
    this.genre = genre;
    this.premium = premium;
    count++;
  }
}

module.exports.Song = Song;