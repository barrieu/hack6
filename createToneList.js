//function createToneList(){
  // var standard_tone = 1;
  // var init_deviant_tone = 250;
  // var init_decrement = 25;
  // var init_increment = 75;
  // var later_decrement = 10;
  // var later_increment = 30;
  // var reversal_limit = 20;
  //var deviant_location = '-';


function createToneList(deviant_tone, standard_tone){

  //var deviant_tone = init_deviant_tone;
  var centre_part = [];

  var deviant_selector = Math.random();
  //console.log('random number = ' + deviant_selector);

  if (deviant_selector > 0.5){
    centre_part = [standard_tone, deviant_tone];
    deviant_location = 'R';
  }else{
    centre_part = [deviant_tone, standard_tone];
    deviant_location = 'L';
  }

  var toneList = [];
  toneList[0] = standard_tone;
  toneList[1] = centre_part[0];
  toneList[2] = centre_part[1];
  toneList[3] = standard_tone;
  toneList[4] = deviant_location;
  console.log(toneList + "  " + deviant_location );
  return toneList;
}

// function createToneList() {
//   var toneList = [];
//   toneList[0] = 1;
//   toneList[1] = 2;
//   toneList[2] = 3;
//   toneList[3] = 4;
//   toneList[4] = 'L';
//   return toneList;
// }
