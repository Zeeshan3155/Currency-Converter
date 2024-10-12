const BASE_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");


for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode
        newOption.value = currCode
        if (select.name == "from" && currCode == "USD"){
            newOption.selected = "selected";
            console.log("logged")
        } else if(select.name == "to" && currCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evnt)=>{
        updateFlag(evnt.target);
    })
}

const updateFlag = (element)=>{
    let countryCode = countryList[element.value];
    new_img = `https://flagsapi.com/${countryCode}/shiny/64.png`
    img = element.parentElement.querySelector("img")
    img.src = new_img;
}

const getExchangeRates = async ()=>{
    let input_value = document.querySelector("#input-text").value;
    const fromCurr = document.querySelector(".from select").value
    const toCurr = document.querySelector(".to select").value
    let url = `${BASE_url}/${fromCurr.toLowerCase()}.json`
    let response = await fetch(url)
    let data = await response.json()
    let rate =  data[fromCurr.toLowerCase()][toCurr.toLowerCase()]
    let finalAmount = rate * input_value
    let msg = document.querySelector(".msg")
    console.log(CurrencySymbol[toCurr])
    msg.innerText = `${CurrencySymbol[toCurr]} ${finalAmount.toFixed(2)}`

    
}

const btn = document.querySelector("button")

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    getExchangeRates();
})

