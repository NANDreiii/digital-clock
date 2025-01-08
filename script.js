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

setInterval(playTick, 100);