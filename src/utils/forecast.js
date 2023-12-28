const request = require("postman-request")    
const forecast = (lat, lon, callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=c6d89c00523667391464bce4ffb61946&units=metric";
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

 
    
    
    