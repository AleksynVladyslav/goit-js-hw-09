const refs= {
  submitRef: document.querySelector('button[type = submit]'),
formRef: document.querySelector('.form'),
}

const {submitRef, formRef} = refs;

console.log(formRef.elements)

   submitRef.addEventListener('submit', onSubmitForm)

function onSubmitForm(event){
  console.log(event.currentTarget)  
  event.preventDefault()

return false
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//     fulfillCallback(position, delay)
//   } else {
//     // Reject
//     rejectCallback(position, delay)
//   }
// }
