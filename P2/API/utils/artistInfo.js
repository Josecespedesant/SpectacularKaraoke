const lookup = require('country-code-lookup');

function artistInfo(artist){
    //console.log(artist);


    //console.log("Nombre del artista: ", artist.name);
   // console.log("Genero del artista: ", artist.gender);
    
    var new_c = lookup.byIso(artist.country);
    //console.log("Pais del artista: ", new_c.country);

    var beginarea = artist['begin-area'];
    var lifespan = artist['life-span'];
 
    var endarea = artist['end-area'];


    var aliases = artist.aliases;
    var aliases_2 = []
    aliases.forEach(element =>{
      aliases_2.push(element.name);
    });
    //console.log("Lista de alias: ", aliases_2);
    var tags = artist.tags;
    var tags_2 = [];
    tags.forEach(element =>{
      tags_2.push(element.name);
    });
    //console.log("lista de generos", tags_2);

    
    if (lifespan.ended){
        const json = {
            gender: artist.gender,
            country: new_c.country,
            begin_area: beginarea.name,
            end_area: endarea.name,
            begin_life: lifespan.begin,
            end_life: lifespan.end,
            aliases: aliases_2,
            genres: tags_2
        }
        return json;
    } else {
        const json = {
            gender: artist.gender,
            country: new_c.country,
            begin_area: beginarea.name,
            end_area: null,
            begin_life: lifespan.begin,
            end_life: null,
            aliases: aliases_2,
            genres: tags_2
        }
        return json

    }
    





    
  

   
    
  };

  module.exports.artistInfo = artistInfo;