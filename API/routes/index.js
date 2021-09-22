
const express = require('express');
const S3 = require('aws-sdk/clients/s3');
const fs  = require("fs");
const path = require("path");
const cors = require('cors');
const multer = require('multer');
const upload = multer( {dest : 'uploads/'})
var app = express.Router();
app.use(express.json());
app.use(cors());
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const pathdelete = ('./uploads')

const { Song } = require('./song/Song.js');

const  genkey = require('./song/generatekey.js');
const genname = require('./song/generatename.js');
//const { User } = require('./users/User.js');

const songs = []; // esta es la lista del parqueo
app.use(express.json());

const bucketName = "songs-spectacular-karaoke";
const bucketRegion = "us-east-2";
const bucketKey = "AKIA2DEKJIXU3Y6OUQN5";
const bucketSecretKey = "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";


const p1 = 'Avicii_TheNights.mp3';
const p2 = 'RicardoArjona_Minutos.mp3';
const p3 = 'Tupac_Changes.mp3';

songs.push(new Song(p1, 'The nights', 'avicii', 'asd', 'asda', genname.generatename(p1)));
songs.push(new Song(p3, 'changes', 'tupac', 'asadd','asdasda' ,genname.generatename(p3)));
songs.push(new Song(p2, 'minutos', 'ricardo arjona', 'adasd', 'assda',genname.generatename(p2)));



const s3 = new S3({
  region : "us-east-2",
  accessKeyId : "AKIA2DEKJIXU3Y6OUQN5",
  secretAccessKey : "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"

});


 // lista usuarios 
//var useractual = new User('', '', '', '', '', '', Boolean(false));


app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");   
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");   
    if (req.method==='GET' || req.method==='DELETE' || req.method === 'POST'){
        next();  
    }   
});


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

