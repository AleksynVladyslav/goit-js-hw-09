// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

//refs
const inputRefs = document.querySelector('#datetime-picker');
const buttonRefs = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
// const refs = {
//   inputRefs: document.querySelector('#datetime-picker'),
//   buttonRefs: document.querySelector('button[data-start]'),
//   daysRef: document.querySelector('span[data-days]'),
//   hoursRef: document.querySelector('span[data-hours]'),
//   minutesRef: document.querySelector('span[data-minutes]'),
//   secondsRef: document.querySelector('span[data-seconds]'),
// };

// const { inputRefs, buttonRefs, daysRef, hoursRef, minutesRef, secondsRef } =
//   refs;

let timerId = null;

buttonRefs.disabled = true;
// flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates);
    const currentDate = this.defaultDate;

    if (selectedDate < currentDate) {
      alert('Please choose a date in the future');
      return;
    }

    buttonRefs.disabled = false;
  },
};
const flatpickr = flatpickr('#datetime-picker', options);

//Listenern
buttonRefs.addEventListener('click', onStartTimer);

function onStartTimer() {
  timerId = setInterval(timer, 1000);
}

function timer() {
  const selectedDate = new Date(inputRefs.value);
  const currentDate = Date.now();
  const diff = selectedDate - currentDate;

  if (diff <= 1000) {
    clearInterval(timerId);
  }
  updateCouter(convertMs(diff));
}

function updateCouter({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
