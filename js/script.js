/*Get the watch's hands from the SVG markup*/
const hourHand = document.querySelector('#hour');
const minHand = document.querySelector('#minute');
const secHand = document.querySelector('#second');
/* Set the actual time */
const date = new Date();
const hr = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();
/*Adjust the initial hand position*/
let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
let secPosition = sec * 360 / 60;

/* Updates the watch hands each time its called */
function updateWatch() {
    /* Need to adjust the hr/min arm to move when the second moves */
    /* 360deg / 12hrs = 360deg / (12*60*60)sec = 1/120 */
    hrPosition = hrPosition + (1 / 120);
    /* 360deg / 60mins = 360deg/3600sec = 1/10 */
    minPosition = minPosition + (1 / 10);
    /* 360deg / 60seconds = 6deg per second */
    secPosition = secPosition + 6;

    const root = document.querySelector(':root');

    root.style.setProperty('--hr-transform', `${hrPosition}deg`);
    root.style.setProperty('--min-transform', `${minPosition}deg`);
    root.style.setProperty('--sec-transform', `${secPosition}deg`);
}

const interval = setInterval(updateWatch, 1000);

/*Color Change */
const watchColor = document.querySelector('#watch-color');
const faceColor = document.querySelector('#face-color');
const handColor = document.querySelector('#hand-color');

/* Sets the :root css variable(cssVar) to a random color */
function changeColor(cssVar) {
    const root = document.querySelector(':root');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    
    console.log(cssVar,randomColor);
    root.style.setProperty(cssVar, `#${randomColor}`);
}

/* Event Listeners for the three buttons */
watchColor.addEventListener('click', function(){
    changeColor('--watch-body-color')
});

faceColor.addEventListener('click', function(){
    changeColor('--watch-face-color')
});

handColor.addEventListener('click', function(){
    changeColor('--handle-color')
});