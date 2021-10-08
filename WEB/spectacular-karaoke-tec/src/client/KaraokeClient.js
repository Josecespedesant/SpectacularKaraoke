
export class KaraokeClient {

    async getSongsData() {
        const rawResponse = await fetch("http://localhost:3001/songs/new");
        const parsedResponse = await rawResponse.json();
        console.log(parsedResponse.value)
        return parsedResponse.value;
    }

    async getSong(name) {
        const rawResponse = await fetch('http://localhost:3001/songs/new/'+name);
        const parsedResponse = await rawResponse.json();
        console.log(parsedResponse)
        return parsedResponse;
}
}