// //Geocoding api 
const request = require("postman-request")
const geocodes = (address, callback)=>{
    const geoCodeApi = "https://api.geoapify.com/v1/geocode/search?text="+encodeURIComponent(address)+"&apiKey=7bd45d0eb67b45069780c6afec7deb91";
    request({url: geoCodeApi, json: true},(error, response)=>{
        
        if(error){
            callback("Cannot connect to GeoCoding service❗", undefined);
            
        }
        else if(response.body.features.length===0){
            callback("Invalid Address provided❗", undefined);
       }
       else{
        const latitude = response.body.features[0].properties.lat;
        const longitude = response.body.features[0].properties.lon;
        callback(undefined, { lat: latitude, lon: longitude });
       }
     
    })
}

module.exports = geocodes;
