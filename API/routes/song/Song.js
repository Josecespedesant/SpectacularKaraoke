
class Song {
  constructor(id,name, artist, album, lyrics) {
    this.id = id
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.lyrics = lyrics;
  }
}

module.exports.Song = Song;