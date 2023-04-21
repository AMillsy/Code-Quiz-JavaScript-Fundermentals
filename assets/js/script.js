const startBtn = document.querySelector(`.start`);
const choiceEl = document.querySelector(`#choices`);
const welcomeSect = document.querySelector(`#welcome`);
const questionSect = document.querySelector(`#questions`);
const timerEl = document.querySelector(`#timer`);
const titleEL = document.querySelector(`#title`);
const feedbackEl = document.querySelector(`#feedback`);
const highscoreEl = document.querySelector(`#highscores`);
const scoreEl = document.querySelector(`#score`);

let timer;
let time = 0;
let currentQuestion = 0;
let score = 0;

//Start Game
startBtn.addEventListener(`click`, function (e) {
  time = 75;
  timerEl.textContent = setTimerVisuals();
  showSection(welcomeSect, false);
  questionSect.classList.remove(`hidden`);

  addQuestions();
  timer = setInterval(startTimer, 1000);
});

//Timer functions
function startTimer() {
  time--;
  timerEl.textContent = setTimerVisuals();

  if (time === 0) {
    clearInterval(timer);
    endGame();
  }
}

function setTimerVisuals() {
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, 0);

  return `${minutes}:${seconds}`;
}

function endGame() {
  highscoreScreen();
  /**Take the user to a new screen and ends the game */
}

//Question functions
choiceEl.addEventListener(`click`, function (e) {
  if (!e.target.matches(`.button`)) return;
  console.log(e.target);
  questionAns = questions[currentQuestion].answer;
  if (e.target.textContent === questionAns) {
    console.log(`Question is correct`);
    answerCorrectly(true);
  } else {
    console.log(`Question is wrong`);
    answerCorrectly(false);
    time -= 15;
  }

  currentQuestion++;
  addQuestions();
});

/**Adds the questions to the screen */
function addQuestions() {
  console.log();
  if (currentQuestion >= questions.length) highscoreScreen();
  else {
    choiceEl.innerHTML = "";
    const question = questions[currentQuestion];
    titleEL.textContent = question.title;
    for (const choice of question.choices) {
      const questionElement = `<li class="button">${choice}</li>`;
      choiceEl.insertAdjacentHTML(`afterbegin`, questionElement);
    }
  }
}

/**Shows a message that will tell the user if they got the answer right or wrong */
function answerCorrectly(gotCorrect) {
  feedbackEl.classList.remove(`hidden`);
  if (gotCorrect) {
    feedbackEl.style.color = `green`;
    feedbackEl.textContent = `Correct!`;
  } else {
    feedbackEl.style.color = `red`;
    feedbackEl.textContent = `Wrong`;
  }
  setTimeout(function () {
    feedbackEl.classList.add(`hidden`);
  }, 1000);
}

function highscoreScreen() {
  /**Shows the next screen */
  clearInterval(timer);
  score = time;
  scoreEl.textContent = `Your score: ${score}`;
  questionSect.classList.add(`hidden`);
  showSection(highscoreEl);
}

//Function to pick if the section should show or not.
function showSection(sect, shouldShow = true) {
  if (shouldShow) sect.style.display = `flex`;
  else sect.style.display = `none`;
}
