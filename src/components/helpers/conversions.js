import axios from 'axios';

export function worldCurrencies() {
  // let currencies = {
  //   "US dollar":"USD",
  //   "European Euro":"EUR",
  //   "Japanese yen":"JPY",
  //   "Pound sterling":"GBP",
  //   "Australian dollar":"AUD",
  //   "Canadian dollar":"CAD",
  //   "Swiss franc":"CHF",
  //   "Chinese Yuan Renminbi":"CNY",
  //   "Swedish krona":"SEK",
  //   "Mexican peso":"MXN",
  //   "New Zealand dollar":"NZD",
  //   "Singapore dollar":"SGD",
  //   "Hong Kong dollar":"HKD",
  //   "Norwegian krone":"NOK",
  //   "South Korean won":"KRW",
  //   "Turkish lira":"TRY",
  //   "Indian rupee":"INR",
  //   "Russian ruble":"RUB",
  //   "Brazilian real":"BRL",
  //   "South African rand":"ZAR",
  //   "Danish krone":"DKK",
  //   "Polish zloty":"PLN",
  //   "New Taiwan dollar":"TWD",
  //   "Thai baht":"THB",
  //   "Malaysian ringgit":"MYR"
  // }
}

export function getBalance(props) {
  let value;
  axios.get('https://min-api.cryptocompare.com/data/price?fsym=' + props.currency + '&tsyms=' + this.state.selectedCurrency).then((response) => { return value = response.data});
  console.log(value);
}
