const API_KEY = '23837850d74a4f7daa906dc345be40cd'
let IP_ADDRESS = '8.8.8.8'


let ipBar = document.getElementById('ipBar')
let mapFrame = document.getElementById('mapFrame')

let address = document.getElementById('ip')
let locate = document.getElementById('loc')
let zip = document.getElementById('zip')
let flag = document.getElementById('flag')



let contentArea = document.getElementById('cont')

document.getElementById('ipButton').addEventListener("click", ()=>{
    let value = ipBar.value
    
    if (value == ""){
        alert('Field cant be empty')
        return
    }

    getData()

})

async function getData(){
    IP_ADDRESS = ipBar.value
    const URL = `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${API_KEY}&ip=${IP_ADDRESS}`
    let response = await fetch(URL)
    if (response.ok){
        console.log("Data Fetched")
        contentArea.style.visibility = "hidden"
    }
    else{
        alert("No Data Found")
        return
    }
    let data = await response.json()

    // console.log(data)
    // // console.log(data.location.country_code2)

    let latitude = data.location.latitude //
    let longitude = data.location.longitude //
    let mapURL = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed` //
    let countryName = data.location.country_name
    let zipCode = data.location.zipcode //
    let countryFlagUrl = data.location.country_flag //
    let countryCode = data.location.country_code2 //
    let continentCode = data.location.continent_code //
    let city = data.location.city //
    let ipAddress = data.ip //
    
    
    mapFrame.src = mapURL
    address.textContent = ipAddress
    locate.textContent = `${city}, ${countryCode} / ${continentCode}`
    zip.textContent = zipCode
    flag.src = countryFlagUrl

    setTimeout(()=>{
        contentArea.style.visibility = "visible"
        contentArea.style.transition = "opacity 0.5s ease"
    },1000)

    // console.log("IP Address is " + ipAddress)
    // console.log("Latitude is " + latitude)
    // console.log("Longitude is " + longitude)
    // console.log("Country Name is " + countryName)
    // console.log("Zip Code is " + zipCode)
    // console.log("Country Flag URL is " + countryFlagUrl)
    // console.log("Country Code is " + countryCode)
    // console.log("Continent Code is " + continentCode)
    // console.log("City is " + city)
}