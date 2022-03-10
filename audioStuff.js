//var audio= document.getElementById("myaudio_twelve_tones");

function playTone(selectPart){
  //var version = jsPsych.version();
  //console.log(version);
  var startT = (selectPart * 1) - 1;
  //stopT  = startT + 1;
  var stopT  = startT + 1.0;
  //console.log("startT = " + startT);
  audio.currentTime = startT;
  //audio.play();
  // var innerPlay = setTimeout(function(){
  //   audio.play();
  //   //console.log(" starting audio at " + audio.currentTime);
  //   // the below setInterval is to check the currentTime
  //   var checkInterval = setInterval(function(){
  //     if(audio.currentTime > stopT){
  //       //console.log(" stopping audio at " + audio.currentTime);
  //       audio.pause();
  //       clearInterval(checkInterval);
  //         }
  //       },10);
  // }, 50);

  var innerPlay = setTimeout(function(){ audio.play();}, 10);

  var checkInterval = setInterval(function(){
    if(audio.currentTime >= stopT){
        audio.pause();
        audio.currentTime = 0;
        clearInterval(checkInterval);
    }
  },10);
}

  //console.log(" starting audio at " + audio.currentTime);

// the below setInterval is to check the currentTime
  // var checkInterval = setInterval(function(){
  //   if(audio.currentTime > stopT){
  //     console.log(" stopping audio at " + audio.currentTime);
  //     audio.pause();
  //     clearInterval(checkInterval);
  //       }
  //     },10);
  // }


function playList1(vocalList){
  //console.log("playing Audio List");
  playTone(vocalList[0]);
  var secondTone = setTimeout(function(){ playTone(vocalList[1]);}, 1500);
  var thirdTone  = setTimeout(function(){ playTone(vocalList[2]);}, 3000);
  var fourthTone = setTimeout(function(){ playTone(vocalList[3]);}, 4500);
  var fifthTone  = setTimeout(function(){ playTone(vocalList[4]);}, 6000);
}
