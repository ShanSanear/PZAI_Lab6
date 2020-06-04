"use strict";
let gamePiece;
let notify;
let timer;
let spaceY;
let spaceX;
window.onload = function () {
    const puzzleArea = document.getElementById('puzzlearea');
    gamePiece = puzzleArea.getElementsByTagName('div');
    for (let i = 0; i < gamePiece.length; i++) {
        gamePiece[i].className = 'puzzlepiece';
        gamePiece[i].style.left = (i % 4 * 100) + 'px';
        gamePiece[i].style.top = (parseInt(i / 4) * 100) + 'px';
        gamePiece[i].onmouseover = function () {
            if (canBeMoved(parseInt(this.innerHTML))) {
                this.className = 'puzzlepiece movablepiece';
            }
        };
        gamePiece[i].onmouseout = function () {
            this.className = 'puzzlepiece';
        };
        gamePiece[i].onclick = function () {
            if (canBeMoved(parseInt(this.innerHTML))) {
                swap(this.innerHTML - 1);
                if (finish()) {
                    win();
                }

            }
        };
    }
    const shuffle = document.getElementById('shufflebutton');
    spaceX = '300px';
    spaceY = '300px';
    shuffle.onclick = function () {
        let temp;
        for (let i = 0; i < 300; i++) {
            const rand = parseInt(Math.random() * 100) % 4;
            if (rand === 0) {
                temp = up(spaceX, spaceY);
                if (temp !== -1) {
                    swap(temp);
                }
            }
            if (rand === 1) {
                temp = down(spaceX, spaceY);
                if (temp !== -1) {
                    swap(temp);
                }
            }
            if (rand === 2) {
                temp = left(spaceX, spaceY);
                if (temp !== -1) {
                    swap(temp);
                }
            }
            if (rand === 3) {
                temp = right(spaceX, spaceY);
                if (temp !== -1) {
                    swap(temp);
                }
            }
        }
    };
};

function canBeMoved(position) {
    if (left(spaceX, spaceY) === (position - 1)) {
        return true;
    }
    if (down(spaceX, spaceY) === (position - 1)) {
        return true;
    }
    if (up(spaceX, spaceY) === (position - 1)) {
        return true;
    }
    if (right(spaceX, spaceY) === (position - 1)) {
        return true;
    }
}

function Notify() {
    const body = document.getElementsByTagName('body');
    alert('You won');
}

function win() {
    Notify();
    const body = document.getElementsByTagName('body');
}

function finish() {
    let flag = true;
    for (let i = 0; i < gamePiece.length; i++) {
        const top = parseInt(gamePiece[i].style.top);
        const left = parseInt(gamePiece[i].style.left);
        if (left !== (i % 4 * 100) || top !== parseInt(i / 4) * 100) {
            flag = false;
            break;
        }
    }
    return flag;
}

function left(x, y) {
    const cordX = parseInt(x);
    const cordY = parseInt(y);
    if (cordX > 0) {
        for (let i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.left) + 100 === cordX && parseInt(gamePiece[i].style.top) === cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function right(x, y) {
    const cordX = parseInt(x);
    const cordY = parseInt(y);
    if (cordX < 300) {
        for (let i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.left) - 100 === cordX && parseInt(gamePiece[i].style.top) === cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function up(x, y) {
    const cordX = parseInt(x);
    const cordY = parseInt(y);
    if (cordY > 0) {
        for (let i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.top) + 100 === cordY && parseInt(gamePiece[i].style.left) === cordX) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function down(x, y) {
    const cordX = parseInt(x);
    const cordY = parseInt(y);
    if (cordY < 300) {
        for (let i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.top) - 100 === cordY && parseInt(gamePiece[i].style.left) === cordX) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function swap(position) {
    let temp = gamePiece[position].style.top;
    gamePiece[position].style.top = spaceY;
    spaceY = temp;
    temp = gamePiece[position].style.left;
    gamePiece[position].style.left = spaceX;
    spaceX = temp;
}