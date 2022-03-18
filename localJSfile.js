// ************************************************************
// THIS IS THE PRIMARY JS FILE
// ************************************************************

const jsPsych = initJsPsych();
console.log("setting up as ver 4 ");

function initialStuff(){
    var timeline = [];
    var loopTimeline = [];
    var tonesToPlay = [1,1,1,1];
    var deviant_location = '-';
    var standard_tone = 1;
    var init_deviant_tone = standard_tone + 250;
    var deviant_tone = init_deviant_tone;
    var init_decrement = 25;
    var init_increment = 75;
    var later_decrement = 10;
    var later_increment = 30;
    var reversal_limit = 20;     //should be 20
    var present_decrement = init_decrement;
    var present_increment = init_increment;
    var previous_direction = '-';
    var latest_direction   = '-';
    var reversal_count = 0;

    // *************************************
    // setup the audio context
    // *************************************
    const audioContext = new AudioContext();
    //const element = new Audio("oodlesOfSounds.ogg");
    const element = new Audio("250_1_hz_tones.ogg");
    const source = audioContext.createMediaElementSource(element);
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // *************************************
    // playTheTones
    // *************************************
    function playTheTones(vocalList){
         // *************************************
         // FIRST Tone
         // *************************************
         element.currentTime = vocalList[0] - 1;
         // gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);
         //
         // setTimeout(function(){
         //   gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
         //   console.log("ramp down started @ " + audioContext.currentTime);
         // },900);
         //
         // element.play();
         // console.log("PLAYING A   " + element.currentTime);
         // var k = setInterval(function(){
         //   element.pause();
         //   clearInterval(k);
         //   console.log("STOPPED A @ " + element.currentTime);
         // },1000);

         gainNode.gain.exponentialRampToValueAtTime(1.0, 0.01);

         setTimeout(function(){
           gainNode.gain.exponentialRampToValueAtTime(0.001, element.currentTime + 0.01);
           console.log("ramp down started @ " + element.currentTime);
         },900);

         element.play();
         console.log("PLAYING A   " + element.currentTime);
         var k = setInterval(function(){
           element.pause();
           clearInterval(k);
           console.log("STOPPED A @ " + element.currentTime);
         },1000);



         // *************************************
         // SECOND Tone
         // *************************************
         setTimeout(function(){
              element.currentTime = vocalList[1] - 1;
              //gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);
              gainNode.gain.exponentialRampToValueAtTime(1.0, 0.01);

              setTimeout(function(){
                //gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.001, element.currentTime + 0.01);
              },900);

              element.play();
              console.log("PLAYING B   " + element.currentTime);
              var k = setInterval(function(){
                element.pause();
                clearInterval(k);
                console.log("STOPPED B");
              },1000);

            },1500);

          // *************************************
          // THIRD Tone
          // *************************************
          setTimeout(function(){
               element.currentTime = vocalList[2] - 1;
               //gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);
               gainNode.gain.exponentialRampToValueAtTime(1.0, 0.01);

               setTimeout(function(){
                 //gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                 gainNode.gain.exponentialRampToValueAtTime(0.001, element.currentTime + 0.01);

               },900);

               element.play();
               console.log("PLAYING C   " + element.currentTime);
               var k = setInterval(function(){
                 element.pause();
                 clearInterval(k);
                 console.log("STOPPED C");
               },1000);

             },3000);

           // *************************************
           // FOURTH Tone
           // *************************************
           setTimeout(function(){
                element.currentTime = vocalList[3] - 1;
                //gainNode.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(1.0, 0.01);

                setTimeout(function(){
                  //gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                  gainNode.gain.exponentialRampToValueAtTime(0.001, element.currentTime + 0.01);

                },900);

                element.play();
                console.log("PLAYING D   " + element.currentTime);
                var k = setInterval(function(){
                  element.pause();
                  clearInterval(k);
                  console.log("STOPPED D");
                },1000);

              },4500);

        };

    // *************************************
    // playTheTonesFunction
    // *************************************
    function playTheTonesFunction(){
      tonesToPlay = createToneList(deviant_tone, standard_tone );
      console.log(tonesToPlay[0] + " " + tonesToPlay[1] + " "  + tonesToPlay[2] + " "  + tonesToPlay[3]);
      playTheTones([ tonesToPlay[0],tonesToPlay[1],tonesToPlay[2],tonesToPlay[3] ]);
      jsPsych.pauseExperiment();
      setTimeout(jsPsych.resumeExperiment, 6000);
    };

    // *************************************
    // Calculate the values
    // *************************************
    function calculateTheValue(){
      var lastKeypressStringify = JSON.stringify(jsPsych.data.getLastTrialData());
      var userPressedKey = lastKeypressStringify.substring(lastKeypressStringify.indexOf('"response":') + 11).substring(1,2);
      var userIsCorrect = false;

      if (userPressedKey === 'm'){
          if (tonesToPlay[4] === 'R') {
              userIsCorrect = true;
            }
      }
      if (userPressedKey === 'z'){
          if (tonesToPlay[4] === 'L') {
              userIsCorrect = true;
            }
      }
      if (userPressedKey === 'q'){
          userIsCorrect = false;
          jsPsych.endCurrentTimeline();
      }

      if (userIsCorrect){
        console.log("CORRECT ");
        deviant_tone = deviant_tone - present_decrement;
        if (deviant_tone < standard_tone){
          deviant_tone = standard_tone;
        }
        latest_direction = 'D';
      }else{
        console.log("INCORRECT ");
        deviant_tone = deviant_tone + present_increment;
        if (deviant_tone > init_deviant_tone){
          deviant_tone = init_deviant_tone;
        }
        latest_direction = 'U';
      }

      if (latest_direction !== previous_direction){
        reversal_count = reversal_count + 1;
        if (reversal_count === 3){              // after 2 reversals change rates
          present_decrement = later_decrement;
          present_increment = later_increment;
        }
        if (reversal_count === reversal_limit){
          console.log("reached the end of reversals");
          jsPsych.endCurrentTimeline();
        }
      }
      console.log(" DIRECTION STUFF " + reversal_count + "  " + previous_direction + "  " + latest_direction);
      console.log("    ");

      previous_direction = latest_direction;
    };

// ***********************************************************************************
// Experement begins here
// ***********************************************************************************
    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Listen to the Tones',
      choices: "NO_KEYS",
      trial_duration: 2000
    };
    timeline.push(hello_trial);

// ***********************************************************************************
// This is the trial loop part to play tones then calculate the next pattern
// ***********************************************************************************
    var playTheTonesTrial = {
         type: jsPsychCallFunction,
         func: playTheTonesFunction
     };

     const collectUserKey = {
       type: jsPsychHtmlKeyboardResponse,
       stimulus: 'press Z or M : q to quit',
       choices: ['z' , 'm', 'q'],
       response_ends_trial: true
     };

     var calculateNextDeviant = {
       type: jsPsychCallFunction,
       func: calculateTheValue
     };

     var loop_node_2 = {
       timeline: [playTheTonesTrial, collectUserKey, calculateNextDeviant],
       repetitions: 60
     };
     timeline.push(loop_node_2);

     const goodbye_trial = {
       type: jsPsychHtmlKeyboardResponse,
       stimulus: 'goodbye world!',
       choices: "NO_KEYS",
       trial_duration: 2000
     };
     timeline.push(goodbye_trial);

     return timeline;
}
