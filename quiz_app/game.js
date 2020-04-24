const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const questionCounterText = document.getElementById("questionCounter");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [{
    "question": "What is Mardi Gras New Orleans?",
    "choice1": "Festival",
    "choice2": "Legend",
    "choice3": "Summer camp",
    "choice4": "Human",
    "answer": 1
  },
  {
    "question": "Which of the following is not one of New Orleans' Mardi Gras colors?",
    "choice1": "Green",
    "choice2": "Yellow",
    "choice3": "Blue",
    "choice4": "Purple",
    "answer": 3
  },
  {
    "question": "Which of the New Orleans Mardi Gras colors is not a Mobilian Mardi Gras color?",
    "choice1": "Yellow",
    "choice2": "Purple",
    "choice3": "Blue",
    "choice4": "Green",
    "answer": 4
  },
  {
    "question": "What medieval tradition can Mardi Gras be traced back to?",
    "choice1": "Parading held in celebration of Lent",
    "choice2": "Feasting before the arrival of Lent",
    "choice3": "The throwing of trinkets by children to celebrate Lent",
    "choice4": "Ordinary citizens dressing in costume to celebrate Lent",
    "answer": 2
  },
  {
    "question": "What is the name of the first mystic society, created in 1830?",
    "choice1": "Cowbellion de Rakin Society",
    "choice2": "The Lost Cause Minstrels",
    "choice3": "Crewe of Comos",
    "choice4": "Order of Myths",
    "answer": 1
  },
  {
    "question": "WWhen did this original mystic society hold its parade?",
    "choice1": "Easter Sunday",
    "choice2": "Mardi Gras Day",
    "choice3": "New Year's Eve",
    "choice4": "Christmas Eve",
    "answer": 3
  },
  {
    "question": "How did the Spanish add their touch to the French Mardi Gras?",
    "choice1": "By changing the name to 'Martes Gordo'",
    "choice2": "By holding lighted torch parades",
    "choice3": "By throwing woven Spanish dolls off of the floats",
    "choice4": "By marching on a different day",
    "answer": 2
  },
  {
    "question": "Which of the following was New Orleans' first mystic society?",
    "choice1": "Crewe of Columbus",
    "choice2": "Order of Inca",
    "choice3": "Crewe of Comos",
    "choice4": "Comic Cowboys",
    "answer": 3
  },
  {
    "question": "Which of the following individuals gained fame for reviving Mardi Gras after the Civil War?",
    "choice1": "Ethel Hodgson",
    "choice2": "Michael Kraft",
    "choice3": "Joseph Cain",
    "choice4": "Daniel E. Huger",
    "answer": 3
  },
  {
    "question": "Which of the following societies did Joseph Cain found?",
    "choice1": "Crewe of Comos",
    "choice2": "Order of Myths",
    "choice3": "Strikers Independent Society",
    "choice4": "Mystics of Time",
    "answer": 2
  },
  {
    "question": "What was the first black mystic society in Mobile?",
    "choice1": "Knights of May Zulu Club",
    "choice2": "Colored Carnival Association",
    "choice3": "Order of Mammoths",
    "choice4": "Order of Doves",
    "answer": 4
  },
  {
    "question": "Which of the following was Mobile's first women's society?",
    "choice1": "Polka Dots",
    "choice2": "Le Krewe de Bienville",
    "choice3": "Order of Athena",
    "choice4": "Mystical Ladies",
    "answer": 1
  },
  {
    "question": "What is Mardi Gras known as in the Christian calendar?",
    "choice1": "Shrove Tuesday",
    "choice2": "Lent",
    "choice3": "Ash Tuesday",
    "choice4": "Happy Tuesday",
    "answer": 1
  },
  {
    "question": "What Mobilian mystic society rides aboard floats that are decorated with sarcastic remarks and drawings and rarely throws candy and trinkets?",
    "choice1": "Comic Cowboys",
    "choice2": "Krewe of Goats",
    "choice3": "Knights of Revelry",
    "choice4": "Order of Athena",
    "answer": 1
  }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  console.log(availableQuesions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }

  questionCounter++;

  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;

};
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();