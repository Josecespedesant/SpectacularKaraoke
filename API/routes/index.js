//const Space = require('./Space.js') ;
var express = require('express');

const S3 = require('aws-sdk/clients/s3');
const fs  = require("fs");
const path = require("path");
const cors = require('cors');
const multer = require('multer');
const upload = multer( {dest : 'uploads/'})
var app = express.Router();
app.use(express.json());
app.use(cors());


/*
const { Space } = require('./Parking/parking.js');
const { Reservation } = require('./Parking/parking.js');
*/

const { Song } = require('./song/Song.js');
const { User } = require('./users/User.js');

app.use(express.json());

const bucketName = "songs-spectacular-karaoke";
const bucketRegion = "us-east-2";
const bucketKey = "AKIA2DEKJIXU3Y6OUQN5";
const bucketSecretKey = "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";


const s3 = new S3({
  region : "us-east-2",
  accessKeyId : "AKIA2DEKJIXU3Y6OUQN5",
  secretAccessKey : "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"

});


/*
const parking = []; // esta es la lista del parqueo
const reservations = []; // lista de los carros en el parqueo
*/

const songs = []; // esta es la lista del parqueo
const users = []; // lista usuarios 
var useractual = new User('', '', '', '', '', '', Boolean(false));

/*
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
*/
/*

app.get('/autentication/:email/:password', (req, res) => {
    if (users.length === 0) return res.status(404).json({ error: 'No se han creado usuarios' });
    s
    // Esto seria si cuando crea usuarios envia la informacion a lista de usuarios
    const user = users.find(c => c.email === req.params.email && c.password === req.params.password) ; // CAMBIAR A BUSCAR EN MSQL
    if (!user) return res.status(404).json({ error: 'No existe un usuario con ese email o contraseña'});

                    //En vez de user.email usar req.query.info de usuario
    //Object.assign(useractual, {email: user.email, birthdate: user.birthdate, firstName: user.firstName, lastName: user.lastName, gender: user.gender, password: user.password, isPremium:user.isPremium});
    //return res.json(usernew);
    return res.json("Logueo exitoso")

});
*/

app.get("/songs/:name",  async(req, res) => {    

    try {
        const name = req.params.name;
        const key = `${name}.mp3`;
        
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke',
            Key : key
        }
  
        s3.getObject(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            res.send(data);
        });
  
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
    
});


app.delete("/songs/:name",  async(req, res) => {    

    try {
        //create key from user/project/section IDs
        const name = req.params.name;
        const key = `${name}.mp3`;
  
  
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke',
            Key : key
        }
  
        s3.deleteObject(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            res.send('cancion eliminada');
        });
  
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
    
});

app.post("/songs/:name",  upload.single('audio', 12), async (req, res) => {

    try {
        const audioFile = req.file;
        
        //create object key
        //const key = 'Avicii+The+Nights.mp3';
        const name = req.params.name;
        const key = `${name}.mp3`;
        const fileStream = fs.createReadStream(audioFile.path)
  
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: key,
            ContentType: "audio/mp3" 
        }
  
        const result = await s3.upload(uploadParams).promise();
        
        res.send(result);
  
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

/*
app.get('/songs', (req, res) => {
    //no me funca el getsongs
    if (songs.length === 0) return res.status(404).json({ error: 'No se han creado canciones' });
    const dms = songs.length;
    console.log(dms);
    let spacetemp = [];
    
    const artist = req.query.artist;
    const album = req.query.album;
    const genre = req.query.genre;

    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = songs.slice(startIndex, endIndex);
    console.log('1');
    console.log(result);
    console.log('req');
    console.log(req.query.artist);
    if (req.query.artist === artist) {
        console.log('entre');
        for (let i = 0; i < dms; i++) {
            console.log('artist songs')
            console.log(songs[i].artist);
            if (songs[i].artist === artist) {
                
                spacetemp.push(songs[i]);  
                console.log('2');
                console.log(spacetemp);      
            }
            
        
        }
        console.log('nada');
        return res.json(spacetemp);
    } else if (req.query.album === album) {
        for (let i = 0; i < dms; i++) {
            if (songs[i].album === album) {
            spacetemp.push(songs[i]);
            console.log('3'); 
            console.log(spacetemp);       
            }
            
        
        }
        console.log('4');
        console.log(spacetemp);
        return res.json(spacetemp);
    }
    else if (req.query.genre === genre) {
        for (let i = 0; i < dms; i++) {
            if (songs[i].genre === genre) {
            spacetemp.push(songs[i]);
            console.log('5');
            console.log(spacetemp);        
            }
            
        
        }
        return res.json(spacetemp);
    } else if (page != 0) {
        console.log('6');
        console.log(result);
        return res.json(result);
        
    } 
    console.log('7');
    console.log(result);
    return res.json(songs);


});




app.get('/songs/:id', (req, res) => {
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ error: 'No existe una cancion con ese id' });
    return res.json(song);

});


app.post('/songs/', (req, res) => {
    if (!req.query.name || !req.query.artist || !req.query.album || !req.query.lyrics || !req.query.genre) return res.status(404).json({error:'Por favor agregar los detalles faltantes'});
    if(!useractual.isPremium) return res.status(404).json({ error: 'El usuario no es premium' });
    var newSong = new Song(req.query.name, req.query.artist, req.query.album, req.query.lyrics, req.query.genre);
    songs.push(newSong);
    return res.json(songs); // Cambiar a mensaje de ok
    //res.status(200).json("El espacio se actualizo correctamente");
});
/*
app.post('/users/', (req, res) => {
    if (!req.query.email || !req.query.birthdate || !req.query.firstName || !req.query.lastName || !req.query.gender || !req.query.password || !req.query.isPremium  ) return res.status(404).json({error:'Por favor agregar los detalles faltantes'});
    var newUser = new User(req.query.email, req.query.birthdate, req.query.firstName, req.query.lastName, req.query.gender, req.query.password, Boolean(req.query.isPremium));
    users.push(newUser);
    return res.json(users); // Cambiar a mensaje de ok
    //res.status(200).json("El usuario se actualizo correctamente");
});

app.put('/songs/:id', (req, res) => {
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ error: 'No existe un campo con ese ID' });
    if(!useractual.isPremium) return res.status(404).json({ error: 'El usuario no es premium' });
    // SE ELIMINA SI NO VIENE CUIDADO
    song.name = req.query.name;
    song.artist = req.query.artist;
    song.album = req.query.album;
    song.lyrics = req.query.lyrics;
    song.genre = req.query.genre;
  
    
    res.json(songs);
    //res.status(200).json("El espacio se actualizo correctamente");
            
    
});


app.delete('/songs/:id', (req, res) => {
    const song = songs.find(p => p.id === parseInt(req.params.id));
    if (!song) return res.status(404).json({ error: 'No existe campo con ese ID' });
    if(!useractual.isPremium) return res.status(404).json({ error: 'El usuario no es premium' });

    const index = songs.indexOf(song);
    songs.splice(index, 1);
    res.status(200).json('Se elimino el espacio correctamente'); 
    //res.json(parking);
});

*/

module.exports = app;

