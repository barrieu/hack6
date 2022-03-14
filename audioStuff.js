
// function playTone(selectPart){
//   var startT = (selectPart * 1) - 1;
//   var stopT  = startT + 1.0;
//   audio.currentTime = startT;
//   var innerPlay = setTimeout(function(){ audio.play();}, 10);
//   var checkInterval = setInterval(function(){
//     if(audio.currentTime >= stopT){
//         audio.pause();
//         audio.currentTime = 0;
//         clearInterval(checkInterval);
//     }
//   },10);
// }
//
// function playList1(vocalList){
//   //console.log("playing Audio List");
//   playTone(vocalList[0]);
//   var secondTone = setTimeout(function(){ playTone(vocalList[1]);}, 1500);
//   var thirdTone  = setTimeout(function(){ playTone(vocalList[2]);}, 3000);
//   var fourthTone = setTimeout(function(){ playTone(vocalList[3]);}, 4500);
//   var fifthTone  = setTimeout(function(){ playTone(vocalList[4]);}, 6000);
// }

function playTheTones(vocalList){
     // *************************************
     // FIRST Tone
     // *************************************
     element.currentTime = vocalList[0] - 1;
     gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);

     setTimeout(function(){
       gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
     },900);

     element.play();
     console.log("PLAYING A   " + element.currentTime);
     var k = setInterval(function(){
       element.pause();
       clearInterval(k);
       console.log("STOPPED A");
     },1000);

     // *************************************
     // SECOND Tone
     // *************************************
     setTimeout(function(){
          element.currentTime = vocalList[1] - 1;
          gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);

          setTimeout(function(){
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          },900);

          element.play();
          console.log("PLAYING B   " + element.currentTime);
          var k = setInterval(function(){
            element.pause();
            clearInterval(k);
            console.log("STOPPED B");
          },1000);

        },1000);

      // *************************************
      // THIRD Tone
      // *************************************
      setTimeout(function(){
           element.currentTime = vocalList[2] - 1;
           gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);

           setTimeout(function(){
             gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
           },900);

           element.play();
           console.log("PLAYING C   " + element.currentTime);
           var k = setInterval(function(){
             element.pause();
             clearInterval(k);
             console.log("STOPPED C");
           },1000);

         },2000);

       // *************************************
       // FOURTH Tone
       // *************************************
       setTimeout(function(){
            element.currentTime = vocalList[3] - 1;
            gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);

            setTimeout(function(){
              gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            },900);

            element.play();
            console.log("PLAYING D   " + element.currentTime);
            var k = setInterval(function(){
              element.pause();
              clearInterval(k);
              console.log("STOPPED D");
            },1000);

          },3000);

    };
