/*JavaScript for Fifteen Puzzle
Extra Feature: End-of_Game Notification */
"use strict";
//globally declared variables
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
        gamePiece[i].style.top = (i / 4 * 100) + 'px';
        gamePiece[i].style.backgroundPosition = '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top;

        gamePiece[i].onmouseover = function () {
            if (checkMove(parseInt(this.innerHTML))) {
                this.style.border = "3px solid red";
                this.style.color = "#006600";
                this.style.textDecoration = "underline";
                this.style.backgroundImage = "url('https://s-media-cache-ak0.pinimg.com/564x/83/72/12/837212dd8b71f9b5d175ac98f2c7668a.jpg')";

            }
        };
        gamePiece[i].onmouseout = function () {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
            this.style.textDecoration = "none";
        };
        gamePiece[i].onclick = function () {
            if (checkMove(parseInt(this.innerHTML))) {
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
        let rand;
        rand = Math.trunc(Math.random() * 100) % 4;
        let temp;
        for (let i = 0; i < 300; i++) {
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
}

function checkMove(position) {
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
    notify--;
    var body = document.getElementsByTagName('body');
    if (notify === 0) {
        body[0].style.backgroundImage = "none";
        alert('Winner! ... Shuffle and Play Again');
        const para = document.getElementsByClassName('explanation');
        para[0].style.visibility = "visible";
        return;
    } else (notify % 2)
    {

        body[0].style.backgroundImage = "url('http://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_go/boxart.jpg')";

    }
    timer = setTimeout(Notify, 200);
}

function win() {
    const body = document.getElementsByTagName('body');
    body[0].style.backgroundImage = "url('http://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_go/boxart.jpg')";
    notify = 10;
    timer = setTimeout(Notify, 200);
    const para = document.getElementsByClassName('explanation');
    para[0].style.visibility = "hidden";
}

function finish() {
    let flag = true;
    for (let i = 0; i < gamePiece.length; i++) {
        const top = parseInt(gamePiece[i].style.top);
        const left = parseInt(gamePiece[i].style.left);
        if (left !== (i % 4 * 100) || top !== Math.trunc(i / 4) * 100) {
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
