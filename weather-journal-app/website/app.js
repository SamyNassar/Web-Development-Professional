/* Global Variables */
const API_KEY = "a2a2117bf16ba658d9e934f94b1f0421";
const BASE_URL = "api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateButton = document.getElementById("generate");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

generateButton.addEventListener('click', () => {
    console.log("CLICKED!");
    console.log(document.getElementById('zip'))
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if(zip && !isNaN(zip) && feelings){
        getWeatherData(zip)
        .then((data) => {
            postDataToServer('/add',{temp:data.main.temp,
                date:newDate,
                feelings:feelings})
        }).then(()=>{
            updateUI();
        })
    } else{
        alert("Invalid input!")
    }
    
})


const postDataToServer = async (url = '', data ={}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials : 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


const updateUI = async () => {
    const request = await fetch('/get');
        try{
            const allData=await request.json();
            date.innerHTML=allData.temp + "&deg; C";
            temp.innerHTML=allData.date;
            content.innerHTML=allData.feelings;
            console.log(allData)
        } catch(error){
        console.log('error',error);
    }
}


const getWeatherData = async (zip) =>{
    const END_POINT = `https://${BASE_URL}?zip=${zip}&units=metric&appid=${API_KEY}`;

    const response = await fetch(END_POINT);
    try{
        const data = await response.json()
        return data;
    } catch(e){
        console.log(e);
    }
}


