const API_KEY = "a2a2117bf16ba658d9e934f94b1f0421";
const BASE_URL = "api.openweathermap.org/data/2.5/weather";

const fetch = require('node-fetch');


const getWeatherData = async (zip, country) => {
    const END_POINT = `${BASE_URL}?zip=${zip},${country}&appid=${API_KEY}`;
    console.log(END_POINT)

    const response = await fetch('https://api.github.com/users/github');

    try{
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}


module.exports = getWeatherData;
