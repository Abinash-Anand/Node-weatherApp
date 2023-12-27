const path = require('path')
const express = require("express");
const hbs = require('hbs');
const request = require('postman-request')
const forecast = require('./utils/forecast');
const geocodes = require('./utils/geocodes');


const app = express();
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsDirPath)

//Home page route
app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        url: "https://images.pexels.com/photos/23764/pexels-photo.jpg",
        body: 'This is a Express weather App'
    })
})
//help section route
app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help",
        body: "This is the Help section!"})
})
//about page route
app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Page",
        body: "This is ABOUT page of the website!"
    })
})

//current weather route
app.get("/weather", (req, res)=>{
    const address= req.query.address;
    if(!req.query.address){
        return res.send({Error: "No address string provided!"})
    }
   geocodes(address, (error, {lat, lon}={})=>{
    if (error) {
        return res.send({error});
    }
    forecast(lat, lon, (error, {weather, currentTemp,feelsLike})=>{
        if (error) {
            return res.send({ error});
        }else{
            console.log(weather);
            res.send([ {
                latitude:lat,
                longitude:lon,
           
                
            },
        {
            weather,
            currentTemp,
            feelsLike,
            address
        }] );
        }
             


    });
 
   })

   
   
})
//specific case error
app.get('/about/*',(req, res)=>{
    res.render('404-error', {
        errorMessage: " Page Not found❗❗"
    })
})
//specific case error
app.get('/help/*',(req, res)=>{
    res.render('404-error', {
        errorMessage: " Page Not found❗❗"
    })
})
//generic error
app.get('*', (req, res)=>{
    res.render('404-error', {
        errorMessage: "404 Error❗ "
    })
})






app.listen(3000, ()=>{
    console.log("server up and running at port 3000");
})







