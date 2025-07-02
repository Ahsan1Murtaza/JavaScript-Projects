const result = document.getElementById("result")


document.getElementById("generateRandom").addEventListener('click', () => {
    const min_value = parseInt(document.getElementById("minInput").value);
    const max_value = parseInt(document.getElementById("maxInput").value);

    if (isNaN(min_value) || isNaN(max_value) || min_value >= max_value){
        result.textContent = "Enter correct Min and Max values";
        return;
    }

    let random = Math.floor(Math.random() * (max_value - min_value + 1)) + min_value;

    result.textContent =   `Random Number is ${random}`;
    
})

document.getElementById("reset").addEventListener("click", ()=>{
    document.getElementById("minInput").value = "";
    document.getElementById("maxInput").value = "";
    result.textContent = "Click the Button to Generate";
})