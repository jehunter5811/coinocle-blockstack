import {
  getFile,
  putFile
} from 'blockstack';
import update from 'immutability-helper';

export function loadCategories() {
  getFile('categories.json', {decrypt: true})
    .then((fileContents) => {
      if(fileContents) {
        this.setState({ options: JSON.parse(fileContents || '{}')})
      } else {
        this.setState({ options: [] });
      }
    })
}

export function handleCategory(e) {
  this.setState({ newCategory: e.target.value });
}

export function addCategory() {
  this.setState({ options: [...this.state.options, this.state.newCategory] });
  setTimeout(this.saveCategory, 300)
}

export function saveCategory() {
  putFile('categories.json', JSON.stringify(this.state.options), {encrypt: true})
    .then(() => {
      console.log("Success")
      this.setState({ newCategory: "" });
      window.M.toast({html: 'Category added'})
      this.loadCategories();
    })
    .catch(error => {
      console.log(error);
    })
}

export function handleSetCategory(e) {
  this.setState({ category: e.target.value, change: true });
}

export function handleCategoryChange(props) {
  let transactions = this.state.singleWalletTrans;
  const thisTrans = transactions.find((trans) => {
    return trans.id.toString() === props.id
  });
  let index = thisTrans && thisTrans.id;
  function findObjectIndex(trans) {
    return trans.id === index; //this is comparing a number to a number
  }
  this.setState({index: transactions.findIndex(findObjectIndex)})
  const object = props;
  object.category = this.state.category;
  const indexCheck = this.state.index;
  const updatedTrans = update(this.state.singleWalletTrans, {$splice: [[indexCheck, 1, object]]});
  this.setState({ singleWalletTrans: updatedTrans });
  setTimeout(this.saveTrans, 300)
}

export function saveTrans() {
  this.setState({ change: false });
  this.saveTransactions();
  console.log(this.state.singleWalletTrans)
}
