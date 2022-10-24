import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const timer = document.querySelector('.timer');
const fields = document.querySelectorAll(".field");
const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const texts = document.querySelectorAll('.label');
const values = document.querySelectorAll('.value');



timer.style.display = 'flex';
timer.style.gap = '20px';
timer.style.paddingTop = '20px';


for (let i = 0; i < fields.length; i+=1) {
  const field = fields[i];
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.justifyContent = 'center';
  field.style.alignItems = 'center';
}
for (let i = 0; i < texts.length; i+=1) {
 const text = texts[i];
  text.style.fontSize = '15px';
  text.style.textTransform = 'uppercase';
}
for (let i = 0; i < values.length; i+=1) {
  const value = values[i];
   value.style.fontSize = '45px';
 }

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
         
    } else {
      startBtn.disabled = false;
    }
 
  },
};
flatpickr(dateTimePicker, options);
 

function convertMs(ms) {
//   // Number of milliseconds per unit of time
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    startBtn.disabled = true;

    const futureDate = new Date(dateTimePicker.value);
    const currentDate = new Date();
    let timeDifference = futureDate - currentDate; 
    
      if (timeDifference >= 0) {
      let remainingTime = convertMs(timeDifference);
      days.textContent = addLeadingZero(remainingTime.days);
      hours.textContent = addLeadingZero(remainingTime.hours);
      minutes.textContent = addLeadingZero(remainingTime.minutes);
      seconds.textContent = addLeadingZero(remainingTime.seconds);
      if (timeDifference <= 1000) {
            Notiflix.Notify.success('Countdown finished');
      clearInterval(timerId);      
      }} 
  }, 1000);

});
