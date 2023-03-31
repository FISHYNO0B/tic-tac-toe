document.addEventListener('DOMContentLoaded', () => {

    const socket = io('http://localhost:3001');

    socket.emit('connected', {
        type: 'connected',
        message: 'i am connected'
    })

    socket.on('message', (message) => {
        if(message.type == 'clicked'){
            let box = document.getElementById(message.message);
            box.click();
        }
    });



    document.getElementById('winner-container').innerHTML = `<h1></h1>`
    let numberOfClicks = 0;
    let gameCompleted = false;

    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkForWinner(boxes){
        for (let comb of combs) {
            if (
                boxes[comb[0]].textContent == boxes[comb[1]].textContent &&
                boxes[comb[1]].textContent == boxes[comb[2]].textContent &&
                boxes[comb[0]].textContent != ''
            ) {
                return true;
            }
        }
        return false;
    }

    let reStart = document.getElementById("reStart")

    const boxes = document.getElementsByClassName("box");


    function clickBox(t = null){

        if (this.classList.contains('not-clickeble') || gameCompleted == true) {
            return;
        }


        this.classList.add('not-clickeble');
        numberOfClicks += 1;
        if (numberOfClicks > 9) {
            //numberOfClicks = 0;
            // todo: reset color
            return;
        }
        let clicks = document.getElementById("clicks")
        clicks.innerHTML = numberOfClicks;

        //todo every odd click should be another color.

        if (numberOfClicks % 2) {
            this.classList.add('x')
            this.textContent = 'X';

        } else {
            this.classList.add('o')
            this.textContent = 'O';

        }
        socket.emit('message', {
            type: 'clicked',
            message: this.id,
        })

        if (numberOfClicks == 9) {
            document.getElementById('winner-container').innerHTML = `<h1>DRAW</h1>`
        }

        if(checkForWinner(boxes)){
            document.getElementById('winner-container').innerHTML = `<h1>Winner is ${this.textContent}</h1>`
            gameCompleted = true;
        }

    }

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click",  clickBox);
    }


    reStart.addEventListener("click", function () {
        numberOfClicks = 0;


        clicks.innerHTML = numberOfClicks;
        let boxes = document.getElementsByClassName("box");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "white";
            boxes[i].classList.remove("not-clickeble");
            boxes[i].classList.remove("x");
            boxes[i].classList.remove("o");
            boxes[i].textContent = '';
            gameCompleted = false;
            document.getElementById('winner-container').innerHTML = `<h1></h1>`
        }

    });
})
