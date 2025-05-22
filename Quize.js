const questions = [
  {
    question: "What does `typeof NaN` return in JavaScript?",
    options: ["'object'", "'NaN'", "'number'", "'undefined'"],
    correctAnswer: "'number'",
  },
  {
    question:
      "Which method is used to add a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
  },
  {
    question: "Which operator checks both value and type?",
    options: ["==", "!=", "===", "<="],
    correctAnswer: "===",
  },
  {
    question: "Which function is used to parse a string as an integer?",
    options: ["parseInt()", "parseFloat()", "Number()", "toString()"],
    correctAnswer: "parseInt()",
  },
  {
    question: "Which of the following is not a valid JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    correctAnswer: "Character",
  },
 
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionContainer = document.getElementById("question-container");

  questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <form id="answers">
            ${currentQuestion.options
              .map(
                (option, index) => `
                <label>
                    <input type="radio" name="answer" value="${option}"> ${option}
                </label><br>
            `
              )
              .join("")}
        </form>
    `;
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  if (!selectedAnswer) {
    feedback.innerHTML = "Please select an answer!";
    return;
  }

  const answer = selectedAnswer.value;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Highlighting the correct and incorrect answers
  const options = document.querySelectorAll('input[name="answer"]');
  options.forEach((option) => {
    if (option.value === correctAnswer) {
      option.parentElement.classList.add("correct");
    } else if (option.value === answer) {
      option.parentElement.classList.add("incorrect");
    }
  });

  // Update score if correct
  if (answer === correctAnswer) {
    correctAnswersCount++;
    feedback.innerHTML = "Correct!";
  } else {
    feedback.innerHTML = "Incorrect. Try again!";
  }

  // Show Next button and hide Submit
  nextBtn.style.display = "block";
  submitBtn.style.display = "none";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "block";
  } else {
    displayFinalScore();
  }
}

function displayFinalScore() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById("score").textContent = correctAnswersCount;
}

// Initialize the quiz
loadQuestion();
