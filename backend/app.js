const express=require('express');
const path=require('path');
const hbs = require('hbs');

const geoCoordinates= require('./geoCoordinates');
const forecast = require('./forecast');


// Defining paths
const publicPath=(path.join(__dirname,'../public'));
const viewPath=path.join(__dirname,'../Myviews/views');
const partialsPath=path.join(__dirname,'../Myviews/partials')

const app=express();
const port=process.env.PORT || 3000;

// Template engine setting
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// static routes
app.use(express.static(publicPath))


// main routes


app.get('',(req,res)=>{
    res.render('index'); 
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Keshav',
        Age:'28'
    });
})

app.get('/about/*',(req,res)=>{
    res.send("Not foung . 404 Page")
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address is required",
            response:"error"
        })
    }

    geoCoordinates(req.query.address,(error,{longitude,latitude}={})=>{
        if(error){
           return  res.send({
                error:error
            })
        }
        forecast(longitude,latitude,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:req.query.address,
                forcast:data
            })
        })



    })
})


app.get('/contact',(req,res)=>{
    res.render('contact',{
        img:'rohit.png',
        name:'Rohit',
        age:'28'
    })})

app.get('*',(req,res)=>{
        url=req.url;
        url=url.replace('/','')
        res.render('404',{
            name:url
        })
    })



app.listen(port,()=>{
    console.log('Server is Up Now with Post '+ port);
})