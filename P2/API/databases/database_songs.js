const { MongoClient } =require( 'mongodb');
const mongoose =require('mongoose');

class database_songs {
    
    constructor() {
      this.url = "mongodb+srv://karaokeuser:fckASzdYBeNx19FI@cluster0.pmiw9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
      this.client = new MongoClient(this.url);
      this.dbName = 'Karaoke_songs';
    }

    async connectDB() {
        await this.client.connect();
        const databasesList = await this.client.db().admin().listDatabases();
    }

    async getDbData() {
        const db = this.client.db(this.dbName);
        const collection = db.collection('songs');        
        const findResult = await collection.find({}).toArray();
        //console.log('Found documents =>', findResult);
        return findResult
    }
    

    async getUnaCancion(namekey) {
 
      const db = this.client.db(this.dbName);
      const collection = db.collection('songs');
  
      const findResult = await collection.find(
        {
          $and:
            [
              {"namekey": namekey}
            ]
        }).toArray();
        //console.log(findResult.length)
        if(findResult.length == 0){
          return findResult;
        }
        else{
          var keysong = 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/'+findResult[0].key;
          const out = {
            "key": keysong,
            "lyrics": findResult[0].lyrics,
            "name" : findResult[0].name,
            "artist": findResult[0].artist
          };
        
        return out
      }
    }

    /*
    async logInUser(user, pass){
      const db = this.client.db(this.dbName);
      const collection = db.collection('Users'); 
      const findResult = await collection.find(
        {
          $and:
            [
              {"usuario": user},
              {"Password": pass}
            ]
        }).toArray();
        //console.log(findResult.length)
        if(findResult.length == 0){
          return findResult
        }
        else{
          const out = {
            "NombreUsuario": findResult[0].NombreUsuario,
            "usuario": findResult[0].usuario,
            "TipoUsuario": findResult[0].TipoUsuario
          };
        
        return out
        }
    }
    */
    // Insertar nuevo documento
    async insertData(key, name,artist,album,lyrics,namekey) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('songs'); 
      const myobj = { 
        key :key,
        name: name,
        artist:artist,
        album: album,
        lyrics : lyrics,
        namekey :namekey
      };    
      await collection.insertOne(myobj);            
    }

    async getLetra(lyrics) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('songs'); 
      const findResult = await collection.find(
        {
          $and:
            [
              {"lyrics": {$regex: lyrics }}
            ]
        }).toArray();
        var keysong = 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/'+findResult[0].key;
        const out = {
          "key": keysong,
          "lyrics": findResult[0].lyrics,
          "name" : findResult[0].name,
          "artist": findResult[0].artist
        };
      return out;
    }

    /*
    async updateEditedSong(_id,URL,Album,Artista,NombreCancion,Letra) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('Canciones'); 
      const valor =  true;
      var myobj = { $set:{ 
        "URL": URL,
        "Album": Album,
        "Artista": Artista,
        "NombreCancion": NombreCancion,
        "Letra": Letra,
        "Status": "Active"    
      }};    
      await collection.updateOne({"_id":mongoose.Types.ObjectId(_id)},myobj);            
    }
    */
    async getSongsByFilter(dato,filtro) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('songs'); 
      let myObj;
      let busquedaPorLetra = false;
      
      switch (filtro) {
        case "name":
          myObj = {
            "name": dato
          }   
          break;
        case "artist":
          myObj = {
            "artist": dato
          } 
          break;
        case "album":
          myObj = {
            "album": dato
          } 
          break;
        default: //Case Fragmento de la Letra
          myObj = {
            "lyrics" : {$regex: dato }
          } 
          busquedaPorLetra = true;
          break;
      }

      //let findResult;
      if (busquedaPorLetra){
        //console.log(myObj);
        var findResult = await collection.find(myObj).toArray(); 
        var keysong = 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/'+findResult[0].key;
        const out = {
          "key": keysong,
          "lyrics": findResult[0].lyrics,
          "name" : findResult[0].name,
          "artist": findResult[0].artist
        };
      return out;  
      }
      else{
        
        var findResult = await collection.find(myObj).toArray();
      
        var keysong = 'https://songs-spectacular-karaoke.s3.us-east-2.amazonaws.com/'+findResult[0].key;
        const out = {
          "key": keysong,
          "lyrics": findResult[0].lyrics,
          "name" : findResult[0].name,
          "artist": findResult[0].artist
        };
        return out;      
      } 
      
    }
    
    async deleteSongsById(namekey) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('songs'); 
      const myObj = 
      {
        "namekey": namekey
      }    
      await collection.deleteOne(myObj);

    }    
    
    async closeConnection() {
      this.client.close();
    }
  }

module.exports.database_songs = database_songs;