// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

//refs
const refs = {
  inputRefs: document.querySelector('#datetime-picker'),
  buttonRefs: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};
refs.buttonRefs.disabled = true;
// flatpickr
function options() {
  return {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = new Date(selectedDates);
      const currentDate = Date.now();

      if (selectedDate < currentDate) {
        alert('Please choose a date in the future');
        return;
      }

      refs.buttonRefs.disabled = false;
    },
  };
}
const flatpickr = flatpickr('#datetime-picker', options());

//Listener
refs.buttonRefs.addEventListener('click', onStartTimer);

function onStartTimer() {
  timer();
}

function timer() {
  const timerId = setInterval(() => {
    const selectedDate = new Date(refs.inputRefs.value);
    const currentDate = Date.now();
    const diff = selectedDate - currentDate;

    if (diff <= 1000) {
      clearInterval(timerId);
    }
    updateCouter(convertMs(diff));
  }, 1000);
}

function updateCouter({ days, hours, minutes, seconds }) {
  refs.daysRef.textContent = addLeadingZero(days);
  refs.hoursRef.textContent = addLeadingZero(hours);
  refs.minutesRef.textContent = addLeadingZero(minutes);
  refs.secondsRef.textContent = addLeadingZero(seconds);
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
