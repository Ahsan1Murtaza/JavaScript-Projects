let input_box = document.getElementById('pass');
let hider_span = document.getElementById('check');

hider_span.addEventListener("click", ()=>{

    if (input_box.type == "password"){
        input_box.type = 'text';
        hider_span.textContent = "Hide";
    }
    else{
        input_box.type = 'password';
        hider_span.textContent = "Show";
    }
})