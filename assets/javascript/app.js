//Variables

const questions = [
  {
    question: "What network aired the TGIF lineup?",
    choices: [
      "ABC",
      "NBC",
      "CBS",
      "FOX"
    ],
    answer: "ABC",
    image: "https://media.giphy.com/media/wuBtredIF3iqQ/giphy.gif"
  },
  {
    question: "What actor/actress from the movie 'Clueless' never appeared on the tv show version?",
    choices: [
      "Paul Rudd",
      "Alicia Silverstone",
      "Stacey Dash",
      "Donald Faison"
    ],
    answer: "Alicia Silverstone",
    image: "https://media.giphy.com/media/3o7aTIGlhSo1bL8QUg/giphy.gif"
  },
  {
    question: "What was the name of the 'smoother' alter ego for Steve Urkel from Family Matters?",
    choices: [
      "Stevo Urkel",
      "Stevie U",
      "Stefan Urquelle",
      "Stephen Urk"
    ],
    answer: "Stefan Urquelle",
    image: "https://media.giphy.com/media/xTiQyLuaW8BjqlOXCw/giphy.gif"
  },
  {
    question: "In 'Step by Step', how many children did Frank and Carol have combined by the end of the series?",
    choices: [
      "5",
      "8",
      "7",
      "6"
    ],
    answer: "7",
    image: "https://media.giphy.com/media/3ohhwAQo6W6qGxg4pi/giphy.gif"
  },
  {
    question: "In what American city does 'Boy Meets World' take place?",
    choices: [
      "Philadelphia",
      "Chicago",
      "St. Louis",
      "Baltimore"
    ],
    answer: "Philadelphia",
    image: "https://media.giphy.com/media/n8Vvbmmwx9F0k/giphy.gif"
  }
];

let questionNum = 0;
let choice = "";
let correctCount = 0;
let count = 10;
let intervalId;
let timeoutId;

//Click event handlers

$("#start").on("click", function() {
    displayQuestion(questionNum);
});

$("#buttons").on("click", ".choice", function() {
  choice = $(this).html();
  checkAnswer(choice, questionNum);
});

$("#solution").on("click", "#restart", function() {
    questionNum = 0;
    correctCount = 0;
    displayQuestion(questionNum);
});

//functions

const displayQuestion = function(questionNum) {
    $("#image").empty()
  $("#solution").empty();
  $("#buttons").empty();
  $("#question").html(`<h5 class="text-center">${questions[questionNum].question}</h5>`);
  for (let j = 0; j < 4; j++) {
    $("#buttons").append(
      $(`<button class="choice d-block mx-auto btn btn-primary m-2" id="choice${j + 1}">`).html(
        questions[questionNum].choices[j]
      )
    );
  }
  timeoutId = setTimeout(outOfTime, 10000);
  $("#timer").html(`<h3 class="text-center">${count} seconds left!`);
    intervalId = setInterval(countDown, 1000);
};

const resetTimers = function () {
    $("#timer").empty();
    showSolution("Sorry!");
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    count = 10;
}

const countDown = function() {
    count--;
    $("#timer").html(`<h3 class="text-center">${count} seconds left!`);
}

const checkGameWin = function() {
    if (questionNum === questions.length) {
        setTimeout(gameOver, 3000);
    }
    else {
    setTimeout(function() {
      displayQuestion(questionNum);
    }, 3000);
    }
}

const outOfTime = function() {
    resetTimers();
    questionNum++;
    checkGameWin();
}

const checkAnswer = function(choice, num) {
    resetTimers();
  if (choice === questions[num].answer) {
    showSolution("Correct!");
    correctCount++;
  } else {
    showSolution("Sorry!");
  }
  questionNum++;
  checkGameWin();
};

const showSolution = function(result) {
  $("#buttons").empty();
  $("#question").html(`<h3 class="text-center">${result}</h3>`);
  $("#solution").html(`<p class="text-center">The answer is ${questions[questionNum].answer}</p>`);
  $("#image").html(`<img class="img-fluid d-block mx-auto" src="${questions[questionNum].image}">`)
  console.log(questions[questionNum].image)
};

const gameOver = function() {
    $("#question").empty()
    $("#image").html(`<img class="img-fluid d-block mx-auto" src="https://media.giphy.com/media/3o85xr46bezqkTazsc/giphy.gif">`)
    $("#solution").html(`<h1 class="text-center">Game Over!</h1><p class="text-center">You got ${correctCount} questions right out of ${questions.length}. Click Restart to play again!`);
    $("#solution").append(`<button id="restart" class="d-block mx-auto btn btn-primary">Restart</button>`);
}
