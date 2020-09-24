//object displaying questions,options and correct answer
var myQuestions = [
  {
      question: "1.How can you get the type of arguments passed to a function?",
      answers: {
          a: "using typeof operator",
          b: "using getType function",
          c: "Both of the above",
          d: "None of the above."
      },
      correct: false,
      correctAnswer: "a"
  },
  {
      question: "2.Which of the following function of Number object defines how many total digits to display of a number?",
      answers: {
          a: "toExponential()",
          b: "toFixed()",
          c: "toPrecision()",
          d: "toLocaleString()"
      },
      correct: false,
      correctAnswer: "b"
  },
  {
      question: "3.Which of the following function of String object returns the calling string value converted to upper case?",
      answers: {
          a: "toLocaleUpperCase()",
          b: "toUpperCase()",
          c: "toString()",
          d: "substring()"
      },
      correct: false,
      correctAnswer: "d"
  },
  {
      question: "4.Which built-in method removes the last element from an array and returns that element?",
      answers: {
          a: "last()",
          b: "get()",
          c: "pop()",
          d: "None of the above"
      },
      correct: false,
      correctAnswer: "c"
  },
  {
      question: "5.Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?",
      answers: {
          a: "push()",
          b: "join()",
          c: "pop()",
          d: "map()"
      },
      correct: false,
      correctAnswer: "d"
    }
];

//object to link elements in the document 
var elements = {
  page: {
    Welcome: document.querySelector("#WelcomePage"),
    Question: document.querySelector("#QuestionPage"),
    Results: document.querySelector("#ResultsPage"),
    Highscore: document.querySelector("#HighscorePage"),
  },
  question: document.querySelector("#question-container"),
  description: document.querySelector("#description"),
  options: {
    all: document.querySelector("#answer-buttons"),
    a: document.querySelector("#a"),
    b: document.querySelector("#b"),
    c: document.querySelector("#c"),
    d: document.querySelector("#d")
  },
  message: document.querySelector("#message"),
  start: document.querySelector("#start"),
  timer: document.querySelector("#countDown"),
  Finalscore: document.querySelector("#score"), 
  UserInitials: document.querySelector("#initials"),
  SubmitScore: document.querySelector("#submitScore"),
  HighscoreList: document.querySelector("#HighscoreList"),
  BackButton:document.querySelector("#go-back"),
  ClearHighscore:document.querySelector("#clear-highscore")
};

var timer;
var timerCount = 60;
var questionIndex = 0;
var scoreCount = 0;
var resultsTimeout = null;
var highscores = JSON.parse(localStorage.highscores|| "[]") ;

//function to initaite the quiz
function initiateQuiz() {
  timer = setInterval(startTimer, 1000);
  startTimer();
  displayQuestion();
}
//function to run the timer
function startTimer() {  
  timerCount--;
  if (timerCount == 0) {
      clearInterval(timer);
      endTimer();
  } else {    
    elements.timer.classList.remove("hide");
    elements.timer.textContent = "Time: " + timerCount;
  }
}
//function to end the timer
function endTimer() {
  elements.timer.textContent = "Time ran out";
}
//function to hide welcome page and display questions page
function prepareQuiz() {
  elements.page.Welcome.classList.add("hide");
  elements.page.Question.classList.remove("hide");
}
//function to display question and options
function displayQuestion() {
  elements.question.textContent = myQuestions[questionIndex].question;
  elements.options.a.textContent = myQuestions[questionIndex].answers.a;
  elements.options.b.textContent = myQuestions[questionIndex].answers.b;
  elements.options.c.textContent = myQuestions[questionIndex].answers.c;
  elements.options.d.textContent = myQuestions[questionIndex].answers.d;
  prepareQuiz();
}
//function to display the message if the user selected answer is correct or wrong
function displayMessage(result) {
  elements.message.textContent = result;
  elements.message.classList.remove("hide");
  if(resultsTimeout) {
    clearTimeout(resultsTimeout);
  }
  resultsTimeout = setTimeout(hideMessage, 1000);
}
//function to hide the correct/incorrect message
function hideMessage() {
  elements.message.classList.add("hide");  
}
//function to verify whether the user selected answer is correct
function checkAnswer(event) {
  if (event.target.id == myQuestions[questionIndex].correctAnswer) {      
    myQuestions[questionIndex].correct = true;
    displayMessage("Correct!")  
  } else displayMessage("wrong!"); 
  nextQuestion();
}
//function to display next question
function nextQuestion() {
  questionIndex++;
  if(myQuestions[questionIndex]) displayQuestion();
  else displayResults(); 
}
//function to display the user score in %
function displayResults() {
  elements.page.Results.classList.remove("hide");
  elements.page.Question.classList.add("hide");

  var score = myQuestions.map(function(question,index) {
    return question.correct;
  }).reduce((a, b) => a + b, 0);
  var percentage = score/myQuestions.length*100;
  elements.Finalscore.textContent = percentage+"%";
  
}
//function to submit the score and store the result in local storage
function scoreSubmit(){
  highscores.push({
    initials: elements.UserInitials.value,
    score: elements.Finalscore.textContent
  });
  highscores = highscores.sort(function(a, b){
    var first = parseInt(b.score.replace("%", ""));
    var second = parseInt(a.score.replace("%", ""));
    return first-second
  });
  localStorage.highscores = JSON.stringify(highscores);
  elements.UserInitials.value = "";
  displayHighscore();
}
//function to display the list of all the highscore stored in local storage
function displayHighscore() {
  elements.HighscoreList.innerHTML = "";
  elements.page.Results.classList.add("hide");
  elements.page.Highscore.classList.remove("hide");
  elements.BackButton.classList.remove("hide");
  elements.ClearHighscore.classList.remove("hide");
  elements.message.classList.add("hide");  

  highscores.forEach(function(score, i) {
    var highscoreStr = (i+1) + ". " + score.initials + " - " + score.score;
    var node = document.createElement("li");               
    var textnode = document.createTextNode(highscoreStr);        
    node.appendChild(textnode);                             
    elements.HighscoreList.appendChild(node);     
  });

}
//function to clear list of high scores displayed on the page
function highScoreClear(){
  highscores = [];
  localStorage.highscores = JSON.stringify(highscores);
  displayHighscore();
}
//function to return back to the quiz start page
function backToHome(){
  questionIndex = 0;
  elements.page.Highscore.classList.add("hide");
  elements.page.Welcome.classList.remove("hide"); 
}

elements.start.addEventListener("click", initiateQuiz);
elements.options.all.addEventListener("click", checkAnswer);
elements.SubmitScore.addEventListener("click",scoreSubmit);
elements.ClearHighscore.addEventListener("click",highScoreClear)
elements.BackButton.addEventListener("click",backToHome);

