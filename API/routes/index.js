//const Space = require('./Space.js') ;
var express = require('express');
var app = express.Router();


/*
const { Space } = require('./Parking/parking.js');
const { Reservation } = require('./Parking/parking.js');
*/

const { Song } = require('./song/Song.js');



app.use(express.json());




/*
const parking = []; // esta es la lista del parqueo
const reservations = []; // lista de los carros en el parqueo
*/

const songs = []; // esta es la lista del parqueo


app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");   
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");   
    if (req.method==='GET' || req.method==='DELETE'){
        next();  
    }
    else if (req.get('Content-Type')=== 'application/json'){       
        next();   
    }else{       
        res.status(405).send(req.get('Content-Type'))   
    } 

});


app.get('/songs', (req, res) => {
    if (songs.length === 0) return res.status(404).json({ error: 'No se han creado espacios' });
    const dms = songs.length;
    let spacetemp = [];

    const artist = req.query.artist;
    const album = req.query.album;
    const genre = req.query.genre;

    const page = req.query.page;
    const limit = req.query.limit;
/*
    const name1 = req.query.name;
    const command = req.query.command;
    const value = req.query.value;
*/
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = songs.slice(startIndex, endIndex);


    if (req.query.artist === artist) {
        for (let i = 0; i < dms; i++) {
            if (songs[i].artist === artist) {
            spacetemp.push(songs[i]);        
            }
            
        
        }
        return res.json(spacetemp);
    } else if (req.query.album === album) {
        for (let i = 0; i < dms; i++) {
            if (songs[i].album === album) {
            spacetemp.push(songs[i]);        
            }
            
        
        }
        return res.json(spacetemp);
    }
    else if (req.query.genre === genre) {
        for (let i = 0; i < dms; i++) {
            if (songs[i].genre === genre) {
            spacetemp.push(songs[i]);        
            }
            
        
        }
        return res.json(spacetemp);
    } else if (page != 0) {

        return res.json(result);
    } 
    /*else if (command === 'eq' || command === 'lte' || command === 'gte') {
        
        if (command === 'eq'){
            var resultF = parking.filter(function(park){
                return park.id === value
            })
        }else if (command === 'lte'){
            var resultF = parking.filter(function(park){
                return park.id < value
            })
        }else {
            var resultF = parking.filter(function(park){
                return park.id > value
            })
        }
        
        return res.json(resultF);
    }*/
    

    return res.json(songs);


});

/*
app.get('/spaces/state', (req, res) => {
    if (parking.length === 0) return res.status(404).json({ error: 'No hay vehiculos' });
    const tempList = [];
    const dms = parking.length;
    for (let i = 0; i < dms;i++ ) {
        tempList.push(parking[i].state);    
        
    }
    return res.json(tempList);


});
*/

app.get('/spaces/:id', (req, res) => {
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ error: 'No existe un campo con ese id' });
    return res.json(song);

});


app.post('/songs/', (req, res) => {
    if (!req.query.name || !req.query.artist || !req.query.album || !req.query.lyrics || !req.query.genre) return res.status(404).json({error:'Por favor agregar los detalles faltantes'});
    var newSong = new Song(req.query.name, req.query.artist, req.query.album, req.query.lyrics, req.query.genre);
    songs.push(newSong);
    //return res.json(parking); // Cambiar a mensaje de ok
    res.status(200).json("El espacio se actualizo correctamente");
});

app.put('/spaces/:id', (req, res) => {
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ error: 'No existe un campo con ese ID' });
    song.name = req.query.name;
    song.artist = req.query.artist;
    song.album = req.query.album;
    song.lyrics = req.query.lyrics;
    song.genre = req.query.genre;
  
    
    //res.json(parking);
    res.status(200).json("El espacio se actualizo correctamente");
            
    
});


app.delete('/spaces/:id', (req, res) => {
    const song = songs.find(p => p.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ error: 'No existe campo con ese ID' });

    const index = songs.indexOf(song);
    songs.splice(index, 1);
    res.status(200).json('Se elimino el espacio correctamente'); 
    //res.json(parking);
});


module.exports = app;
