document.addEventListener('DOMContentLoaded', () => {

    let numberOfClicks = 0;

    let reStart = document.getElementById("reStart")

    const boxes = document.getElementsByClassName("box");

    for (let i = 0; i < boxes.length; i++) {

        boxes[i].addEventListener("click", function () {

            if (this.classList.contains('not-clickeble')) {
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
            //hej


            console.log(numberOfClicks % 2);
            if (numberOfClicks % 2) {
                this.style = 'background-color: green';
            } else {
                this.style = 'background-color: red';
            }

        });
    }


    reStart.addEventListener("click", function () {
        numberOfClicks = 0;


        clicks.innerHTML = numberOfClicks;
        let boxes = document.getElementsByClassName("box");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "chartreuse";
            boxes[i].classList.remove("not-clickeble");

        }

    });
})

