const e=document.querySelector(".form");e.addEventListener("submit",function(e){e.preventDefault();let t=Number(e.currentTarget.elements[0].value),l=Number(e.currentTarget.elements[1].value),r=Number(e.currentTarget.elements[2].value);(function(e,t,l){let r=[];for(let n=0;n<l;n++){let l=function(e,t){return new Promise((l,r)=>{let n=Math.random()>.3;setTimeout(()=>{n?l({step:e,delay:t}):r({step:e,delay:t})},t)})}(1+n,t+n*e);r.push(l)}return Promise.allSettled(r)})(l,t,r).then(e=>{e.forEach(e=>{if("fulfilled"===e.status){let{step:t,delay:l}=e.value;console.log(`✅ Fulfilled promise ${t} in ${l}ms`)}else if("rejected"===e.status){let{step:t,delay:l}=e.reason;console.log(`❌ Rejected promise ${t} in ${l}ms`)}})}).catch(e=>{console.log("Error:",e)})});
//# sourceMappingURL=03-promises.25d01ad0.js.map
