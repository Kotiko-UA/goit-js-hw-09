import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const firstDelay = e.currentTarget.elements.delay.value;
  const step = e.currentTarget.elements.step.value;
  const amount = e.currentTarget.elements.amount.value;
  let currentDelay = Number(firstDelay);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let delay = currentDelay;

    console.log(delay);

    setTimeout(() => {
      createPromise(position, delay)
        .then(() => {})
        .catch(() => {});
    }, delay);

    currentDelay += Number(step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
    } else {
      reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    }
  });
}
