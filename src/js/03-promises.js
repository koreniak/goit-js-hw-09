import { Notify } from 'notiflix';

const refs ={
  delayInput: document.querySelector('[name=delay]'),
  stepInput: document.querySelector('[name=step]'),
  amountInput: document.querySelector('[name=amount]'),
  submitForm: document.querySelector('.form')
}
refs.submitForm.addEventListener('submit', onSubmit)

function onSubmit(e) {
  e.preventDefault();

  const {
    elements: {delay, step, amount}
  } = e.currentTarget;

  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i, delayValue)
    .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
    .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
      delayValue += stepValue
  }
  e.currentTarget.reset();
};


function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      };
    }, delay);
    });

    return promise;
};

