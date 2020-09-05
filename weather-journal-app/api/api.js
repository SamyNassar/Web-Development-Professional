const API_KEY = "a2a2117bf16ba658d9e934f94b1f0421";
const BASE_URL = "api.openweathermap.org/data/2.5/weather";

const fetch = require('node-fetch');


const getWeatherData = async (zip = '94040') => {
    const END_POINT = `https://${BASE_URL}?zip=${zip}&units=metric&appid=${API_KEY}`;

    const response = await fetch(END_POINT);

    try{
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}
 

module.exports = getWeatherData;
