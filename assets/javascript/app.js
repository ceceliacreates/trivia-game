const questions = [
  {
    question: "question 1",
    choices: [
      "question 1 choice 1",
      "question 1 choice 2",
      "question 1 choice 3",
      "question 1 choice 4"
    ],
    answer: "question 1 answer"
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

const displayQuestion = function(questionNum) {
  $("#solution").empty();
  $("#question").html(questions[questionNum].question);
  for (let j = 0; j < 4; j++) {
    $("#buttons").append(
      $(`<button class="choice" id="choice${j + 1}">`).html(
        questions[questionNum].choices[j]
      )
    );
  }
};
displayQuestion(questionNum);

const checkAnswer = function(choice, num) {
  if (choice === questions[num].answer) {
    showSolution("Correct!");
  } else {
    showSolution("Sorry!");
  }
  questionNum++;
};

const showSolution = function(result) {
  $("#buttons").empty();
  $("#question").html(`${result}`);
  $("#solution").html(`The answer is ${questions[questionNum].answer}`);
  setTimeout(function() {
    displayQuestion(questionNum);
  }, 2000);
};

$("#buttons").on("click", ".choice", function() {
  choice = $(this).html();
  checkAnswer(choice, questionNum);
});
