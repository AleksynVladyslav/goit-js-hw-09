const e=document.querySelector(".form");e.addEventListener("submit",function(e){e.preventDefault();let t=Number(e.currentTarget.elements.delay.value),r=Number(e.currentTarget.elements.step.value),l=Number(e.currentTarget.elements.amount.value);if(t<=0||r<=0||l<=0)return e.target.reset(),alert("Values must be greater than 0");for(let e=1;e<=l;e+=1){let l=e;(function(e,t){return new Promise((r,l)=>{let n=Math.random()>.3;setTimeout(()=>{n?r({step:e,delay:t}):l({step:e,delay:t})},t)})})(r,t).then(({delay:e})=>{console.log(`✅ Fulfilled promise ${l} in ${e}ms`)}).catch(({delay:e})=>{console.log(`❌ Rejected promise ${l} in ${e}ms`)}),t+=r}e.target.reset()});
//# sourceMappingURL=03-promises.919b2ef8.js.map
