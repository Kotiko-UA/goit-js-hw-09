const refs = {
  btStart: document.querySelector('button[data-start]'),
  btStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.btStart.addEventListener('click', onStartClick);
refs.btStop.addEventListener('click', onStopClick);

function onStartClick() {
  refs.btStart.disabled = true;

  colorChangeInteval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStopClick() {
  refs.btStart.disabled = false;
  clearInterval(colorChangeInteval);
}
