const tick = document.getElementById('tickingSound')

//function for playing

function playTick(){
    tick.play();
}

setInterval(playTick, 100);