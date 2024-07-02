const URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IFL9fZZsoxPLc6mBNTxDJpVhuE2GzzAtVK5L7K9a&base_currency=";

let fromCurrencySelect = document.querySelector("#fromCurrency");
let toCurrencySelect = document.querySelector("#toCurrency");
let convertBtn = document.querySelector("#convertBtn");
let amountInput = document.querySelector("#Amount");
let showAmount = document.querySelector("#showAmount");

(function makeOption() {
  for (let key in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = key;
    newOption.value = key;
    if (newOption.value === "USD") {
      newOption.selected = "selected";
    }
    fromCurrencySelect.appendChild(newOption);
  }

  for (let key in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = key;
    newOption.value = key;
    if (newOption.value === "INR") {
      newOption.selected = "selected";
    }
    toCurrencySelect.appendChild(newOption);
  }
})();

const getData = async () => {
  let newURL = `${URL}${fromCurrencySelect.value}`;

  let response = await fetch(newURL);
  // console.log(response);

  let data = await response.json();
  // console.log(data["data"]);

  let amount = parseFloat(amountInput.value);
  let toCurrency = toCurrencySelect.value;

  if (isNaN(amount)) {
    console.error("Invalid amount value");
    return;
  }

  for (let key of Object.keys(data["data"])) {
    let countryCode = key;
    let rate = data["data"][key];

    if (toCurrency === countryCode) {
      let Amt = amount * rate;
      printAmount(Amt);
    }
  }
};

function printAmount(Amt) {
  showAmount.value = Amt;
  showAmount.readOnly = true;
}

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});
