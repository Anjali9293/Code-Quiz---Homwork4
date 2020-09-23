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

var elements = {
  welcome: document.querySelector("#Welcome"),
  question: document.querySelector("#question-container"),
  description: document.querySelector("#description"),
  options: {
    all: document.querySelector("#answer-buttons"),
    a: document.querySelector("#a"),
    b: document.querySelector("#b"),
    c: document.querySelector("#c"),
    d: document.querySelector("#d")
  },
  results: document.querySelector("#result"),
  start: document.querySelector("#start"),
  timer: document.querySelector("#countDown")  
};

var timer;
var timerCount = 60;
var questionIndex = 0;
var scoreCount = 0;

function initiateQuiz() {
  timer = setInterval(startTimer, 1000);
  startTimer();
  displayQuestion();
}

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

function endTimer() {
  elements.timer.textContent = "Time ran out";
}

function prepareQuiz() {
  elements.start.classList.add("hide");
  elements.welcome.classList.add("hide");
  elements.description.classList.add("hide");
  elements.question.classList.remove("hide");
  elements.options.all.classList.remove("hide");
}

function displayQuestion() {
  elements.question.textContent = myQuestions[questionIndex].question;
  elements.options.a.textContent = myQuestions[questionIndex].answers.a;
  elements.options.b.textContent = myQuestions[questionIndex].answers.b;
  elements.options.c.textContent = myQuestions[questionIndex].answers.c;
  elements.options.d.textContent = myQuestions[questionIndex].answers.d;
  prepareQuiz();
}

function displayResults(result) {
  elements.results.textContent = result;
  elements.results.classList.remove("hide");
  setTimeout(hideResults, 1000);
}

function hideResults() {
  elements.results.classList.add("hide");  
}

function checkAnswer(event) {
  if (event.target.id == myQuestions[questionIndex].correctAnswer) {      
    myQuestions[questionIndex].correct = true;
    displayResults("Correct!")  
  } else displayResults("wrong!"); 

  nextQuestion();
}

function nextQuestion() {
  questionIndex++;
  displayQuestion(); 
}

elements.start.addEventListener("click", initiateQuiz);
elements.options.all.addEventListener("click", checkAnswer);



