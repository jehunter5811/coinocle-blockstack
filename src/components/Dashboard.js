import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TotalBalance from './accountInfo/TotalBalance';
import AddWallet from './wallets/AddWallet';

export default class Dashboard extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems);
  }


  render() {
    const { wallets, accountType, numberOfAddresses, filteredCurrencies, selectedCurrency } = this.props;
    let walletList;
    if(wallets === undefined) {
      walletList = []
    } else {
      walletList = wallets
    }

    return (
      <div className="container">
        <div className="center-align">
        <h3>Dashboard</h3>
        <h5>Value Across Accounts/Wallets</h5>
        <div>
          <TotalBalance />
          <div>

            {/* Add Button */}
            <div className="fixed-action-btn">
              <a className="btn-floating btn-large add-button modal-trigger" href="#addWallet">
                <i className="large material-icons">add</i>
              </a>
            </div>
            {/* End Add Button */}

            {/* Add Wallet Modal */}
            <div id="addWallet" className="modal">
              <AddWallet
                handleAccountType={this.props.handleAccountType}
                filterCurrencyList={this.props.filterCurrencyList}
                handlSetCurrency={this.props.handlSetCurrency}
                addWallet={this.props.addWallet}
                handleAddress={this.props.handleAddress}
                handleWalletName={this.props.handleWalletName}
                handleCoinbaseKey={this.props.handleCoinbaseKey}
                handleCoinbaseSecret={this.props.handleCoinbaseSecret}
                selectedCurrency={selectedCurrency}
                accountType={accountType}
                numberOfAddresses={numberOfAddresses}
                filteredCurrencies={filteredCurrencies}
              />
            </div>
            {/* Add Wallet Modal */}

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
                    <td>{wallet.walletName}</td>
                    <td>{wallet.balance || "-"}</td>
                    <td><Link to={'/documents/doc/delete/'+ wallet.id}><i className="modal-trigger material-icons red-text delete-button">delete</i></Link></td>
                  </tr>
                );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
