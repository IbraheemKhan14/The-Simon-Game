var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];
var level = 0;
var started = false;

$(document).keypress(function(){
  if(started === false){
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " +level );
}

$(".btn").click(function(){
  var userChosenColor = event.srcElement.id;
  userClickedPattern.push(userChosenColor);
  // playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(color){
  var buttonSound = new Audio("sounds/" + color + ".mp3");
  buttonSound.play();
}

function animatePress(color){
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(level){
  if(gamePattern[level] === userClickedPattern[level]){
    console.log("success");
    playSound(gamePattern[level]);
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over, press any key to restart !");
    startOver();
  }
  // userClickedPattern = [];
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}
