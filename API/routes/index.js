
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
const initialConect = require('./song/conecBucket.js');
//const { User } = require('./users/User.js');

var songs = []; 
app.use(express.json());

const bucketName = "songs-spectacular-karaoke";


initialConect.fillSongs(songs);
const s3 = initialConect.initialConection();
console.log(songs);

songs.push(new Song(p1, 'The Nights', 'Avicii', 'The Days / Nights', 'Once upon a younger year\n When all our shadows disappeared\n The animals inside came out to play\n Went face to face with all our fears\n Learned our lessons through the tears\n Made memories we knew would never fade\n One day my father, he told me\n "Son, dont let it slip away"\n He took me in his arms, I heard him say\n "When you get older\n Your wild heart will live for younger days\n Think of me if ever youre afraid"\n He said: "One day youll leave this world behind\n So live a life you will remember"\n My father told me when I was just a child\n "These are the nights that never die"\n My father told me\n When thunder clouds start pouring down\n Light a fire they cant put out\n Carve your name into those shining stars\n He said: "Go venture far beyond the shores\n Dont forsake this life of yours\n Ill guide you home, no matter where you are"\n One day my father, he told me\n "Son, dont let it slip away"\n When I was just a kid, I heard him say\n "When you get older\n Your wild heart will live for younger days\n Think of me if ever youre afraid"\n He said: "One day youll leave this world behind\n So live a life you will remember"\n My father told me when I was just a child\n These are the nights that never die"\n My father told me\n "These are the nights that never die"\n My father told me\nMy father told me', genname.generatename(p1)));
songs.push(new Song(p3, 'Changes', 'Tupac', 'Greatest Hits','Come on, come on\n I see no changes, wake up in the morning, and I ask myself\n Is life worth living, should I blast myself?\n Im tired of bein poor, and even worse Im black\n My stomach hurts, so Im lookin for a purse to snatch\n Cops give a damn about a negro\n Pull the trigger, kill a nigga, hes a hero\n Give the crack to the kids who the hell cares\n One less hungry mouth on the welfare\n First, ship em dope and let em deal the brothers\n Give em guns, step back, watch em kill each other\n Its time to fight back, thats what Huey said\n Two shots in the dark, now Hueys dead\n I got love for my brother, but we can never go nowhere\n Unless we share with each other\n We gotta start makin changes\n Learn to see me as a brother instead of two distant strangers\n And thats how its supposed to be\n How can the devil take a brother, if hes close to me?\n Id love to go back to when we played as kids\n But things changed, and thats the way it is\n Come on, come on\n Thats just the way it is\n Things will never be the same\n Thats just the way it is\n Ooh, yeah\n Come on, come on\n Thats just the way it is\n Things will never be the same\n Thats just the way it is\n Aww, yeah\n I see no changes, all I see is racist faces\n Misplaced hate makes disgrace to races\n We under, I wonder what it takes to make this\n One better place, lets erase the wasted\n Take the evil out the people, theyll be acting right\n Cause mo black and white is smokin crack tonight\n And only time we chill is when we kill each other\n It takes skill to be real, time to heal each other\n And although it seems heaven sent\n We aint ready, to see a black President\n It aint a secret, dont conceal the fact\n The penitentiarys packed, and its filled with blacks\n But some things will never change\n Try to show another way but you stayin in the dope game\n Now tell me, whats a mother to do?\n Bein real dont appeal to the brother in you\n You gotta operate the easy way\n (I made a G today) But you made it in a sleazy way\n Sellin crack to the kid (I gotta get paid)\n Well, hey, well, thats the way it is\n Come on, come on\n Thats just the way it is\n Things will never be the same\n Thats just the way it is\n Aww, yeah\n Come on, come on\n Thats just the way it is\n Things will never be the same\n Thats just the way it is\n Aww, yeah\n We gotta make a change\n Its time for us as a people to start makin some changes\n Lets change the way we eat\n Lets change the way we live\n And lets change the way we treat each other\n You see, the old way wasnt working so its on us to do\n What we gotta do, to survive\n And still I see no changes, cant a brother get a little peace?\n Theres war in the streets and war in the Middle East\n Instead of war on poverty, they got a war on drugs\n So the police can bother me\n And I aint never did a crime, I aint have to do\n But now, Im back with the facts givin em back to yo\n Dont let em jack you up, back you up\n Crack you up and pimps smack you up\n You gotta learn to hold ya own\n They get jealous when they see ya, with ya mobile phone\n But tell the cops, they cant touch this\n I dont trust this, when they try to rush, I bust this\n Thats the sound of my tool, you say it aint cool?\n But mama didnt raise no fool\n And as long as I stay black, I gotta stay strapped\n And I never get to lay back\n Cause I always got to worry bout the pay backs\n Some buck that I roughed up way back\n Comin back after all these years\n Rat-a-tat, tat, tat, tat, thats the way it is\n Thats just the way it is\n Things will never be the same\n Thats just the way it is (Way it is)\n Aww, yeah\n Thats just the way it is\n Things will never be the same\n Thats just the way it is\n Aww, yeah \nSome things will never change' ,genname.generatename(p3)));
songs.push(new Song(p2, 'Minuntos', 'Ricardo Arjona', 'Santo Pecado', 'El reloj de pared\n Anunciando las 6:23\n El pasado con sed\n Y el presente es un atleta sin pies\n Y ya son las 6:43\nY el cadáver del minuto que paso\n Me dice así se vive aquí te guste o no\n Y la nostalgia pone casa en mi cabeza\n Y dan las 6 con 50\n Quien te dijo que yo\n Era el sueño que soñaste una vez\n Quien dijo que tu\n Voltearias mi futuro al revés\n Y ya son las 7:16\n Y el cadáver del minuto que paso\n Me dice tu estrategia te arruino\n No queda más que ir aprendiendo a vivir solo\n Si te quedan agallas\n La casa no es otra cosa\n Que un cementerio de historias\n Enterradas en fosas\n Que algunos llaman memorias\n Minutos\n Como sale la herida\n Se me pasa la vida\n Gastando el reloj\n Minutos\n Son la morgue del tiempo\n Cadáveres de momentos\n Que no vuelven jamás\n No hay reloj que de vuelta hacia atrás\n Como duele gastar\n El instante en el que tu ya no estas\n Como cuesta luchar\n Con las cosas que no vuelven más\n Ya son las 9:23\n Y el cadáver del minuto que paso\n Se burla de mis ganas de besar\n La foto que dejaste puesta en el buró\n Mi soledad es tu venganza\n El ministerio del tiempo\n Puso sede en mi almohada\n Ahí te encuentro a momentos\n Aunque no sirve de nada\n Minutos\n Como sale la herida\n Se me pasa la vida\n Gastando el reloj\n Minutos\n Son la morgue del tiempo\n Cadáveres de momentos\n Que no vuelven jamás\n No hay reloj que de vuelta hacia atrás\n Minutos que se burlan de mí\n Minutos como furia del mar\n Minutos pasajeros de un tren que no va a ningún lugar\n Minutos como lluvia de sal\n Minutos como fuego en la piel\n Minutos forasteros que vienen y se van sin decir\n Minutos que me duelen sin ti\n Minutos que no pagan pensión\n Minutos que al morir formarán el batallón del ayer\n Minutos que se roban la luz\n Minutos que me oxidan la fe\n Minutos inquilinos del tiempo mientras puedan durar\n Minutos que disfrutan morir\n Minutos que no tienen lugar\n Minutos que se estrellan en mi son Kamikaces de Dios\n',genname.generatename(p2)));





