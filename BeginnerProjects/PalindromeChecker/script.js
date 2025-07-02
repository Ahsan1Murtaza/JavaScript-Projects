
let val;
let res = document.getElementById('res');

function checkPalindrome(){
    val = document.getElementById('text_id').value;

    
    if (isPalindrome(val.toString())){
        res.style.color = 'green';
        res.textContent = `${val} is Palindrome`;
    }
    else{
        res.style.color = 'blue';
        res.textContent = `${val} is Not Palindrome`;
    }
    
}

function isPalindrome(x){
    let start = 0;
    let end = x.length - 1;
    while (start < end){
        if (x[start] != x[end]){
            return false;
        }
        start++;
        end--;
    }
    return true;
}

document.getElementById('check-button').addEventListener('click', checkPalindrome);