class Stack {
    constructor( height ) {
        this.height = height;
    }
    remove(qnt) {
        this.height -= qnt;
    }

    isEmpty(){
        return this.height === 0;
    }

    canRemove(qnt) {
        return this.height - qnt > -1;
    }
}

class Nim {
    constructor(n) {
        this.stacks = [];
        for(let i = 0; i< n; i++) {
            let r = Math.floor(random(3,11));
            this.stacks.push(new Stack(r));
        }
        this.stacksNotEmpty = n;
    }

    removePieces(index, qnt){
        this.stacks[index].remove(qnt);
        if(this.stacks[index].isEmpty()) this.stacksNotEmpty--;
    }

    endGame()  {
        return this.stacksNotEmpty === 0;
    }
}

class Game {
    constructor(w, h) {
        this.player =  0;

        this.height = h;
        this.width = w;
        this.nStacks = 5;
        this.nim = new Nim(this.nStacks);

        
        this.stackX = 50;
        this.stackY = 40;
        this.px = Math.floor((this.width - this.nStacks*this.stackX) /3);
        this.py = 30;
        this.ballRadius = 35;
    }

    drawStacks(img)  {

        for(let i = 0; i < this.nStacks; i++) {
            let height = this.nim.stacks[i].height;
            for(let j = 0; j < height; j++) {
                //stroke(0)
                //noFill()
                //rect(this.px+ i*this.stackX, this.height-j*this.stackY-this.py, this.stackX, this.stackY);
                image(img, this.px+i*this.stackX, this.height-this.py-(j+1)*this.stackY, this.stackX, this.stackY);
            }
        }
    }

    mouseIn(x, y)  {
        let stack = -1;
        let qnt = -1;
        if(x > this.px && x < this.px + this.stackX * this.nStacks) {
            stack = Math.floor((x-this.px) / this.stackX);
        }
        if(stack !== -1) {
            let sh = this.nim.stacks[stack].height;
            let pi = this.height - this.py - this.stackY * sh;
            if(y < this.height-this.py && y > pi) {
                qnt = Math.floor((y-pi)/this.stackY) +1;
            }
            
        }

        let del = {};
        del.stack = stack;
        del.qnt = qnt;
        return del;
    }

    removePieces(index, qnt)  {
        this.nim.removePieces(index, qnt);
        this.player = (this.player + 1) % 2;
    }

    endGame()  {
        return this.nim.endGame();
    }
}