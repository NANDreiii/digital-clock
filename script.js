const tick = document.getElementById('tickingSound')
const soundButton = document.getElementById('buttonForSound')
let isSoundOn = false // to control the sound -> initially, the sound is NOT on
//function for playing/stopping the sound

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