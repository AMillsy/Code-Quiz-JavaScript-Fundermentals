const startBtn = document.querySelector(`.start`);
const highscoreBtn = document.querySelector(`.highscore-btn`);
const submitBtn = document.querySelector(`.submit`);
const returnBtn = document.querySelector(`.return`);
const choiceEl = document.querySelector(`#choices`);
const welcomeSect = document.querySelector(`#welcome`);
const questionSect = document.querySelector(`#questions`);
const timerEl = document.querySelector(`#timer`);
const titleEL = document.querySelector(`#title`);
const feedbackEl = document.querySelector(`#feedback`);
const highscoreSubmitEl = document.querySelector(`#highscores-submit`);
const highscoreEl = document.querySelector(`#highscores`);
const scoreEl = document.querySelector(`#score`);
const nameInputEL = document.querySelector(`input`);
const errorMessageEl = document.querySelector(`.error-message`);
const highscoreTitleEl = document.querySelector(`.highscore-container`);

//Setting general variables
let timer;
let time = 0;
let currentQuestion = 0;
let score = 0;
let timeout;

//Timer function, start a timer when it hits 0, the game ends
function startTimer() {
  time--;
  if (time <= 0) {
    time = 0;
    clearInterval(timer);
    endGame();
  }
  timerEl.textContent = setTimerVisuals();
}

//Sets the visuals for the timer to 00:00 format
function setTimerVisuals() {
  const minutes = String(Math.floor(time / 60)).padStart(2, 0);
  const seconds = String(time % 60).padStart(2, 0);

  return `${minutes}:${seconds}`;
}
/*When the game ends, takes the user to the highscore
submitting section*/
function endGame() {
  highscoreSubmitScreen();
}

/**Adds the questions to the screen */
function addQuestions() {
  console.log();
  if (currentQuestion >= questions.length) highscoreSubmitScreen();
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
  clearTimeout(timeout);
  showSection(feedbackEl, true);
  if (gotCorrect) {
    feedbackEl.style.color = `green`;
    feedbackEl.textContent = `Correct!`;
  } else {
    feedbackEl.style.color = `red`;
    feedbackEl.textContent = `Wrong`;
  }
  timeout = setTimeout(function () {
    showSection(feedbackEl, false);
  }, 1000);
}

//Shows the submit section and asks the user to put in there initials
function highscoreSubmitScreen() {
  /**Shows the next screen */
  clearInterval(timer);
  score = time;
  scoreEl.textContent = `Your score: ${score}`;
  showSection(questionSect, false);
  showSection(highscoreSubmitEl);
}

//Function to pick if the section should show or not.
function showSection(sect, shouldShow = true) {
  if (shouldShow) sect.style.display = `flex`;
  else sect.style.display = `none`;
}

//Sorts the score by desending order and then displays to the screen
function highscoreSection() {
  currentQuestion = 0;
  highscoreTitleEl.innerHTML = ``;
  const orderedScores = [];
  //Order all the scores
  Object.keys(localStorage).forEach(function (key) {
    if (!(key === `debug`)) {
      const score = localStorage.getItem(key);
      orderedScores.push([key, score]);
      orderedScores.sort(function (a, b) {
        const [_, score1] = a;
        const [__, score2] = b;
        return score2 - score1;
      });
    }
  });

  //Put them onto screen
  for (const [name, score] of orderedScores) {
    const scoresHTML = `
      <div class="score">
        <h3 class="player-name">${name.toUpperCase()}:</h3>
        <p class="player-score">${score}</p>
      </div>
    `;
    highscoreTitleEl.insertAdjacentHTML(`beforeend`, scoresHTML);
  }
  showSection(questionSect, false);
  showSection(welcomeSect, false);
  showSection(highscoreSubmitEl, false);
  showSection(highscoreEl, true);
}

/**Event Handlers */

//Start Game
startBtn.addEventListener(`click`, function (e) {
  time = 75;
  timerEl.textContent = setTimerVisuals();
  showSection(welcomeSect, false);
  showSection(highscoreEl, false);
  showSection(questionSect, true);

  addQuestions();
  timer = setInterval(startTimer, 1000);
});

//Question Handler
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

//Submit name and score handler
submitBtn.addEventListener(`click`, function () {
  const name = nameInputEL.value;
  console.log(name);
  if (!name) {
    errorMessageEl.textContent = `Please enter in your initials`;
  } else {
    errorMessageEl.textContent = ``;
    localStorage.setItem(name, score);
    highscoreSection();
  }
});

//Showing highscore
highscoreBtn.addEventListener(`click`, function () {
  clearInterval(timer);
  highscoreSection();
});

//Return back from highscore
returnBtn.addEventListener(`click`, function () {
  showSection(highscoreEl, false);
  showSection(welcomeSect, true);
});
