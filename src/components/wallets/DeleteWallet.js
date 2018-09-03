import React, { Component } from 'react';

export default class DeleteWallet extends Component {

  componentDidMount() {
    var elemsTwo = document.querySelectorAll('select');
    window.M.FormSelect.init(elemsTwo);
  }

  render() {
    const {wallet} = this.props;
    return (
      <div>
      <div className="modal-content">
        <h4>Delete Wallet</h4>
        <div className="row container">
          <p>Are you sure you want to delete {wallet.walletName}?</p>
        </div>
      </div>
      <div className="modal-footer">
        <a onClick={() => this.props.handleDeleteWallet(wallet)}className="modal-close waves-effect waves-green btn red">Delete</a>
        <a className="modal-close waves-effect waves-green btn grey">Cancel</a>
      </div>
      </div>
    );
  }
}
