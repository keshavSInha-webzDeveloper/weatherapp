const request=require('request');

const geoCoordinates=function(name,callback){

   

    const mapboxUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+name+".json?access_token=pk.eyJ1Ijoia2VzaGF2LXdlYnoiLCJhIjoiY2p1aDNqYjlxMHZxeTQzdTkzODV6N3lyaiJ9.2YkMlGoUXZx2blA81oXZyQ&limit=1";

    request({url:mapboxUrl,json:true},function(error,{body}={}){

       
        if(error){
            callback("MapBox URL Is Down !!")
        }
        else if(body.features.length===0){
            callback("Your input is incorrect !!")
        }
        
        else{
            callback(undefined,{
                'longitude': body.features[0].center[0],
                'latitude':  body.features[0].center[1]
            })
        }
    })
}


module.exports=geoCoordinates;