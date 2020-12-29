// audio
const audio = document.getElementById("audio");

audio.addEventListener("keydown", function(event){
    if(event.key == 'Enter'){
        audio.play();
    }

});
   