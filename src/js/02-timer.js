import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix';

let convertedTime = {};
let delta = null;
let futureTime = null;
const DELAY = 1000;

const refs = {
    dateTimeInput: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysField: document.querySelector('[data-days]'),
    hoursField: document.querySelector('[data-hours]'),
    minutesField: document.querySelector('[data-minutes]'),
    secondsField: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', timer);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
};

function startData({days, hours, minutes, seconds}) {
    refs.daysField.textContent = days;
    refs.hoursField.textContent = hours;
    refs.minutesField.textContent = minutes;
    refs.secondsField.textContent = seconds;
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {        
        if (selectedDates[0].getTime() <= Date.now()) {
            Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
            futureTime = selectedDates[0].getTime();
        };
    },
};
flatpickr(refs.dateTimeInput, options);

function timer() {
    refs.startBtn.disabled = true;
    const timerId = setInterval(() => {
        delta = futureTime - Date.now();
    
        if (delta <= 0) {
            clearInterval(timerId);
            Notify.success('Countdown is over');
        } else {
            convertedTime = convertMs(delta);
            startData(convertedTime)
        }
    }, DELAY);
};
