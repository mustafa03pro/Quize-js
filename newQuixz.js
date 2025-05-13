
  const questions = [
    {
      question: "What does === mean in JavaScript?",
      options: ["Assignment operator", "Equal value", "Strict equality", "Inequality"],
      answer: 2
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Oracle", "TVS", "Netscape"],
      answer: 3
    },
    {
      question: "Which keyword is used to declare a variable in ES6?",
      options: ["var", "int", "let", "define"],
      answer: 2
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: ["<!-- -->", "##", "//", "/* */"],
      answer: 2
    },
    {
      question: "Which of the following is a JavaScript data type?",
      options: ["String", "Character", "Float", "Double"],
      answer: 0
    },
    {
      question: "How do you convert a string to an integer in JavaScript?",
      options: ["parseInt()", "String()", "int()", "Number()"],
      answer: 0
    },
    {
      question: "What is the output of 'typeof NaN'?",
      options: ["number", "NaN", "undefined", "object"],
      answer: 0
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0
    },
    {
      question: "What does DOM stand for?",
      options: ["Document Object Model", "Data Object Method", "Document Oriented Method", "Dynamic Object Management"],
      answer: 0
    },
    {
      question: "Which operator is used for exponentiation in JavaScript?",
      options: ["^", "**", "exp", "pow"],
      answer: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionEl = document.getElementById("questions");
  const optionsForm = document.getElementById("optionsform");
  const feedbackEl = document.getElementById("feedback");
  const submitBtn = document.getElementById("submitbtn");
  const nextBtn = document.getElementById("nextbtn");
  const scoreEl = document.getElementById("score");

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
    optionsForm.innerHTML = "";
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    nextBtn.style.display = "none";
    submitBtn.disabled = false;

    q.options.forEach((opt, i) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "option";
      input.value = i;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      optionsForm.appendChild(label);
    });
  }

  submitBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) return alert("Please select an option.");

    const selectedValue = parseInt(selected.value);
    const correct = questions[currentQuestion].answer;

    Array.from(optionsForm.children).forEach((label, index) => {
      if (index === correct) label.classList.add("correct");
      else if (index === selectedValue) label.classList.add("incorrect");
    });

    if (selectedValue === correct) {
      feedbackEl.textContent = "Correct!";
      feedbackEl.className = "feedback correct";
      score++;
    } else {
      feedbackEl.textContent = "Incorrect! Try again.";
      feedbackEl.className = "feedback incorrect";
    }

    submitBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  });

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      questionEl.textContent = "Quiz Completed!";
      optionsForm.innerHTML = "";
      feedbackEl.textContent = "";
      submitBtn.style.display = "none";
      nextBtn.style.display = "none";
      scoreEl.textContent = `Your Score: ${score}/${questions.length}`;
    }
  });

  loadQuestion();

