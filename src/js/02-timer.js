import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  buttonRef: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};

const { inputRef, buttonRef, daysRef, hoursRef, minutesRef, secondsRef } = refs;

let timerId = null;

buttonRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('Please choose a date in the future');
      inputRef.value = ''; // Clear the input value
      buttonRef.disabled = true; // Disable the button
      return;
    }

    buttonRef.disabled = false;
  },
};

const datepicker = flatpickr(inputRef, options);

buttonRef.addEventListener('click', onStartTimer);

function onStartTimer() {
  timerId = setInterval(timer, 1000);
  buttonRef.disabled = true;
}

function timer() {
  const selectedDate = new Date(inputRef.value);
  const currentDate = new Date();
  const diff = selectedDate - currentDate;

  if (diff <= 0) {
    clearInterval(timerId);
    updateCounter({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    console.log('Countdown completed!');
    return;
  }

  updateCounter(convertMs(diff));
}

function updateCounter({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
