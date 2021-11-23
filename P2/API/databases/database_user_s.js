const { MongoClient } =require( 'mongodb');
const mongoose =require('mongoose');

class database_user_s {
    
    constructor() {
      this.url = "mongodb+srv://karaokeuser:fckASzdYBeNx19FI@cluster0.pmiw9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
      this.client = new MongoClient(this.url);
      this.dbName = 'User_stats';
    }

    async connectDB() {
        await this.client.connect();
        const databasesList = await this.client.db().admin().listDatabases();
    }

    async getDbData() {
        const db = this.client.db(this.dbName);
        const collection = db.collection('stats_by_user');        
        const findResult = await collection.find({}).toArray();
        //console.log('Found documents =>', findResult);
        return findResult
    }
    

    async getInfoUser(name) {
 
      const db = this.client.db(this.dbName);
      const collection = db.collection('stats_by_user');
  
      const findResult = await collection.find(
        {
          $and:
            [
              {"name": name}
            ]
        }).toArray();
        //console.log(findResult.length)
        if(findResult.length == 0){
          return findResult;
        }
        else{
          const out = {
            "name": findResult[0].name,
            "n_songs": findResult[0].n_songs,
            "fav_artists": findResult[0].fav_artists,
            "e_words": findResult[0].e_words,
            "d_words": findResult[0].d_words 
          };
        
        return out
      }
    }

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

    // Insertar nuevo documento
    async insertUser(name) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('stats_by_user'); 
      var n_songs = 0;
      var fav_artists = [];
      var e_words = [];
      var d_words = [];
      const myobj = { 
        name: name,
        n_songs:n_songs,
        fav_artists: fav_artists,
        e_words : e_words,
        d_words : d_words
      };   
      await collection.insertOne(myobj);            
    }

    async add_n_songs(name) {
        const db = this.client.db(this.dbName);
        const collection = db.collection('stats_by_user'); 
        const findResult = await collection.find(
        {
            $and:
                [
                    {"name": name}
                ]
        }).toArray();
        var myobj = { $set:{ 
            "name": findResult[0].name,
            "n_songs": findResult[0].n_songs + 1,
            "fav_artists": findResult[0].fav_artists,
            "e_words": findResult[0].e_words,
            "d_words": findResult[0].d_words    
          }};    
          await collection.updateOne({"_id":mongoose.Types.ObjectId(findResult[0]._id)},myobj);            
    }
                 
      
    async addFavArtist(name, artistName) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('stats_by_user'); 
      const findResult = await collection.find(
      {
          $and:
              [
                  {"name": name}
              ]
      }).toArray();
      let arrayArtist = findResult[0].fav_artists;
      arrayArtist.push(artistName);
      var myobj = { $set:{ 
          "name": findResult[0].name,
          "n_songs": findResult[0].n_songs,
          "fav_artists": arrayArtist,
          "e_words": findResult[0].e_words,
          "d_words": findResult[0].d_words    
        }};    
        await collection.updateOne({"_id":mongoose.Types.ObjectId(findResult[0]._id)},myobj);            
    }
     
    async addDword(name, dWord) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('stats_by_user'); 
      const findResult = await collection.find(
      {
          $and:
              [
                  {"name": name}
              ]
      }).toArray();
      let arrayDwords = findResult[0].d_words;
      arrayDwords.push(dWord);
      var myobj = { $set:{ 
          "name": findResult[0].name,
          "n_songs": findResult[0].n_songs,
          "fav_artists": findResult[0].fav_artists,
          "e_words": findResult[0].e_words,
          "d_words": arrayDwords    
        }};    
        await collection.updateOne({"_id":mongoose.Types.ObjectId(findResult[0]._id)},myobj);            
    }


    async addEword(name, eWord) {
      const db = this.client.db(this.dbName);
      const collection = db.collection('stats_by_user'); 
      const findResult = await collection.find(
      {
          $and:
              [
                  {"name": name}
              ]
      }).toArray();
      let arrayEwords = findResult[0].e_words;
      arrayEwords.push(eWord);
      var myobj = { $set:{ 
          "name": findResult[0].name,
          "n_songs": findResult[0].n_songs,
          "fav_artists": findResult[0].fav_artists,
          "e_words": arrayEwords,
          "d_words": findResult[0].d_words    
        }};    
        await collection.updateOne({"_id":mongoose.Types.ObjectId(findResult[0]._id)},myobj);            
    }

    
    async closeConnection() {
      await this.client.close();
    }
  }

module.exports.database_user_s = database_user_s;