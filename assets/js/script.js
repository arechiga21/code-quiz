var questions = [
  {
    title: "commonly used data type do not include:---",
    choices: ["strings","booleance","alerts","numbers"],
    answer: "alerts"
  },
  {
    title: "What does HTML stand for:---",
    choices: ["Hyperlinks and Text Markup Language","Home Tool Markup Language","Hyperlink Tool Markup Language","HyperText Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    title: "Arrays in JavaScript can be used to store:---",
    choices: ["Numbers and Strings","other arrays","booleances","all of the above"],
    answer: "all of the above"
  },
  {
    title: "A very useful tool used during development and debugging for printing content to the debugger is:---",
    choices: ["JavaScript","terminal","console.log","alerts"],
    answer: "console.log"
  },
  {
    title: "Inside which HTML element do we put the JavaScript:---",
    choices: ["<script>","<javascript>","<scripting>","<js>" ],
    answer: "<script>"
  }
]
var optionsEl = document.getElementById("options");
var questionsEl = document.getElementById("all-questions");
var initialsEl = document.getElementById("initials");
var resultEl = document.getElementById("result");
var timer
var timerEl = document.getElementById("time-left");
var currentIndex = 0;
var time = 75;


function startQuiz() {

  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");


  questionsEl.removeAttribute("class");


  timer = setInterval(clockTick, 1000);


  timerEl.textContent = time;

  allQuestions();
}

function allQuestions() {

  var currentQuestion = questions[currentIndex];


  var titleEl = document.getElementById("question");
  titleEl.textContent = currentQuestion.title;


  optionsEl.innerHTML = "";


  currentQuestion.choices.forEach(function(choice, i) {

    var eachChoice = document.createElement("button");
    eachChoice.setAttribute("class", "choice");
    eachChoice.setAttribute("value", choice);

    eachChoice.textContent = i + 1 + ". " + choice;


    eachChoice.onclick = answerClick;


    optionsEl.appendChild(eachChoice);
  });
}

function answerClick() {

  if (this.value !== questions[currentIndex].answer) {

    time -= 15;

    if (time < 0) {
      time = 0;
    }


    timerEl.textContent = time;

    resultsEl.textContent = "You're Wrong!";
  } else {
    resultsEl.textContent = "You're Correct!";
  }


  resultsEl.setAttribute("class", "result");
  setTimeout(function() {
    resultsEl.setAttribute("class", "result hide");
  }, 1000);


  currentIndex++;


  if (currentIndex === questions.length) {
    endQuiz();
  } else {
    allQuestions();
  }
}

function endQuiz() {

  clearInterval(timer);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("score");
  finalScoreEl.textContent = time;


  questionsEl.setAttribute("class", "hide");
}

function clockTick() {

  time--;
  timerEl.textContent = time;


  if (time <= 0) {
    endQuiz();
  }
}

function saveScore() {

  var initials = initialsEl.value.trim();


  if (initials !== "") {

    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];


    var myScore = {
      score: time,
      initials: initials
    };


    highscores.push(myScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));


    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {

  if (event.key === "Enter") {
    saveScore();
  }
}


initialsEl.onkeyup = checkForEnter;
