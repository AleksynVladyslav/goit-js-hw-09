const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const del = Number(event.currentTarget.elements[0].value);
  const step = Number(event.currentTarget.elements[1].value);
  const amount = Number(event.currentTarget.elements[2].value);

  createPromises(step, del, amount)
    .then(results => {
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          const { step, delay } = result.value;
          console.log(`✅ Fulfilled promise ${step} in ${delay}ms`);
        } else if (result.status === 'rejected') {
          const { step, delay } = result.reason;
          console.log(`❌ Rejected promise ${step} in ${delay}ms`);
        }
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
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

function createPromises(step, delay, amount) {
  const promises = [];

  for (let i = 0; i < amount; i++) {
    const promise = createPromise(1 + i, delay + i * step);
    promises.push(promise);
  }

  return Promise.allSettled(promises);
}
