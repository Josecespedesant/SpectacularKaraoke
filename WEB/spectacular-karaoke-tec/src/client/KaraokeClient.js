export class KaraokeClient {

    async getSongsData() {
        const rawResponse = await fetch("http://localhost:3001/songs");
        const parsedResponse = await rawResponse.json();
        console.log(parsedResponse.Contents)
        return parsedResponse.Contents;
    }

    async getSongsData2() {
        const rawResponse = await fetch("http://localhost:3001/songs");
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }
}