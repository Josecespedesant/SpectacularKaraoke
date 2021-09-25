
export class KaraokeClient {

    async getSongsData() {
        const rawResponse = await fetch("http://localhost:3001/songs");
        const parsedResponse = await rawResponse.json();
        console.log(parsedResponse.Contents)
        return parsedResponse.Contents;
    }

    async getSong(name) {
        const rawResponse = await fetch("http://localhost:3001/songs/new?namekey="+name);
        var blob = new Blob([rawResponse], {type: 'audio/mp3'});
        return blob
    }
}