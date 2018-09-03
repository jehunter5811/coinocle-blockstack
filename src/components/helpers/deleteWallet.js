export function handleDeleteWallet(props) {
  var data = window.$.grep(this.state.wallets, function(e){
     return e.id !== props.id;
});
console.log(data)
this.setState({ wallets: data, deleting: true })
setTimeout(this.saveWallet, 300)
}