//Devuelve toda la información del bucket
app.get('/songs', async(req, res) => {
    try {
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
        await s3.listObjects(downloadParams, function (error, data) {
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
 

app.get('/songs/new/', async(req, res) => {
    try {
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
        await s3.listObjects(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            var listbucket = [];
            console.log(data.Contents.length);
            data.Contents.forEach(function(song){
                var name = genname.generatename(song.Key);
                listbucket.push(name);
                
            });
    
            console.log(listbucket);
            console.log(songs);
            res.send(listbucket);
    
        });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    } 
    
});
 
app.get('/songs', (req, res) => {
    try {
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
         s3.listObjects(downloadParams, function (error, data) {
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
 

app.get('/songs/allinfo/', async(req, res) => {
    try {
        if (songs.length === 0) return res.status(404).json({ error: 'No se han creado canciones' });
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
        var listbucket = [];
        await s3.listObjects(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            listbucket = data.Contents; 
        }).promise();
         
        console.log(listbucket);
        var listbucketid = [];
        listbucket.forEach(function(song){
            for (let i = 0; i < songs.length;i++){
                console.log(songs[i]);
                console.log(song.Key);
                console.log(songs[i].id);
                if(songs[i].id === song.Key){
                    listbucketid.push(song);
                }
            }    

        });
        res.send(listbucketid);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    } 


      
});

app.get('/songs/new/', (req, res) => {
    const downloadParams = {
        Bucket: 'songs-spectacular-karaoke'
    }
    s3.listObjects(downloadParams, function (error, data) {
        if (error) {
            console.error(error);
            res.status(500).send();
        }
        var listbucket = [];
        await s3.listObjects(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            listbucket = data.Contents; 
        }).promise();
         
        console.log(listbucket);
        var listbucketid = [];
        listbucket.forEach(function(song){
            for (let i = 0; i < songs.length;i++){
                console.log(songs[i]);
                console.log(song.Key);
                console.log(songs[i].id);
                if(songs[i].id === song.Key){
                    listbucketid.push(song);
                }
            }    

        });
        res.send(listbucketid);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    } 


      
});

app.get('/songs/new/:namekey', (req, res) => {
    try {
        var namekey = req.params.namekey;
        console.log(songs);

        for (const key in songs) {
            console.log(key, songs[key].namekey);
            if(songs[key].namekey == namekey) {
                namekey = songs[key].id
            }               
        }

        console.log(namekey);
        
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke',
            Key : namekey
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



//Devuelve la metadata dada una key
//key : key del bucket (Artista_CancionSinEspacios.mp3)
app.get("/songs/key/:key",  (req, res) => {    

    try {
        const key = req.params.key;
        
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

//Devuelve la canción dado un fragmento de su letra
//lyrics : Fragmento de la letra
app.get("/songs/byLyrics", async(req, res)=>{

    try{
        if (songs.length === 0) return res.status(404).json({ error: 'No se han creado canciones' });
        const filters = req.query.lyrics;
        const filteredSongs = songs.filter(song => song.lyrics.includes(filters));

        let currentsSongsId = [];
        for(let i = 0; i<filteredSongs.length; i++){
            currentsSongsId.push(filteredSongs[i].id);
        }

        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
        var listbucket = [];
        await s3.listObjects(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            listbucket = data.Contents; 
        }).promise();
         
        console.log(listbucket);
        var listbucketid = [];
        
        console.log(currentsSongsId.length);
        listbucket.forEach(function(song){
            for (let i = 0; i < currentsSongsId.length;i++){
                console.log(currentsSongsId[i]);
                console.log(song.Key);
                if(currentsSongsId[i] === song.Key){
                    console.log('entre');
                    listbucketid.push(song);
                }
            }    
        });
        console.log(listbucketid);
        res.send(listbucketid);

    }catch(error){
        res.status(500).send();
    }

});

//Devuelve la canción dado un parámetro (menos el fragmento de la canción)
//artist : Nombre del artista
//name : Nombre de la canción
//album : Nombre del album
app.get("/songs/by/",  async(req, res) => {    

    try {
        //Cambiar songs por lo que se ocupe
        console.log(songs);
        if (songs.length === 0) return res.status(404).json({ error: 'No se han creado canciones' });
        
        const filters = req.query;


        console.log(filters);
        const filteredUsers = songs.filter(user => {
            let isValid = true;
            for (const key in filters) {
                console.log(key, user[key], filters[key]);
                isValid = isValid && user[key].toLowerCase() == filters[key].toString().toLocaleLowerCase();
            }
            return isValid;
        });
        let currentsSongsid = [];

        for (let i = 0; i < filteredUsers.length; i++){

            currentsSongsid.push(filteredUsers[i].id);
        }
        console.log(currentsSongsid);
    

        //const key = filteredUsers[0].id; //falta cambiar aqui
        //console.log(idsongs);
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
        var listbucket = [];
        await s3.listObjects(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
        
            listbucket = data.Contents;
            //console.log(lisbucekt);
            //res.send(data);

       
        }).promise();
         
        var listbucketid = [];
        
            console.log(currentsSongsid.length);
            listbucket.forEach(function(song){
                for (let i = 0; i < currentsSongsid.length;i++){
                    console.log(currentsSongsid[i]);
                    console.log(song.Key);
                    if(currentsSongsid[i] === song.Key){
                        console.log('entre');
                        listbucketid.push(song);
                    }
                }
                
            });
        
        
        console.log(listbucketid);
        res.send(listbucketid);
        //
       
    
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
    
});

//Borra una canción dado un arista y nombre de canción
//artist : Nombre del artista
//name : Nombre de la canción
app.delete("/songs/:name/:artist",  async(req, res) => {    

    try {
        //create key from user/project/section IDs
        const name = req.params.name;
        const artist = req.params.artist;
        let keys = [];
        keys = genkey.generatekey(req.query.name, req.query.artist);

        const key = `${keys[0]}_${keys[1]}.mp3`;
        //const key = `${name}.mp3`;
  
  
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

//Agrega una nueva canción (y el archivo de la canción)
//artist : Nombre del artista
//name : Nombre de la canción
//lyrics : Letra de la canción
//album : Nombre del album
app.post("/songs/",  upload.single('audio', 12), async (req, res) => {
    try {
        if (!req.query.name || !req.query.artist || !req.query.album || !req.query.lyrics) return res.status(404).json({error:'Por favor agregar los detalles faltantes'});
        const audioFile = req.file;
        
        
        //create object key
        //const key = 'Avicii_TheNights.mp3';
        
        let keys = [];
        keys = genkey.generatekey(req.query.name, req.query.artist);

        const key = `${keys[0]}_${keys[1]}.mp3`;
        console.log(key);
        var songCompare = new Song(key, req.query.name, req.query.artist, req.query.album, req.query.lyrics, genname.generatename(key));
        songs.push(songCompare);

        
        const fileStream = fs.createReadStream(audioFile.path)
  
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: key,
            ContentType: "audio/mp3" 
        }
  
        const result = await s3.upload(uploadParams).promise();
        

        res.send(result);

        //await unlinkAsync(pathdelete);
  
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


module.exports = app;
