
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      stopBtn.disabled = false;
     timerId = setInterval(() => {body.style.backgroundColor =  getRandomHexColor()}, 1000)
    
  

 });


stopBtn.addEventListener("click", () => { 
    clearInterval(timerId);
    stopBtn.disabled = true; 
    startBtn.disabled = false; 
});
