
var userClickedPattern=[];
var gamePattern=[];

var buttonColours=["red","blue","green","yellow"];

var started=false;
var level=0;

//Game is initiated
$("body").keypress(function(){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});


function nextSequence (){
  //level started
  level++;
  $("h1").text("Level "+level);

  //random colour choosen
  var randomNumber= Math.floor(Math.random()*4);// 0-3
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  //random colour shown to user
  $("."+randomChosenColour).fadeToggle().fadeToggle();
  //audio played
  playSound(randomChosenColour);
}


// when user clicks any button
$("button").click(function (){
  //clicked colour stored in array
  var userChosenColour=$(this).attr("class");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  //audio played
  playSound(userChosenColour);
  //animation applied
  animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);//index of last entry
});



function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (JSON.stringify(userClickedPattern)===JSON.stringify(gamePattern)){
      console.log("success");
      userClickedPattern.splice(0,userClickedPattern.length);//empty array for next Level

      //wait until sequence finished
      setTimeout(function(){
        nextSequence();
      },1000)
  }
}
//if wrong answer
  else{
    console.log("Wrong");
    playSound("wrong");// play oops sound
    $("body").addClass("gameOver");// animate wrong input
    $("h1").text("Game Over, Press Any Key to Restart");
    //ready for restart
    setTimeout(function(){
      $("body").removeClass("gameOver");
    },200)

    startOver();
  }
}


function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");

  setTimeout(function(){
    $("."+currentColour).removeClass("pressed")
  },100)
}


function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
  started=false;
}
