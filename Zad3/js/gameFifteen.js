window.onload = function () {
    document.getElementById('start').onclick = function () {
        startGame();
    }
    const game = document.getElementsByClassName('block');
    for (let i = 0; i < game.length; i++) {
        game[i].onclick = function (e) {
            const row = e.target.getAttribute('data-row'),
                col = e.target.getAttribute('data-col');
            const val = e.target.innerHTML;
            console.log(row);
            if (row !== 'a') {
                const top_col = col;
                let top_row;
                switch (row) {
                    case 'b' :
                        top_row = 'a';
                        break;
                    case 'c' :
                        top_row = 'b';
                        break;
                    case 'd' :
                        top_row = 'c';
                        break;
                }
                valReplace(top_col, top_row);
            }
            if (col !== 4) {
                const right_col = +col + 1;
                valReplace(right_col, row);
            }
            if (row !== 'd') {
                const bottom_col = col;
                let bottom_row;
                switch (row) {
                    case 'a' :
                        bottom_row = 'b';
                        break;
                    case 'b' :
                        bottom_row = 'c';
                        break;
                    case 'c' :
                        bottom_row = 'd';
                        break;
                }
                valReplace(bottom_col, bottom_row);
            }
            if (col !== 1) {
                const left_col = col - 1;
                valReplace(left_col, row);
            }
            function valReplace(next_col, next_row) {
                for (let i = 0; i < game.length; i++) {
                    if ((game[i].getAttribute('data-col') === next_col) && (game[i].getAttribute('data-row') === next_row)) {
                        if (game[i].innerHTML === '') {
                            game[i].innerHTML = val;
                            e.target.innerHTML = '';
                            game[i].className = game[i].className.replace('block hidden', 'block');
                            e.target.className = e.target.className.replace('block', 'block hidden');
                        }
                    }
                }
            }
            winnerGame();
        } 
    }
    function randomMix(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let arr = [];
    let emptyBlock;

    function startGame() {
        let i;
        arr = [];
        const game = document.getElementsByClassName('block');
        for (i = 0; i < game.length; i++) {
            const col = game[i].getAttribute('data-col');
            const row = game[i].getAttribute('data-row');
            const elem = game[i];
            if (elem.innerHTML === '') {
                emptyBlock = elem;
                if (row !== 'a') {
                    const top_col = col;
                    let top_row;
                    switch (row) {
                        case 'b':
                            top_row = 'a';
                            break;
                        case 'c':
                            top_row = 'b';
                            break;
                        case 'd':
                            top_row = 'c';
                            break;
                    }
                    for (i = 0; i < game.length; i++) {
                        if ((game[i].getAttribute('data-col') === top_col) && (game[i].getAttribute('data-row') === top_row)) {
                            arr[arr.length] = game[i];
                        }
                    }
                }
                if (+col !== 4) {
                    const right_col = +col + 1;
                    for (i = 0; i < game.length; i++) {
                        if ((game[i].getAttribute('data-col') === right_col) && (game[i].getAttribute('data-row') === row)) {
                            arr[arr.length] = game[i];
                        }
                    }
                }
                if (row !== 'd') {
                    const bottom_col = col;
                    let bottom_row;
                    switch (row) {
                        case 'a':
                            bottom_row = 'b';
                            break;
                        case 'b':
                            bottom_row = 'c';
                            break;
                        case 'c':
                            bottom_row = 'd';
                            break;
                    }
                    for (i = 0; i < game.length; i++) {
                        if ((game[i].getAttribute('data-col') === bottom_col) && (game[i].getAttribute('data-row') === bottom_row)) {
                            arr[arr.length] = game[i];
                        }
                    }
                }
                if (+col !== 1) {
                    const left_col = col - 1;
                    for (i = 0; i < game.length; i++) {
                        if ((game[i].getAttribute('data-col') === left_col) && (game[i].getAttribute('data-row') === row)) {
                            arr[arr.length] = game[i];
                        }
                    }
                }
            } 
        } 
    }
    let startTime;
    document.getElementById('start').onclick = function () {
        startTime = new Date;
        const levelNumber = document.getElementById('level').value;
        for (let a = 0; a < levelNumber; a++) {
            startGame();
            const randomInt = arr[randomMix(0, arr.length - 1)];
            emptyBlock.innerHTML = randomInt.innerHTML;
            randomInt.innerHTML = '';
            randomInt.className = 'block hidden';
            emptyBlock.className = 'block';
        }
    }
    function winnerGame() {
        const game = document.getElementsByClassName('block');
        let win = true;
        for (let i = 0; i < game.length - 1; i++) {
            if ((i + 1) !== +game[i].innerHTML) {
                win = false;
            }
        }
        if (win) {
            alert('Congratulations, you won! Time: ' + (new Date - startTime) / 1000);
        }
    }
}