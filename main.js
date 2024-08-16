window.onload = generateGrid(9,9);
  

let count = 0;
let second = 59;
let timerId;


const winOrLose = [true, true, true, true ,false];
const color = ["red" , "blue", "red" ,"green"];
const image = document.getElementById('image');

// change button when click it
function changeColor(button){

    if(winOrLose[Math.floor(Math.random()*winOrLose.length)]){
        button.style.color = color[Math.floor(Math.random()*color.length)];
        button.style.backgroundColor = "#E1E1E2";
        button.innerHTML = ++count ;
        button.disabled = true;
    }

    else {
        button.innerHTML = "&#x1F4A3;";
        stop();
        count = 0;
    }
}

// start timer when click it
document.body.addEventListener('click', start_Timer);


function update(){
    let display_second = second < 10 ? '0' + second : second;

    document.getElementById('timer').innerHTML = '00:' + display_second;

    if (second > 0) second--;    
    else{ 
        stop();
        placeBombs();

    } 
}

function start_Timer(){
    if (!timerId) {
        timerId = setInterval(update, 1000);
    }
    
}
function stop(){
    clearInterval(timerId);
    placeBombs();
    image.src = "sad.png";

}


function placeBombs(){
    const buttons = document.querySelectorAll('#buttonsContainer button');
    const totalButtons = buttons.length;

    const numberOfBomb = Math.floor(Math.random() * (totalButtons + 1));
    const randomIndex = [];

    while(randomIndex.length < numberOfBomb){
        const index = Math.floor(Math.random() * totalButtons);
        if (!randomIndex.includes(index)) {
            randomIndex.push(index);
        }
    }

    randomIndex.forEach(index => {
        buttons[index].innerHTML = "&#x1F4A3;";
    });

    buttons.forEach(button => {
        button.disabled = true;
    });
}



document.getElementById('levels').addEventListener('change', function() {
    const selectElement = this.value;
    if(selectElement == 'Easy')
        generateGrid(9,9);
    
    else if(selectElement === 'Medium') 
        generateGrid(14, 14);
    
    else if(selectElement == 'Hard')
        generateGrid(16,20);
    
});

function generateGrid(rows, cols) {
    const buttonsContainer = document.getElementById('buttonsContainer');

    buttonsContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'button-row';
        
        for (let j = 0; j < cols; j++) {
            const button = document.createElement('button');
            button.onclick = function() { changeColor(this); };
            rowDiv.appendChild(button);
        }

        buttonsContainer.appendChild(rowDiv);
    }
}



