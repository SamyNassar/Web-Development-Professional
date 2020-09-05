/* Global Variables */

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
        const data = {zip}
        postZipToServer(data);
        
    } else{
        alert("Invalid input!")
    }
    
})





/* Helper Methods */

const postZipToServer = async (zip) => {

    const response = await fetch('/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(zip)
        });
    
    const weatherData = await response.json();

    updateUI(weatherData);

    console.log(weatherData);
}


function updateUI(weatherData){
    date.innerText = newDate;
    temp.innerHTML = weatherData.main.temp + "&deg; C";
    content.innerText = feelings;
}


/* Thses Two method Used if clint side fetch weather API and POST it to the server. ( NOT used ) */
const getWeatherData = async () =>{

    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=a2a2117bf16ba658d9e934f94b1f0421");
    console.log(`Fetching Data ${response}`);
    console.log(response)

    try{
        const data = await response.json()
        console.log(data);
        postWeatherDataToServer(data);

    }catch(e){
        console.log(e);
    }
}

const postWeatherDataToServer = (data) => {
    const weather = fetch("/", {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}


// getWeatherData();
