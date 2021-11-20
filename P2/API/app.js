import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import {path} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { database_songs } from './databases/database_songs.js';
import {genname} from './utils/generatename.js'
import {genkey} from './utils/generatekey.js'
//import {indexRouter} from './routes/index.js';
import AWS from 'aws-sdk';
import multer from 'multer';
import fs from "fs";
const upload = multer( {dest : 'uploads/'});

const app = express();
const bucketName = "songs-spectacular-karaoke";

app.use(cors());
app.use(bodyParser.json());
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*
app.use(express.static(path.join(__dirname, 'public')));
*/

/*
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

const db_song = new database_songs();

const s3 = new AWS.S3({
  region : "us-east-2",
  accessKeyId : "AKIA2DEKJIXU3Y6OUQN5",
  secretAccessKey : "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"

});
//const s3 = new BucketConection();

app.listen(3000, () => console.log("Listening on port 3000"));


app.all('/*', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin","*");   
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");   
  if (req.method==='GET' || req.method==='DELETE' || req.method === 'POST' || req.method === 'PUT'){
    await db_song.connectDB();
    next();  
  }   
});
/////////////////////////////////////////////////////////////////////
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
              var name = genname(song.Key);
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


//////////////////////////////////////////////////////////////////////////
app.get('/songs/allinfo/', async(req, res) => {
  try {
      const songs = await db_song.getDbData();
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
      const sendlist = []
          for(let i = 0; i<listbucket.length; i++){
              
            for (const key in songs) {
          
              if(songs[key].key === listbucket[i].Key) {
               
                sendlist.push(songs[key].namekey)
                break;
              }               
            }
          }
      res.send(sendlist);
  } catch (error) {
      console.error(error);
      res.status(500).send();
  } 


    
});


app.get('/songs/new/:namekey', async(req, res) => {
  try {
      //var key = req.params.namekey;
      const song = await db_song.getUnaCancion(req.params.namekey);
  
      res.send(song);
  } catch (error) {
      console.error(error);
      res.status(500).send();
  } 
  
});

//Devuelve la canción dado un fragmento de su letra
//lyrics : Fragmento de la letra
app.get("/songs/byLyrics", async(req, res)=>{

  try{
      const song = await db_song.getLetra(req.query.lyrics);
      console.log(song);
    
      console.log(song);
      res.send(song);

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
    
      
      const filters = req.query;
      //
      for(var i in filters){
        var data = filters[i];
        var filter = i;
      }
     
      const song = await db_song.getSongsByFilter(data, filter);
      console.log(song);
      
      res.send(song);
      

  } catch (error) {
      console.error(error);
      res.status(500).send();
  }
  
});

app.delete("/songs/:namekey",  async(req, res) => {    

  try {
      //create key from user/project/section IDs
      const namekey = req.params.namekey;
      
      const songs = await db_song.getUnaCancion(namekey);
      //console.log(songs.name);
      await db_song.deleteSongsById(namekey);
      let keys = [];
      keys = genkey(songs.name, songs.artist);

      const key = `${keys[0]}_${keys[1]}.mp3`;
      
    
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
          
          res.send('cancion eliminada');
      });



          
  } catch (error) {
      console.error(error);
      res.status(500).send();
  }
  
});

app.post("/songs/",  upload.single('audio', 12), async (req, res) => {
  try {
      if (!req.query.name || !req.query.artist || !req.query.album || !req.query.lyrics) return res.status(404).json({error:'Por favor agregar los detalles faltantes'});
      
      
      const audioFile = req.file;
      console.log(audioFile);
      let keys = [];
      keys = genkey(req.query.name, req.query.artist);

      const key = `${keys[0]}_${keys[1]}.mp3`;
      const newkey =  genname(key);
      await db_song.insertData(key, req.query.name, req.query.artist, req.query.album, req.query.lyrics, newkey);
      
      
      
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



//////////////////////////////////// SON SE CANCIONES ////////////////////////////////////








