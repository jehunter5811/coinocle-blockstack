import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TotalBalance from './accountInfo/TotalBalance';
import AddWallet from './wallets/AddWallet';
import DeleteWallet from './wallets/DeleteWallet';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {}
    }
  }
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
                    <td>{wallet.walletName} <span className='right'><a onClick={this.props.checkCoinbaseWallets}>Refresh</a></span></td>
                    <td>{wallet.balance || "-"}</td>
                    <td><a onClick={() => this.setState({wallet: wallet})} className="modal-trigger" href="#deleteWallet"><i className="material-icons red-text delete-button">delete</i></a></td>
                  </tr>
                );
                })
              }
              </tbody>
            </table>

            {/* Delete Wallet Modal */}
            <div id="deleteWallet" className="modal">
              <DeleteWallet
                handleDeleteWallet={this.props.handleDeleteWallet}
                wallet={this.state.wallet}
              />
            </div>
            {/* Delete Wallet Modal */}

          </div>
        </div>
        </div>
      </div>
    );
  }
}
