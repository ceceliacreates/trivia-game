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
    question: "question 2",
    choices: [
      "question 2 choice 1",
      "question 2 choice 2",
      "question 2 choice 3",
      "question 2 choice 4"
    ],
    answer: "question 2 answer"
  },
  {
    question: "question 3",
    choices: [
      "question 3 choice 1",
      "question 3 choice 2",
      "question 3 choice 3",
      "question 3 choice 4"
    ],
    answer: "question 3 answer"
  },
  {
    question: "question 4",
    choices: [
      "question 4 choice 1",
      "question 4 choice 2",
      "question 4 choice 4",
      "question 4 choice 4"
    ],
    answer: "question 4 answer"
  },
  {
    question: "question 5",
    choices: [
      "question 5 choice 1",
      "question 5 choice 2",
      "question 5 choice 5",
      "question 5 choice 4"
    ],
    answer: "question 5 answer"
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
  $("#question").html(questions[questionNum].question);
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
    $("#solution").html(`<h1 class="text-center">Game Over!</h1><p class="text-center">You got ${correctCount} questions right out of ${questions.length}. Click Restart to play again!`);
    $("#solution").append(`<button id="restart" class="d-block mx-auto btn btn-primary">Restart</button>`);
}
