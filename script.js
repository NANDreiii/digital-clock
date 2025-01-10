//code for the map -> used the code that has been taught at the seminar.
window.onload = function () {
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError)

    function onLocationSuccess(position) {
        console.log(position.coords.accuracy);
        console.log(position);

        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let accuracy = position.coords.accuracy;

        let map = L.map('map').setView([lat, long], 17);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Multimedia'
        }).addTo(map);

        L.marker([lat, long]).addTo(map);

        L.circle([lat, long], {
            color: 'red',
            fillColor: '#ff0033',
            fillOpacity: 0.5,
            radius: accuracy
        }).addTo(map);
        //afisare longitudine si latitudine langa harta
        document.getElementById('long').textContent = "Longitudine: " + long;
        document.getElementById('lat').textContent = "Latitudine: " + lat;
    }

    function onLocationError(error) {
        console.log(error);
    }


}

//functions to get the hour of each city
function getCityTime(offset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // UTC hour, found by using Romania's hour. Multip by 60000 to get milliseconds
    const cityTime = new Date(utc + (3600000 * offset));//get the hour for each city based on the UTC and the offset of each city
    const hour = String(cityTime.getHours()).padStart(2, '0');//padstart used to format the time. 
    const minute = String(cityTime.getMinutes()).padStart(2, '0');
    const second = String(cityTime.getSeconds()).padStart(2, '0');
    return `${hour}:${minute}:${second}`;
}

//function to "draw" each hour for each country based on the offset. 
//Offset will be hard coded when the functions will be called.
function drawCityTime(cityId, offset) {
    const cityCanvas = document.getElementById(cityId);
    const ctxCity = cityCanvas.getContext("2d");

    const width = cityCanvas.width;
    const height= cityCanvas.height;
    
    const time = getCityTime(offset);

    ctxCity.clearRect(0, 0, width, height);


    ctxCity.font = "40px Arial Black";
    ctxCity.textAlign = "center";
    ctxCity.textBaseline = "middle";
    ctxCity.fillText(time, width/2, height/2);
}

//used to update each clock + the hard coded offset of each city.
setInterval(() => {
    drawCityTime("LondonTime", 0); 
    drawCityTime("NYTime", -5);  
    drawCityTime("ParisTime", 1);
    drawCityTime("BeijingTime", 8); 
}, 1000);//1000 used just like it has been used for the big clock, to "reload" the canvas

//main clock time
const tick = document.getElementById('tickingSound')
const soundButton = document.getElementById('buttonForSound')
let isSoundOn = false // to control the sound -> initially, the sound is NOT on
//function for playing/stopping the sound
//for the clock
const myCanvas = document.getElementById("canvasForClock")
const ctx = myCanvas.getContext("2d")

//get coord for the canvas
const width = myCanvas.width;
const height = myCanvas.height;

function createDigitalClock(){
    //clear canvas - it is needed since the time will be updated constantly over the same canvas
    ctx.clearRect(0,0,width,height);

    //first, we need to get the current time - format -> hour:minute:second
    const actualDate = new Date()
    const actualHour = String(actualDate.getHours()).padStart(2, '0');//use padStart to add the 0 when the hour/minute/second is less than 10
    const actualMinute = String(actualDate.getMinutes()).padStart(2, '0');
    const actualSecond = String(actualDate.getSeconds()).padStart(2, '0');

    //time that will be shown. It will be created using template strings
    const time = `${actualHour}:${actualMinute}:${actualSecond}`;

    ctx.font = "100px Arial Black";//used for the time shown on the canvas
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(time, width/2, height/2);// use witdh/2 and height/2 to center thr text on the canvas 
}

setInterval(createDigitalClock, 1000); //used to update the clock every second(1000 milliseconds)
createDigitalClock();

function soundControl(){
if(isSoundOn){
    tick.pause();
    soundButton.textContent = "Start sound" // change the text
    soundButton.classList.add('btn-success')
    soundButton.classList.remove('btn-danger')
}
else{
    tick.play();
    soundButton.textContent = "Stop sound" // change the text again
    soundButton.classList.remove('btn-success')
    soundButton.classList.add('btn-danger')
}
isSoundOn = !isSoundOn // change from true -> false or false -> true
}

soundButton.addEventListener('click', soundControl) // connect the button and the function

function playTick(){
    if(isSoundOn)
    tick.play();
}

setInterval(playTick, 75);

//buttons for theme change
const redButton = document.getElementById('Red')
const blueButton = document.getElementById('Blue')
const GreenButton = document.getElementById('Green')
const defButton = document.getElementById('Default')
//function to change theme to red
function changeThemeRed(){
    document.body.style.backgroundColor = 'red';
    document.getElementById('clockDiv').style.backgroundColor = 'red';
}
redButton.addEventListener('click', changeThemeRed);

//function to change theme to blue
function changeThemeBlue(){
    document.body.style.backgroundColor = 'blue';
    document.getElementById('clockDiv').style.backgroundColor = 'blue';
}
blueButton.addEventListener('click', changeThemeBlue);

//function to change theme to green
function changeThemeGreen(){
    document.body.style.backgroundColor = 'green';
    document.getElementById('clockDiv').style.backgroundColor = 'green';
}
GreenButton.addEventListener('click', changeThemeGreen);

//functon to change theme back to default value
function changeToDefault(){
    document.body.style.backgroundColor = '#F5F5DC';
    document.getElementById('clockDiv').style.backgroundColor = '#F5F5DC';
}
defButton.addEventListener('click', changeToDefault);

const HEXbutton = document.getElementById('HEXbutton');
const colourChange = document.getElementById('colorInput');

function changeColourHEX(){
    newColour = colourChange.value;
    if(newColour.startsWith('#') && newColour.length == 7){
        document.body.style.backgroundColor = newColour;
        document.getElementById('clockDiv').style.backgroundColor = newColour;
    }
    else{
    alert('Input a valid HEX code.')
    }
}

HEXbutton.addEventListener('click', changeColourHEX);   