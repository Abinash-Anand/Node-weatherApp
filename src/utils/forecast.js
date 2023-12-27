const request = require("postman-request")
   // Goal: Create a reusable function for getting the forecast
    //
    // 1. Setup the "forecast" function in utils/forecast.js
    // 2. Require the function in app.js and call it as shown below
    // 3. The forecast function should have three potential calls to callback:
    //    - Low level error, pass string for error
    //    - Coordinate error, pass string for error
    //    - Success, pass forecast string for data (same format as from before)
    
const forecast = (lat, lon, callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+encodeURIComponent(lat)+"&lon="+encodeURIComponent(lon)+"&appid=c6d89c00523667391464bce4ffb61946";
    request({url: url, json: true}, (error, response)=>{
        if (error) {
            // console.log("Cannot connect to weather service❗");
            callback("Cannot connect to weather service❗", undefined);
        }else if(response.body.cod && response.body.cod!=200){
            console.log(response.body);
            callback(response.body.message+ " Try another search!", undefined);
        }
        else{
         
            callback(undefined, {
                weather: response.body.weather[0].description,
                currentTemp: response.body.main.temp,
                feelsLike: response.body.main.feels_like,
                minTemp: response.body.main.temp_min,
                maxTemp: response.body.main.temp_max,
                pressure: response.body.main.pressure,
                humidity: response.body.main.humidity,
                city: response.body.name,
                country: response.body.sys.country
                
            })
        }
    })
    
    
    }
    
module.exports=forecast;

 
    
    
    