const result = document.getElementById("result")

// To get values
function generate() {
    const passLen = parseInt(document.getElementById("passLength").value);
    const upper = document.getElementById("upperChar").checked;
    const number = document.getElementById("numberChar").checked;
    const special = document.getElementById("specialChar").checked;

    let pass = generatePass(passLen, upper, number, special);
    result.textContent = pass;
}

// Generate Password
function generatePass(passLen, upper, number, special) {

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numChars = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    let chars = lower;

    let pass = "";

    if (upper) {
        chars += upperChars;
    }
    if (number) {
        chars += numChars;
    }
    if (special) {
        chars += specialChars;
    }

    for (let i = 0; i < passLen; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)

        pass += chars[randomIndex];
    }

    return pass;
}

document.getElementById("generatePassword").addEventListener('click', generate);


document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("passLength").value = 12; 
    document.getElementById("upperChar").checked = true;
    document.getElementById("numberChar").checked = true;
    document.getElementById("specialChar").checked = true;
    result.textContent = "Your password will appear here";
})