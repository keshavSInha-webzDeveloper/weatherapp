const request=require('request');


const forecast=function(lat,lon,callback){

    const darkskyUrl="https://api.darksky.net/forecast/1cbac0288f151b4e0187af4538517d1f/"+lat+","+lon

    request({url:darkskyUrl,json:true},function(error,{body}={}){
        if(error){
            callback("DarkSky URL Is Down !!")
        }
        else if(body.error){
            callback("Your Input Is not Correct")
        }
        else{
            callback(undefined,"Today's Tem is "+ body.currently.temperature+ " AND Humidity Is " + body.currently.humidity+" Summery is "+body.currently.summary)
        }
    })
}

module.exports=forecast;