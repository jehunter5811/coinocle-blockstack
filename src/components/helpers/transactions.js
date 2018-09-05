import {
  getFile,
  putFile
} from 'blockstack';
let transactions;
let nextPage = false;

export function loadWalletTrans() {
  getFile(window.location.href.split('single/')[1] + '/transactions.json', {decrypt: true})
    .then((fileContents) => {
      if(fileContents) {
        this.setState({ singleWalletTrans: JSON.parse(fileContents || '{}')})
        var elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems);
      } else {
        this.setState({ singleWalletTrans: []})
      }
    })
    .then(() => {
      if(this.state.singleWalletTrans.length < 1) {
        this.loadTransactions();
      } else {
        console.log(nextPage)
      }
    })
    .catch(error => {
      console.log(error);
    })

}

export function loadTransactions() {
  if(this.state.refreshing === false) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.coinbase.com/v2/accounts/" + window.location.href.split('single/')[1] + "/transactions/",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer " + this.state.walletToLoad.access,
        "Cache-Control": "no-cache",
      }
    }

    window.$.ajax(settings).done(function (response) {
      transactions = response.data
      if(response.data.next_uri !== null) {
        nextPage = true;
      } else {
        nextPage = false;
      }
    })
    .then(() => {
      let oldTransactions = this.state.singleWalletTrans;
      if(oldTransactions.length === 0) {
        this.setState({ singleWalletTrans: oldTransactions.concat(transactions)})
        var elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems);
      } else {
        //This is where you'll push new transactions in.
      }
    })
    .then(() => {
      this.saveTransactions();
    })
  } else {
    setTimeout(this.loadTransactions, 300)
  }
}

export function saveTransactions() {
  putFile(window.location.href.split('single/')[1] + '/transactions.json', JSON.stringify(this.state.singleWalletTrans), {encrypt: true})
      .then(() => {
        console.log("Saved!");
      })
      .catch(error => {
        console.log(error);
      })
}
