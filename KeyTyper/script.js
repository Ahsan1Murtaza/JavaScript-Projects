// This sentence should be get by Api's
let sentence

let spansArr // Stores all characters as a span tag

let tokens // Each characters
let index = 0


let wordCount = 0
let charCount = 0

let speed = 0
let accuracy = 0

let totalCharacters = 0
let correctCharacters = 0
let wrongCharacters = 0
let wrongMap = [-1] // Used to prevent duplicate wrong indexes

let wordCounter = document.getElementById('wordCounter')
let characterCounter = document.getElementById('charCounter')
let accuracyCounter = document.getElementById('accuracy')
let correctCharCounter = document.getElementById('correctCounter')
let wrongCharCounter = document.getElementById('wrongCounter')
let totalCharCounter = document.getElementById('totalCounter')
let speedCounter = document.getElementById('speed')

let startTime
let endTime

let typingstarted = false



// This function takens tokensArr and apply span tag to each token(char) and add it to spansArr also add (spancolor) class and add it to parent
// Initially apply highlight (true => yellow highlight)
function showSentence(tokens){
    let textArea = document.getElementsByClassName('textArea')[0]
    for (let char of tokens){
        let span = document.createElement('span')
        if (char == " "){
            span.style.display = "inline-block"
            span.style.width = "5px"       
            span.style.height = "5px"
            span.style.borderRadius = "50%"
            // span.style.backgroundColor = "rgb(187, 186, 186)"
            span.textContent = ""
            span.style.marginLeft = "5px"          
            span.style.marginRight = "5px"    
            span.classList.add('spanbackcolor')     
        }
        else{
            span.textContent = char
        }
        span.classList.add('spancolor')
        spansArr.push(span)
        textArea.appendChild(span)
    }
    underline(index) // Initially underline first index

    // console.log(tokens[23])
}


// It will apply color on the characters
// (true)
    // If previously was wrong then apply color red
    // else apply (correct) class
// (false) apply (wrong) class
function applyColor(index, correct){
    // Assume true for correct
    let element = spansArr[index]
    
    if (correct){  
        // Conditions for span backgrounds
        if (sentence[index] == " " && element.classList.contains('wrong')){ 
                element.classList.remove('wrong')
                element.style.backgroundColor = "red"
                return
        }
        if (sentence[index] == " "){ // It is for span space tag since it is empty so i have to apply background to see it and it is circular span
            element.classList.add('correctspancolor')
            return
        }


        // Conditions for normal char colors
        if (element.classList.contains('wrong')){
            // element.style.textDecoration = "underline blue"
            element.style.color = "red"
            return
        }
        element.classList.add("correct") // It is for normal characters
    }
    else{
        element.classList.add("wrong")
        // console.log(element)
    }
}

function increaseCharCount(){
    charCount++
    UpdateStates()
}
function increaseWordCount(){
    wordCount++
    UpdateStates()
}
function calculateTotalCharacters(){
    totalCharacters = sentence.length
    UpdateStates()
}
function calculateCorrectCharacters(){
    correctCharacters = totalCharacters - wrongCharacters
    UpdateStates()
}
function calculateAccuracy(){
    calculateTotalCharacters()
    calculateCorrectCharacters()
    console.log("Total Characters : " + totalCharacters)
    console.log("Total Wrong Characters : " + wrongCharacters)
    console.log("Total Correct Characters : " + correctCharacters)
    accuracy = ((correctCharacters / totalCharacters) * 100).toFixed(2)
    // console.log(accuracy)
    UpdateStates()
}


// This function contains all characters that will be in the text and validate wit the user input character
// Also calls increaseCharCount and increaseWordCount

function validChar(char){
    let characters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_-+,./';:`"
    if (characters.includes(char)){
        return true
    }
    return false
}

function UpdateStates(){
    wordCounter.textContent = wordCount
    characterCounter.textContent = charCount
    accuracyCounter.textContent = accuracy + "%"
    totalCharCounter.textContent = totalCharacters
    correctCharCounter.textContent = correctCharacters
    wrongCharCounter.textContent = wrongCharacters
}

