import {
  putFile
} from 'blockstack';

export function handleDeleteWallet(props) {
  var data = window.$.grep(this.state.wallets, function(e){
     return e.id !== props.id;
});
this.setState({ wallets: data, deleting: true })
putFile(props.id + '/transactions.json', JSON.stringify(this.state.singleWalletTrans), {encrypt: true})
    .then(() => {
      console.log("Saved!");
    })
    .catch(error => {
      console.log(error);
    })
setTimeout(this.saveWallet, 300)
}
