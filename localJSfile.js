// ************************************************************
// THIS IS THE PRIMARY JS FILE
// ************************************************************

const jsPsych = initJsPsych();
var audio= document.getElementById("myaudio_oneHundred_tones");
//var tonesToPlay = [1,80,1,1];

function initialStuff(){

    var timeline = [];
    var loopTimeline = [];

    var tonesToPlay = [1,80,1,1];
    var deviant_location = '-';

    var standard_tone = 1;
    var init_deviant_tone = standard_tone + 250;
    var deviant_tone = init_deviant_tone;
    var init_decrement = 25;
    var init_increment = 75;
    var later_decrement = 10;
    var later_increment = 30;
    var reversal_limit = 5;     //should be 20

    var present_decrement = init_decrement;
    var present_increment = init_increment;

    var previous_direction = '-';
    var latest_direction   = '-';

    var reversal_count = 0;

    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Listen to the Tones',
      choices: "NO_KEYS",
      trial_duration: 2000
    };
    timeline.push(hello_trial);

// ******** REPEAT THIS UNTIL Q PRESSED *******************
    const star_trial_1 = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '***** 1 ******',
      choices: "NO_KEYS",
      trial_duration: 500
    };

    const star_trial_2 = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'press Q to quit loop or E to continue',
      choices: ['q','w'],
      response_ends_trial: true,
      //trial_duration: 1000,
    };

    function endTheLoopFunc() {
      var lastKeypressStringify = JSON.stringify(jsPsych.data.getLastTrialData());
      var userPressedKey = lastKeypressStringify.substring(lastKeypressStringify.indexOf('"response":') + 11).substring(1,2);
      console.log('userPressedKey = ' + userPressedKey  + '    ' + lastKeypressStringify);
      if (userPressedKey === 'q'){
        jsPsych.endCurrentTimeline();
      }
    };

    var endTheLoop = {
      type: jsPsychCallFunction,
      func: endTheLoopFunc
    };

    var loop_node_1 = {
      timeline: [star_trial_1, star_trial_2, endTheLoop],
      repetitions: 60
    };
    timeline.push(loop_node_1);
// ************************************************






    function playTheTonesFunction(){
      // var version = jsPsych.version();
      // console.log("version = " + version);
      // var time = jsPsych.getTotalTime();
      // console.log("entry = " + time);

      tonesToPlay = createToneList(deviant_tone, standard_tone );
      //console.log("reporting location "  + tonesToPlay[4]);
      console.log(tonesToPlay[0] + " " + tonesToPlay[1] + " "  + tonesToPlay[2] + " "  + tonesToPlay[3]);

      playList1([ tonesToPlay[0],tonesToPlay[1],tonesToPlay[2],tonesToPlay[3] ]);

      jsPsych.pauseExperiment();
      setTimeout(jsPsych.resumeExperiment, 8000);
    };

    function calculateTheValue(){
      //console.log("reporting " + tonesToPlay[1] + "    " + tonesToPlay[4]);

      var lastKeypressStringify = JSON.stringify(jsPsych.data.getLastTrialData());
      var userPressedKey = lastKeypressStringify.substring(lastKeypressStringify.indexOf('"response":') + 11).substring(1,2);
      //console.log('userPressedKey = ' + userPressedKey);

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
        //deviant_tone = deviant_tone - init_decrement;
        deviant_tone = deviant_tone - present_decrement;

        if (deviant_tone <= standard_tone) {deviant_tone = standard_tone}

        latest_direction = 'D';
      }else{
        console.log("INCORRECT ");
        //deviant_tone = deviant_tone + init_increment;
        deviant_tone = deviant_tone + present_increment;

        if (deviant_tone > init_deviant_tone) {deviant_tone = init_deviant_tone}

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
