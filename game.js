var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = [];

var userClickedPattern = []

var level = 0

var flag = false

$(document).keypress(function(){
    if(!flag){
    $("#level-title").text("Level " + level)
    newSequence()
    flag = true
    }
})

$(".btn").click(function(event){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playsound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

function newSequence(){
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    ($("#" + randomChosenColor)).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playsound(randomChosenColor)

    level++;

    $("#level-title").text("Level " + level)
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    ($("#" + currentColour)).addClass("pressed");
    setTimeout(function(){
        ($("#" + currentColour)).removeClass("pressed");
    }, 100)
}


function checkAnswer(currentlevel){
 
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        // console.log("success")

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                newSequence();
            }, 1000);
        }
    }
    else{
        // console.log('wrong')
        playsound("wrong")
        $("#level-title").text("Game Over, Press Any Key To Restart")

        $("body").addClass("game-over");
        

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        starOver();
    }

}

function starOver(){
    level = 0
    flag = false
    gamePattern = []
}



