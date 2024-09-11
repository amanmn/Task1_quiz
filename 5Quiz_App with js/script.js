const questions = [
    {
        question: "what is java script?",
        answers: [
            { text: "platform", correct: false },
            { text: "programming language", correct: true },
            { text: "Error", corect: false },
            { text: "exception", correct: false }
        ]
    },
    {
        question: "Inside which html element do we put the javascript",
        answers: [
            { text: "javascript", correct: false },
            { text: "script", correct: true },
            { text: "js", correct: false },
            { text: "html", correct: false }
        ]
    },
    {
        question: "The function and var are known as?",
        answers: [
            { text: "keywords", correct: false },
            { text: "data types", correct: true },
            { text: "declaration statements", correct: false },
            { text: "prototypes", correct: false }
        ]
    },
    {
        question: "which of the following is ternary  operator",
        answers: [
            { text: ":", correct: false },
            { text: "?", correct: true },
            { text: "-", correct: false },
            { text: "+", correct: false }
        ]
    },
    {
        question: "which of the following is ternary  operator",
        answers: [
            { text: ":", correct: false },
            { text: "?", correct: true },
            { text: "-", correct: false },
            { text: "+", correct: false }
        ]
    },
    {
        question: "What is the output of console.log(typeof null);?",
        answers: [
            { text: "object", correct: true },
            { text: "null", correct: false },
            { text: "undefined", correct: false },
            { text: "boolean", correct: false }
        ]

    },
    {
        question: "Which method is used to parse a string and return an integer in JavaScript?",
        answers: [
            { text: "parseInt()", correct: true },
            { text: "parseFloat()", correct: false },
            { text: "Number()", correct: false },
            { text: "String()", correct: false }
        ]

    },
    {
        question: "What is the result of the following code: 2 + '2'?",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: true },
            { text: "NaN", correct: false },
            { text: "undefined", correct: false }
        ]

    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function myFunction() {}", correct: true },
            { text: "create function myFunction() {}", correct: false },
            { text: "def myFunction() {}", correct: false },
            { text: "func myFunction() {}", correct: false }
        ]

    },
    {
        question: "Which of the following is a valid way to declare a variable in JavaScript?",
        options: [
            { text: "var myVar", correct: false },
            { text: "variable myVar", correct: false },
            { text: "v myVar", correct: true },
            { text: "myVar := 0", correct: false }
        ]
    }
    // {
    //     question: "What is the result of the expression 0 == '0'?",
    //     options: ["true", "false", "undefined", "NaN"],
    //     answer: "true"
    // },
    // {
    //     question: "Which keyword is used to create a new object in JavaScript?",
    //     options: ["new", "create", "make", "object"],
    //     answer: "new"
    // },
    // {
    //     question: "What will console.log([] == ![]) output?",
    //     options: ["true", "false", "undefined", "null"],
    //     answer: "true"
    // },
    // {
    //     question: "What does JSON.stringify() do?",
    //     options: ["Converts a JavaScript object to a JSON string", "Parses a JSON string into a JavaScript object", "Converts a JSON string to a JavaScript object", "None of the above"],
    //     answer: "Converts a JavaScript object to a JSON string"
    // },
    // {
    //     question: "How can you add a comment in JavaScript?",
    //     options: ["// This is a comment", "# This is a comment", "/* This is a comment */", "<!-- This is a comment -->"],
    //     answer: "// This is a comment"
    // }
];

const questionElement = document.querySelector("#questions");
const answerButtons = document.querySelector(".btn");
const nextBtn = document.querySelector('#next-btn');
const time = document.getElementById('timer');
const finishButton = document.querySelector('#finish-btn')
const incorrect = document.querySelector('.wrong-text');
const attempted = document.querySelector('.attemted-text');
const hateAnswers = document.querySelector('.hate-text');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

let attemptedQuestions = 0;
let incorrectAnswer = 0;
let totalHateAnswers = 0;


function startTimer() {
    timeLeft = 30;
    time.style.display = "block";
    time.style.color = "white";
    timer = setInterval(() => {
        timeLeft--;
        time.innerHTML = `Time Left  : ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextBtn.click();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    time.innerText = `Time Left: ${timeLeft}`;
    timeLeft = 30;
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    attemptedQuestions = 0;
    incorrectAnswer = 0;
    totalHateAnswers = 0;
    nextBtn.innerHTML = "Next";
    incorrect.style.display = 'none';
    attempted.style.display = 'none';
    hateAnswers.style.display = 'none';
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    tryAgain();
    attemptedQuestions++;
    questionElement.style.display = "block";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("li")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
    resetTimer();
}

function resetState() {
    finishButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    resetTimer();

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        incorrectAnswer++;
        totalHateAnswers++;
        selectedBtn.classList.add("incorrect");
        selectedBtn.style.color = "red";
    }

    Array.from(answerButtons.children).forEach(li => {
        li.classList.add('disabled');
        if (li.dataset.correct === "true") {
            li.classList.add("correct");
        }
    })
    nextBtn.style.display = "block";
}

function tryAgain() {
    nextBtn.onclick = () => {
        startTimer();
    }
}
function showScore() {
    // resetTimer();
    resetState();
    negativeScore = score - (totalHateAnswers / 2);
    console.log('score ', score);
    console.log('hateAnswers ', hateAnswers);
    hateAnswers.innerHTML = `Correct Answers : ${score}`;
    hateAnswers.style.display = "block";

    questionElement.innerHTML = `you scored ${negativeScore} out of ${questions.length}!`;
    nextBtn.style.display = "block";
    nextBtn.innerHTML = "Play Again";
    finishButton.innerText = 'Finish';
    finishButton.style.display = "block";
    finishBtn();
    incorrect.style.display = 'block';
    attempted.style.display = 'block';
    attempted.innerHTML = `Attempted Questions : ${attemptedQuestions}`
    incorrect.innerHTML = `Wrong Answers : ${incorrectAnswer}`;
    document.getElementById('timer').style.display = "none";

}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
        resetTimer();
        resetGif();
    }
})

function finishBtn() {
    finishButton.style.backgroundColor = '#001e4d';
    finishButton.style.color = '#fff';
    finishButton.addEventListener('click', () => {
        showGif();
        nextBtn.style.display = "none";
    })
}

function showGif() {
    finishButton.style.display = "none";
    const gif = document.createElement('img');
    gif.src = 'https://i.pinimg.com/originals/ab/64/35/ab6435e58230af747beaee7778244f71.gif';
    gif.alt = 'congratulation';
    gif.style.width = '300px';
    gif.style.display = 'block';
    questionElement.appendChild(gif);
}

function resetGif() {
    finishButton.style.display = "block";
    const gif = document.getElementById('finish-btn');
    if (gif) {
        gif.remove(); // Remove the GIF from the DOM
    }
}

startQuiz();