function keyHandler(event){
    let keyCode = event.key
    
    if (!typingstarted){
        startTime = new Date()
        console.log("Timer Started")
        typingstarted = true
    }

    if (validChar(keyCode)){
        if (checkChar(index, keyCode)){
            // console.log(keyCode)
            applyColor(index, true)
            removeUnderline(index)

            
            index += 1
            if (checkEnd(index)){
                increaseWordCount()
                increaseCharCount()
                return
            }

            // Check here that if next character is space then increment word count
            // And characterCount will be increased
            if (sentence[index] == " "){ // for multiple 
                increaseWordCount()
            }
            increaseCharCount()
            underline(index)
        }
        else{
            calculateWrongOnce(index) // it will calculate wrong only once
            underline(index)
            applyColor(index, false)
        }  

        calculateAccuracy()
        calculateCorrectCharacters()
        calculateTotalCharacters()

    }

    else{
        console.log(keyCode  + " not valid")
        event.preventDefault() // For others
        return
    }
}

// This function accurately calculates the wrong one Solving the duplicate wrong problem
function calculateWrongOnce(index){
    if (index != wrongMap[0]){
        wrongCharacters += 1
        wrongMap[0] = index 
        return true  
    }
    return false
}





// This function checks if index is equal to length then all words are completed
function checkEnd(i){
    if (i >= tokens.length){
        console.log("All Words Finished")
        document.removeEventListener("keyup", keyHandler)
        // console.log("Event Listener removed")
        // console.log(wrongCharacters)

        endTime = new Date()
        console.log("Timer End")
        // Delayed call so return happens first
        calculateSpeed()
        setTimeout(() => {
            startAgain()
        }, 1000)

        return true
    }
}

// Calculate and also update Speed
function calculateSpeed(){
    let timetaken = (endTime - startTime) / 1000
    speed = Math.round((wordCount / timetaken) * 60)

    // Updating speed on Ui
    speedCounter.textContent = speed + " Wpm"
    speedCounter.style.color = "green"
    // console.log(speed + "WPM")
}

async function startAgain(){
    await initialize()
}


// This function apply highlight to current character
function underline(index){

    let element = spansArr[index]
    // For span space circular dots
    if (sentence[index] == " "){
        element.style.width = "6px"
        element.style.height = "6px"
    }
    // For normal chars
    if (index < spansArr.length){ 
        element.classList.add('underline')
    }
}


// This function remove highlight to current character
// it removes (highlight) class

function removeUnderline(index){ // The index provided will be -1 by current
    let element = spansArr[index]
    // For span space circular dots
     if (sentence[index] == " " && index >= 0){
        element.style.width = "5px"
        element.style.height = "5px"
        return
    }

    // For normal chars
    if (index >= 0){
        element.classList.remove('underline')
    }
}

// This function takes index and character and checks character in particular sentence 
// If correct then true
// Else false
function checkChar(index, currentChar){
    if (sentence.charAt(index) === currentChar){
        // console.log("Correct")
        return true
    }
    else{
        // console.log("Incorrect")
        return false
    }
}

async function getSentence() {
    try{
        let sentence = await fetch("https://baconipsum.com/api/?type=all-meat&paras=1")
        let data = await sentence.json()
        return data
    }
    catch(e){
        return "this is default text"
    }   
}


// This function will initialize everything
async function initialize(){
    index = 0
    spansArr = []
    tokens = []
    wordCount = 0
    charCount = 0
    wrongCharacters = 0
    accuracy = 0
    typingstarted = false
    // startTime = new Date()
    // console.log(startTime)

    
    document.addEventListener("keyup", keyHandler) // Default listener for key inputs

// Listener specially to prevent space/enter/tab/alt/capslock default 
document.addEventListener("keydown", function(e) {
    let blockedKeys = [" ", "Shift", "Enter", "Tab", "Alt", "CapsLock"]
    if (blockedKeys.includes(e.key)) {
        e.preventDefault()
    }
})


    sentence  = await getSentence()
    sentence = sentence[0] // Now it is string
    
    sentence = sentence.replace(/  +/g, " ") // replaces multiple spaces with a single space
    sentence = sentence.replace(/\./g, "")   // removes all periods
    sentence = sentence.replace(/-/g, "")    // removes all hyphens
    sentence = sentence.substring(0,sentence.length/5)
    // console.log(sentence)

    let textArea = document.getElementsByClassName('textArea')[0]
    textArea.innerHTML = "" // clears previous content

    tokens = sentence.split('')
    showSentence(tokens)
}

// This is a main function
async function main(){
    await initialize()
}

main()