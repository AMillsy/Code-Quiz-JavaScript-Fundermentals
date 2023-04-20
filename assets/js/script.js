const startBtn = document.querySelector(`.start`);
const welcomeSect = document.querySelector(`#welcome`);
const questionSect = document.querySelector(`#questions`);

startBtn.addEventListener(`click`, function (e) {
  welcomeSect.style.display = `none`;
  questionSect.classList.remove(`hidden`);
});
