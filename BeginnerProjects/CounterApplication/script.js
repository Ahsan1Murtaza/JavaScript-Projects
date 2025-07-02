var count = 0;
var inc_counter = 0;
var dec_counter = 0;

let count_display = document.getElementById('counter');
let inc_display = document.getElementById('inc-counter');
let dec_display = document.getElementById('dec-counter');

document.getElementById('inc-button').addEventListener('click', increment);
document.getElementById('dec-button').addEventListener('click', decrement);
document.getElementById('res-button').addEventListener('click', reset);

function increment(){
    count++;
    inc_counter++;
    update();
}
function decrement(){
    count--;
    dec_counter++;
    update();
}

function reset(){
    count = 0;
    inc_counter = 0;
    dec_counter = 0;
    update();
}

function update(){
    count_display.textContent = count;
    inc_display.textContent = inc_counter;
    dec_display.textContent = dec_counter;
}