app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");   
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");   
    if (req.method==='GET' || req.method==='DELETE' || req.method === 'POST' || req.method === 'PUT'){
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
 

app.put('/songs/lyrics/:namekey', (req, res) => {
    try {
        if (songs.length === 0) return res.status(404).json({ error: 'No se han creado canciones' });
        var namekey = req.params.namekey;
   //     var lyricsSong = '';
        var newlyrics = req.query.lyrics;
        //console.log(songs);
        for (const key in songs) {
            //console.log(key, songs[key].namekey);
            //console.log(key, songs[key].lyrics);
            if(songs[key].namekey == namekey) {
                songs[key].lyrics = newlyrics;
 //               lyricsSong = songs[key];
            }               
        }
        res.send('Letra cambiada exitosamente');
        console.log(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    } 
    
});
 
app.get('/songs/new/', (req, res) => {
    try {
        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke'
        }
         s3.listObjects(downloadParams, function (error, data) {
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

            var jsonfile = {
                value: listbucket
            };
    
           // console.log(listbucket);
           // console.log(jsonfile);
            res.send(jsonfile);
    
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
         
       // console.log(listbucket);
        var listbucketid = [];
        listbucket.forEach(function(song){
            for (let i = 0; i < songs.length;i++){
             //   console.log(songs[i]);
              //  console.log(song.Key);
               // console.log(songs[i].id);
                if(songs[i].id === song.Key){
                    var data = {
                        name: songs[i].name,
                        artist: songs[i].artist,
                        album: songs[i].album,
                        lyrics: songs[i].lyrics
                    };
                    listbucketid.push(data);
                }
            }    

        });
        res.send(listbucketid);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    } 


      
});







/*
app.get('/songs/new/', async(req, res) => {
    try {

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

*/
app.get('/songs/new/:namekey', (req, res) => {
    try {
        var namekey = req.params.namekey;
        var lyricsSong = '';
        //console.log(songs);
        for (const key in songs) {
          //  console.log(key, songs[key].namekey);
           // console.log(key, songs[key].lyrics);
            if(songs[key].namekey == namekey) {
                namekey = songs[key].id;
                lyricsSong = songs[key].lyrics;
            }               
        }

       // console.log(namekey);
        var keysong = 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/'+namekey;
        var data = {
            key: keysong,
            lyrics: lyricsSong
        };

        res.send(data);
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
         
      //  console.log(listbucket);
        var listbucketid = [];
        
        //console.log(currentsSongsId.length);
        listbucket.forEach(function(song){
            for (let i = 0; i < currentsSongsId.length;i++){
        //        console.log(currentsSongsId[i]);
         //       console.log(song.Key);
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
        //console.log(songs);
        if (songs.length === 0) return res.status(404).json({ error: 'No se han creado canciones' });
        
        const filters = req.query;


        //console.log(filters);
        const filteredUsers = songs.filter(user => {
            let isValid = true;
            for (const key in filters) {
          //      console.log(key, user[key], filters[key]);
                isValid = isValid && user[key].toLowerCase() == filters[key].toString().toLocaleLowerCase();
            }
            return isValid;
        });
        let currentsSongsid = [];

        for (let i = 0; i < filteredUsers.length; i++){

            currentsSongsid.push(filteredUsers[i].id);
        }
      //  console.log(currentsSongsid);
    

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
        
         //   console.log(currentsSongsid.length);
            listbucket.forEach(function(song){
                for (let i = 0; i < currentsSongsid.length;i++){
                 //   console.log(currentsSongsid[i]);
               //     console.log(song.Key);
                    if(currentsSongsid[i] === song.Key){
             //           console.log('entre');
                        listbucketid.push(song);
                    }
                }
                
            });
        
        
       // console.log(listbucketid);
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
app.delete("/songs/:namekey",  async(req, res) => {    

    try {
        //create key from user/project/section IDs
        const namekey = req.params.namekey;
        console.log(songs);
        for (const i in songs) {
            if(songs[i].namekey == namekey) {
                var name = songs[i].name;
                var artist = songs[i].artist;
            }

                          
        }

    
       // console.log(songs);
       
   //     songs = dataRemoved;
       // console.log(artist);
       // console.log(name);
        let keys = [];
        keys = genkey.generatekey(name, artist);

        const key = `${keys[0]}_${keys[1]}.mp3`;
        
        //const key = `${name}.mp3`;
        console.log(key);


        const downloadParams = {
            Bucket: 'songs-spectacular-karaoke',
            Key : key
        }
  
        s3.deleteObject(downloadParams, function (error, data) {
            if (error) {
                console.error(error);
                res.status(500).send();
            }
            songs = songs.filter((el) => {
                return el.namekey !== namekey;
            });
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
        const newkey =  genname.generatename(key);
        var songCompare = new Song(key, req.query.name, req.query.artist, req.query.album, req.query.lyrics, newkey);
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
