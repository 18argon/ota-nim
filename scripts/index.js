let game;
let balloonImage;
let popSound;

const WIDTH = 640;
const HEIGHT = 480;
const COLOR_BACKGROUND = "#75bedd";
const COLOR_FONT = "#e00000";

function preload() {
    popSound = loadSound('assets/pop.ogg');
    balloonImage = loadImage('assets/balloon.png');
}
function setup() {
    createCanvas(WIDTH, HEIGHT);
    game = new Game(WIDTH, HEIGHT);
}

function draw() {
    background(COLOR_BACKGROUND);
    fill(0)

    if(!game.endGame()) {
        textSize(20);
        text(`PLAYER ${game.player+1}`, 10, 30);
        fill(COLOR_FONT);
        noStroke();
        game.drawStacks(balloonImage);
    } else {
        textAlign(CENTER);
        text(`PLAYER ${game.player+1} WINS`, width/2, height/2);
        // text(`CLICK TO RESTART`, width/2, height/2-30);
        noLoop();
    }
}

function mouseClicked() {
    // if(g.endGame()) {
    //     g = new Game(640,480);
    //     loop();
    //     return;
    // }
    let deletedBalloons = game.mouseIn(mouseX, mouseY);
    if(deletedBalloons.stack != -1 && deletedBalloons.qnt != -1) {
        game.removePieces(deletedBalloons.stack, deletedBalloons.qnt);
        popSound.play();
    }
    
}
