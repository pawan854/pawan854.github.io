let count;
let newCount = 30;
let once = true;
let stoppedAt;
let isResumed = false;
let timer1;
let timer2;
let counterArray = [];

function counter() {
   count = newCount + 1;
   start.disabled = true;
   pause.disabled = false;
   end.disabled = false;
   resume.disabled = true;
   clear1.disabled = false;

   timer1 = setInterval(() => {
      if (count <= 1) stopCounter(timer1);
      count--;
      stoppedAt = count;
      console.log(count);
      stopWatchArea.innerHTML = `00:${count}s`;
   }, 1000);
}

function stopCounter() {
   stopWatchArea.innerHTML = `00:00`;
   start.disabled = false;
   pause.disabled = true;
   end.disabled = true;
   resume.disabled = true;
   console.log('counter stop at:', count);
   clearInterval(timer1);

   if (isResumed) {
      clearInterval(timer2);
   }
   storeTimer();
}

function storeTimer() {
   if (counterArray.length >= 3) {
      counterArray.pop();
   }

   counterArray.unshift(stoppedAt);

   let li = document.createElement('li');
   li.classList.add('list-group-item', 'li');
   li.innerText = stoppedAt;
   pastTimerResultUl.appendChild(li);

   console.log(counterArray);
}

function pauseCounter() {
   console.log('inside pause', stoppedAt);
   resume.disabled = false;
   pause.disabled = true;
   clearInterval(timer1);
   once = true;
   clearInterval(timer2);
}

function resumeCounter() {
   isResumed = true;
   pause.disabled = false;
   resume.disabled = true;
   count = stoppedAt;
   console.log('inside resume', count);
   if (once) {
      once = false;
      timer2 = setInterval(() => {
         if (count < 2) stopCounter(timer2);
         count--;
         stoppedAt = count;
         stopWatchArea.innerHTML = `00:${count}s`;
      }, 1000);
   }
}

let start = document.querySelector('#start');
let pause = document.querySelector('#pause');
let resume = document.querySelector('#resume');
let end = document.querySelector('#end');
let clear1 = document.querySelector('.delete1');
let stopWatchArea = document.querySelector('.stopwatch');
let pastTimerResult = document.querySelector('.pastTimerRes');
let pastTimerResultUl = document.querySelector('.pastTimerRes ul');

start.addEventListener('click', counter);
pause.addEventListener('click', pauseCounter);
resume.addEventListener('click', resumeCounter);
end.addEventListener('click', stopCounter);
// add reload button
clear1.addEventListener('click', () => {
   history.go(0);
});

window.addEventListener('load', () => {
   start.disabled = false;
   pause.disabled = true;
   resume.disabled = true;
   end.disabled = true;
   clear1.disabled = true;
});
