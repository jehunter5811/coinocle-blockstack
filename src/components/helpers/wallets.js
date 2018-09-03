import { getFile, putFile } from "blockstack";
const uuidv4 = require('uuid/v4');

export function loadWallets() {
  getFile("wallets.json", { decrypt: true }).then(fileContents => {
    if (fileContents) {
      this.setState({
        wallets: JSON.parse(fileContents)
      });
    } else {
      this.setState({
        wallets: []
      });
    }
  });
}

export function handleAddress(e) {
  this.setState({ address: e.target.value });
}

export function handleWalletName(e) {
  this.setState({ walletName: e.target.value });
}

export function handleAccountType(e) {
  this.setState({ accountType: e.target.value });
}

export function handleMultipleAddresses(e) {
  this.setState({ numberOfAddresses: e.target.value });
}

export function handleCoinbaseKey(e) {
  this.setState({ coinbaseKey: e.target.value });
}

export function handleCoinbaseSecret(e) {
  this.setState({ coinbaseSecret: e.target.value });
}

export function addWallet() {
  window.M.toast({ html: "Adding wallet or account..." });
  const object = {};
  if (this.state.accountType === "single") {
    object.id = uuidv4();
    object.walletName = this.state.walletName;
    object.address = this.state.address;
    object.accountType = this.state.accountType;
    object.currency = this.state.currencySelected;
    object.dateAdded = new Date();
    this.setState({ wallets: [...this.state.wallets, object] });
    setTimeout(this.saveWallet, 300);
  } else if (this.state.accountType === "coinbase") {
    window.location.replace('https://www.coinbase.com/oauth/authorize?client_id=5e10c95430a34c3490a4fd68fd1f40c4fe1f05db351318bfd0df5ea7b06ae29f&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcoinbase%2Fcallback&response_type=code&scope=wallet%3Auser%3Aread%2Cwallet%3Aaccounts%3Aread')
  } else if (this.state.accountType === "gdax") {
  } else if (this.state.accountType === "gemini") {
  }
}

export function saveWallet() {
  putFile("wallets.json", JSON.stringify(this.state.wallets), { encrypt: true })
    .then(() => {
      console.log("Saved!");
      window.M.toast({ html: "Wallet or account added!" });
      if(window.location.pathname.includes('auth')) {
        window.location.replace('/')
      }
    })
    .catch(error => {
      console.log(error);
    });
}
