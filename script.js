var quizWelcome = document.getElementById('Welcome');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start');
var paraTag = document.getElementById('para');
var questionContainer = document.getElementById('question-container');
var answerButtons = document.getElementById('answer-buttons');
var resultDisplay = document.querySelector("#result");
var linedisplay =document.querySelector("#line");
var TimerCount =document.querySelector("#countDown");
var questionIndex = 0;
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
      },

  ];


  startButton.addEventListener("click",displayQuestions);

  function displayQuestions(){
      startButton.classList.add('hide');
      quizWelcome.classList.add('hide');
      paraTag.classList.add('hide');
      questionContainer.classList.remove('hide');
      answerButtons.classList.remove('hide');
    
        
        var ques = myQuestions[questionIndex].question;
        var option1 = myQuestions[questionIndex].answers.a;
        var option2 = myQuestions[questionIndex].answers.b;
        var option3 = myQuestions[questionIndex].answers.c;
        var option4 = myQuestions[questionIndex].answers.d;

        console.log("option1");

       document.querySelector("#question-container").textContent = ques;
       document.querySelector("#a").textContent = option1;
       document.querySelector("#b").textContent = option2;
       document.querySelector("#c").textContent = option3;
       document.querySelector("#d").textContent = option4;
       

       
    }
  
    answerButtons.addEventListener("click",function(event){
        console.log(questionIndex,myQuestions[questionIndex], myQuestions);
     if (event.target.id == myQuestions[questionIndex].correctAnswer )
     {
         resultDisplay.classList.remove('hide');
         linedisplay.classList.remove('hide');
         resultDisplay.textContent = "Correct!";
         myQuestions[questionIndex].correct = true;
     }
     else{
         resultDisplay.classList.remove('hide');
         linedisplay.classList.remove('hide');
         resultDisplay.textContent = "wrong!";
     }
        console.log(event.target.id);
        questionIndex = questionIndex + 1;
        displayQuestions();
    });

    startButton.addEventListener("click",initiateTimer);
    var timeIntervalUp = 0;
    var secondsDown = 60;
    function initiateTimer(){
    timeIntervalUp = setInterval(startTimer, 1000);
    }
    function startTimer(){
      TimerCount.classList.remove('hide');
      console.log("working???");
      TimerCount.textContent = "Time: " + secondsDown;
      secondsDown--;
      if (secondsDown == 0) {
        clearInterval(timeIntervalUp);
        endTimer();

    }
  }
  function endTimer() {   
  TimerCount.textContent = "Time ran out";
   }