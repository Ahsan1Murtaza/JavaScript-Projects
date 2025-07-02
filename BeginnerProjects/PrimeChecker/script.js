
let val;
let res = document.getElementById('res');

function checkPrime(){
    val = parseInt(document.getElementById('num').value);

    if (isNaN(val) || val <= 1){
        res.style.color = 'red';
        res.textContent = "Please Enter a number greater than 1."
        
        return;
    }

    if (isPrime(val)){
        res.style.color = 'green';
        res.textContent = `${val} is Prime Number`;
    }
    else{
        res.style.color = 'blue';
        res.textContent = `${val} is Non - Prime Number`;
    }
    console.log("Button clicked")
}

function isPrime(x){
    for (let i = 2; i < x; i++){
        if (x % i == 0){
            return false;
        }
    }
    return true;
}

document.getElementById('check-button').addEventListener('click', checkPrime);