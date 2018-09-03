import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Wallets extends Component {
  componentDidMount() {
    this.props.loadWallets();
  }

  render() {
    const { wallets } = this.props;
    let walletList;
    if(wallets === undefined) {
      walletList = []
    } else {
      walletList = wallets
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
                <th>Wallet/Account Name</th>
                <th>Current Value</th>
                <th></th>
            </tr>
          </thead>

          <tbody>
            {
            walletList.reverse().map(wallet => {
            return(
              <tr key={wallet.id}>
                <td><input type="checkbox" checked={this.props.checked} value={wallet.id} id={wallet.id} onChange={this.props.handleCheckbox} /><label htmlFor={wallet.id}></label></td>
                <td>{wallet.name}</td>
                <td>{wallet.balance}</td>
                <td><Link to={'/documents/doc/delete/'+ wallet.id}><i className="modal-trigger material-icons red-text delete-button">delete</i></Link></td>
              </tr>
            );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
