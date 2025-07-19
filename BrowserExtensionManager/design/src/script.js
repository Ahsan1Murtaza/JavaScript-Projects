
// All the things needed
let toggleTheme = document.getElementById('toggle-theme')
let extensionArea = document.getElementById('extension-area')
let allBtn = document.getElementById('allbtn')
let activeBtn = document.getElementById('activebtn')
let inActiveBtn = document.getElementById('inactivebtn')

let rootStyles = getComputedStyle(document.documentElement) // To select Theme and other css things

let data

// Logic for refreshing 
let all = true
let active = false
let inactive = false

// Getting all data and storing in data
async function getAllDataOnce() {
    const response = await fetch('../../data.json')
    data = await response.json()
    // console.log("data fetched")
    // console.log(data)
    showAllData()
}

// Universal Function to create individual box dynamically
// Responsible for creating individual box (extension)
function putAllData(element, data, index) {
    let logo = data.logo
    let name = data.name
    let description = data.description
    let isActive = data.isActive

    element.style.width = "32%"
    element.style.height = "150px"
    element.style.border = "1px solid gray"
    element.style.borderRadius = "10px"
    element.style.display = "flex"
    element.style.flexDirection = "column"
    element.style.justifyContent = "space-between"
    element.style.boxShadow = "1px 1px 2px hsl(0, 0%, 78%)"
    element.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')
    element.style.border = "none"

    element.innerHTML =
        `<div class="half">
            <div class="image">
                <img src=${logo} alt="">
            </div>
            <div class="content">
                <p>${name}</p>
                <p>${description}</p>
            </div>
    </div>`

    let sliderColor = isActive? rootStyles.getPropertyValue('--switch-background') : 'gray'
    let circlePosition = isActive ? "50%" : "0"

    element.innerHTML +=
    `<div class = "half-bottom">
        <div class = "remBtnDiv">
            <button class = "remBtn">Remove</button>
        </div>
        <div class="slider" id="s${index}" style="background-color: ${sliderColor}">
            <input type="checkbox" class="checker" id="checkbox${index}" onclick="setSlider(this, ${index})" ${isActive ? 'checked' : ''}>        <div class="circle" id="c${index}" style="left: ${circlePosition}"></div>    
        </div>
    </div>`

    extensionArea.appendChild(element)
    setSlider(document.getElementById(`checkbox${index}`), index)

}

// Setting the Ui state of slider
function setSlider(event, index) {
    console.log(event.checked)

    let cir = document.getElementById('c' + index)
    let slid = document.getElementById('s' + index)
    if (event.checked) {
        slid.style.backgroundColor = rootStyles.getPropertyValue('--switch-background')
        cir.style.left = '50%'
    }
    else {
        slid.style.backgroundColor = "gray"
        cir.style.left = '0'
    }

    data[index].isActive = event.checked
    console.log(`The internal data of object at ${index} state is ` + data[index].isActive)
}


// Show all data (All)
function showAllData() {
    allBtn.style.backgroundColor = rootStyles.getPropertyValue('--switch-background')
    activeBtn.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')
    inActiveBtn.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')

    allBtn.style.color = rootStyles.getPropertyValue('--component-background-color')
    activeBtn.style.color = rootStyles.getPropertyValue('--heading-color')
    inActiveBtn.style.color = rootStyles.getPropertyValue('--heading-color')
    all = true
    active = false
    inactive = false
    extensionArea.innerHTML = ""
    let index = 0
    for (let i of data) {
        let newDiv = document.createElement('div')
        newDiv.classList.add()

        putAllData(newDiv, i, index) // Box will be created
        index += 1

    }
}

// Show only Active data
function showActiveData() {
    allBtn.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')
    activeBtn.style.backgroundColor = rootStyles.getPropertyValue('--switch-background')
    inActiveBtn.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')

    allBtn.style.color = rootStyles.getPropertyValue('--heading-color')
    activeBtn.style.color = rootStyles.getPropertyValue('--component-background-color')
    inActiveBtn.style.color = rootStyles.getPropertyValue('--heading-color')
    all = false
    active = true
    inactive = false
    extensionArea.innerHTML = ""
    let index = 0
    for (let i of data) {
        if (!i.isActive) {
            index += 1
            continue
        }
        let newDiv = document.createElement('div')
        newDiv.classList.add()

        putAllData(newDiv, i, index) // Box will be created
        index += 1
    }
}

// Show only InActive Data
function showInAciveData() {
    allBtn.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')
    activeBtn.style.backgroundColor = rootStyles.getPropertyValue('--component-background-color')
    inActiveBtn.style.backgroundColor = rootStyles.getPropertyValue('--switch-background')

    allBtn.style.color = rootStyles.getPropertyValue('--heading-color')
    activeBtn.style.color = rootStyles.getPropertyValue('--heading-color')
    inActiveBtn.style.color = rootStyles.getPropertyValue('--component-background-color')
    all = false
    active = false
    inactive = true
    extensionArea.innerHTML = ""
    let index = 0
    for (let i of data) {
        if (i.isActive) {
            index += 1
            continue
        }
        let newDiv = document.createElement('div')
        newDiv.classList.add()
        putAllData(newDiv, i, index) // Box will be created
        index += 1
    }
}


// Needed to update when user toggles between themes
function updateExtensionArea() {
    if (all) {
        showAllData()
    }
    else if (active) {
        showActiveData()
    }
    else if (inactive) {
        showInAciveData()
    }
}


// Event Listeners
allBtn.addEventListener('click', showAllData)
activeBtn.addEventListener('click', showActiveData)
inActiveBtn.addEventListener('click', showInAciveData)



// Toggle Theme Logic

toggleTheme.addEventListener("click", () => {
    let root = document.documentElement
    // console.log(root)
    let current = root.getAttribute('data-theme')

    if (current === "dark") {
        root.setAttribute('data-theme', 'light')
        toggleTheme.src = "../../assets/images/icon-moon.svg"
        document.querySelectorAll("#extension-logo path")[0].setAttribute('fill', 'hsl(3, 77%, 44%)')
        document.querySelectorAll("#extension-logo path")[1].setAttribute('fill', '#091540')
        // console.log("data theme set to light")
    }
    else {
        root.setAttribute('data-theme', 'dark')
        toggleTheme.src = "../../assets/images/icon-sun.svg"
        document.querySelectorAll("#extension-logo path")[0].setAttribute('fill', 'hsl(3, 86%, 64%)')
        document.querySelectorAll("#extension-logo path")[1].setAttribute('fill', 'white')
        // console.log("data theme set to dark")
    }

    updateExtensionArea()
})



// Main function
function main() {
    getAllDataOnce()
}
main()