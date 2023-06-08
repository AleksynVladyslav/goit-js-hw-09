const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let del = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  if (del <= 0 || step <= 0 || amount <= 0) {
    event.target.reset();

    return alert('Values must be greater than 0');
  }

  for (let i = 1; i <= amount; i += 1) {
    const currentPosition = i;
    createPromise(step, del)
      .then(({ delay }) => {
        console.log(`✅ Fulfilled promise ${currentPosition} in ${delay}ms`);
      })
      .catch(({ delay }) => {
        console.log(`❌ Rejected promise ${currentPosition} in ${delay}ms`);
      });
    del += step;
  }
  event.target.reset();
}

function createPromise(step, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ step, delay });
      } else {
        reject({ step, delay });
      }
    }, delay);
  });
}
