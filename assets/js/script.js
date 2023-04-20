const startBtn = document.querySelector(`.start`);
const choiceEl = document.querySelector(`#choices`);
const welcomeSect = document.querySelector(`#welcome`);
const questionSect = document.querySelector(`#questions`);
const timerEl = document.querySelector(`#timer`);
const titleEL = document.querySelector(`#title`);

let timer;
let time = 0;
let currentQuestion = 0;

//Start Game
startBtn.addEventListener(`click`, function (e) {
  time = 20;
  timerEl.textContent = setTimerVisuals();
  welcomeSect.style.display = `none`;
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
  /**Take the user to a new screen and ends the game */
}

//Question functions
choiceEl.addEventListener(`click`, function (e) {
  if (!e.target.matches(`.button`)) return;
  console.log(e.target);
  questionAns = questions[currentQuestion].answer;
  if (e.target.textContent === questionAns) {
  }

  currentQuestion++;
  addQuestions();
});
function addQuestions() {
  if (currentQuestion >= questions.length) highscoreScreen();
  choiceEl.innerHTML = "";
  const question = questions[currentQuestion];
  titleEL.textContent = question.title;
  for (const choice of question.choices) {
    const questionElement = `<li class="button">${choice}</li>`;
    choiceEl.insertAdjacentHTML(`afterbegin`, questionElement);
  }
}

function showMessage(msg) {
  /**Shows a message that will tell the user if they got the answer right or wrong */
}

function highscoreScreen() {
  /**Shows the next screen */
}
