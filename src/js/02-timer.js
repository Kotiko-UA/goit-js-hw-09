import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBt: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
const date = new Date();

refs.startBt.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < date.getTime()) {
      refs.startBt.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.startBt.disabled = false;
    }
    const dateDifference = selectedDates[0].getTime() - date.getTime();
    const countdawnData = convertMs(dateDifference);

    refs.daysEl.textContent = addLeadingZero(countdawnData.days.toString());
    refs.hoursEl.textContent = addLeadingZero(countdawnData.hours.toString());
    refs.minutesEl.textContent = addLeadingZero(
      countdawnData.minutes.toString()
    );
    refs.secondsEl.textContent = addLeadingZero(
      countdawnData.seconds.toString()
    );
    refs.startBt.addEventListener('click', () => {
      onClick(dateDifference);
    });
  },
};
flatpickr(refs.inputEl, options);

function onClick(date) {
  interval = setInterval(() => {
    const countdawnData = convertMs((date -= 1000));
    refs.daysEl.textContent = addLeadingZero(countdawnData.days.toString());
    refs.hoursEl.textContent = addLeadingZero(countdawnData.hours.toString());
    refs.minutesEl.textContent = addLeadingZero(
      countdawnData.minutes.toString()
    );
    refs.secondsEl.textContent = addLeadingZero(
      countdawnData.seconds.toString()
    );
    if (date < 1000) {
      clearInterval(interval);
      Notify.success('Тікай з села');
    }
  }, 1000);
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
