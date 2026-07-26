let speed = 10;
let scale = 0.17; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let timer = null;

// Below this the canvas is hidden and .mobile-dog is shown instead — keep the
// breakpoint in sync with main.css
let isMobile = window.matchMedia('(max-width: 768px)');

let dvd = {
    x: 0,
    y: 0,
    xspeed: 1,
    yspeed: 1,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("bouncing-canvas");
    ctx = canvas.getContext("2d");
    dvd.img.src = 'img/bouncing.png';

    //start() re-measures and starts/stops, so every one of these is safe to
    //fire at any time — whichever arrives first wins, the rest are no-ops
    window.addEventListener('resize', start);
    window.addEventListener('load', start);
    isMobile.addEventListener('change', start);
    start();
})();

//Draw the "tv screen" — match the backing store to the size CSS gave us,
//so the canvas can never be wider than the page
function resizeCanvas() {
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

//Only bounce on desktop; on mobile the canvas is hidden, so don't burn a timer
function start() {
    clearTimeout(timer);
    timer = null;
    if (isMobile.matches) {
        return;
    }
    resizeCanvas();
    update();
}

function update() {
    timer = setTimeout(() => {
        // clear out the image
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        //Move the logo
        dvd.x+=dvd.xspeed;
        dvd.y+=dvd.yspeed;
        //Check for collision 
        checkHitBox();
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
    }
        
    if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
    }    
}
