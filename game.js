// Array to store the different colours of buttons used in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to hold the randomly generated pattern of colours in the game
var gamePattern = [];

// Array to store the user's clicked pattern of colours
var userClickedPattern = [];

// Variable to keep track of whether the game has started or not
var started = false;

// Variable to keep track of the current level of the game
var level = 0;

// Event listener for the keypress event on the document
$(document).keypress(function() {
  // Check if the game has not started yet
  if (!started) {
    // Update the heading to display the current level
    $("#level-title").text("Level " + level);
    // Generate the next sequence in the game
    nextSequence();
    // Set the 'started' flag to true, so this block doesn't run again until the game restarts
    started = true;
  }
});

// Event listener for button clicks
$(".btn").click(function() {
  // Get the ID (colour) of the button clicked by the user
  var userChosenColour = $(this).attr("id");
  // Add the clicked colour to the user's clicked pattern array
  userClickedPattern.push(userChosenColour);

  // Play the sound associated with the clicked colour
  playSound(userChosenColour);

  // Animate the button to provide visual feedback for the click
  animatePress(userChosenColour);

  // Check if the user's clicked pattern is correct so far
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check if the user's clicked pattern matches the game pattern up to the current level
function checkAnswer(currentLevel) {
  // If the user's clicked pattern matches the game pattern up to the current level
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user's clicked pattern is the same length as the game pattern, i.e., they completed the current level
    if (userClickedPattern.length === gamePattern.length) {
      // Wait for 1 second and then generate the next sequence for the next level
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user clicked the wrong button, play the "wrong" sound, show a visual indication of the mistake, update the heading, and restart the game after a short delay
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the visual indication after a short delay
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Restart the game
    startOver();
  }
}

// Function to generate the next sequence for the next level
function nextSequence() {
  // Reset the user's clicked pattern array for the new level
  userClickedPattern = [];
  // Increment the level by 1 and update the heading to display the new level
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3 (inclusive) to select a random colour from the buttonColours array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  // Add the randomly chosen colour to the game pattern array
  gamePattern.push(randomChosenColour);

  // Show a brief visual animation for the randomly chosen colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound associated with the randomly chosen colour
  playSound(randomChosenColour);
}

// Function to animate a button press, adding and removing a CSS class for visual feedback
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play a sound based on the provided name (colour)
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset the game variables to start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
