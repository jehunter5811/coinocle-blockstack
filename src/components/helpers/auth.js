
let bearer = null;
let refresh = null;
let coinbaseAccount;

export function getToken() {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.coinbase.com/oauth/token",
  "method": "POST",
  "headers": {
    "Cache-Control": "no-cache",
    // "Postman-Token": "60738d2f-4c36-2425-4a7d-e0d573cd355e",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "data": {
    "grant_type": "authorization_code",
    "code": window.location.href.split('code=')[1],
    "client_id": "5e10c95430a34c3490a4fd68fd1f40c4fe1f05db351318bfd0df5ea7b06ae29f", //TODO make these variables and don't commit them
    "client_secret": "62060e56af300eb4d9bd59a27c61a7994dc4e7dc0f8782adc6b95848baf0ec43",
    "redirect_uri": "http://localhost:3000/auth/coinbase/callback"
  }
}

  window.$.ajax(settings).done(function (response) {
    console.log(response);
    bearer = response.access_token;
    refresh = response.refresh_token;
  })
  .then(() => {
    this.loadAccount();
  })
}

export function loadAccount() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.coinbase.com/v2/accounts",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + bearer,
      "Cache-Control": "no-cache"
    }
  }
  window.$.ajax(settings).done(function (response) {
    console.log(response);
    coinbaseAccount = response.data;
    console.log(coinbaseAccount);
  })
  .then(() => {
    this.setState({ coinbaseAccount: coinbaseAccount});
    setTimeout(this.addCoinbase, 300);
  })
}

export function addCoinbase() {
  const object = {};
  object.access = bearer;
  object.refresh = refresh;
  object.id = this.state.coinbaseAccount[0].id;
  object.walletName = "Coinbase " + this.state.coinbaseAccount[0].name;
  object.accountType = "Coinbase";
  object.balance = this.state.coinbaseAccount[0].balance.amount;
  object.currency = this.state.coinbaseAccount[0].currency;
  object.dateAdded = new Date();
  console.log(object);
  this.setState({ wallets: [...this.state.wallets, object] });
  setTimeout(this.saveWallet, 300);
}

export function getNewAccessToken() {

}
