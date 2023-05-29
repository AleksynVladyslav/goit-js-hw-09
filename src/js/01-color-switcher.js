const refs = {
  bodyRef: document.querySelector('body'),
  buttonStartRef: document.querySelector('button[data-start]'),
  buttonStopRef: document.querySelector('button[data-stop]'),
};
const { bodyRef, buttonStartRef, buttonStopRef } = refs;
buttonStopRef.setAttribute('disabled', true);

let timerId = null;

buttonStartRef.addEventListener('click', onStartChangeBg);
buttonStopRef.addEventListener('click', onStopChangeBg);

function onStartChangeBg(event) {
  buttonStopRef.removeAttribute('disabled');
  event.target.setAttribute('disabled', true);

  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  return timerId;
}

function onStopChangeBg(event) {
  event.target.setAttribute('disabled', true);
  buttonStartRef.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
