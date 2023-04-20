const startBtn = document.querySelector(`.start`);
const welcomeSect = document.querySelector(`#welcome`);
const questionSect = document.querySelector(`#questions`);
const timerEl = document.querySelector(`#timer`);
let timer;
let time = 0;
startBtn.addEventListener(`click`, function (e) {
  time = 20;
  timerEl.textContent = setTimerVisuals();
  welcomeSect.style.display = `none`;
  questionSect.classList.remove(`hidden`);

  timer = setInterval(startTimer, 1000);
});

//Timer functions
function startTimer() {
  time--;
  timerEl.textContent = setTimerVisuals();

  if (time === 0) {
    clearInterval(timer);
    //ENTER NEXT SCREEN
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
