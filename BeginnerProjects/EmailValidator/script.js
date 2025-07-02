document.getElementById('emailForm').addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value;

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (pattern.test(email)){
        alert("Email form submitted")
        document.getElementById('emailForm').reset();
    }
    else{
        alert("Email form not submitted")
    }


})