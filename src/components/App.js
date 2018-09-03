import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  // loadUserData,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import {
  loadWallets,
  handleAccountType,
  handleMultipleAddresses,
  addWallet,
  saveWallet,
  handleAddress,
  handleWalletName,
  handleCoinbaseKey,
  handleCoinbaseSecret
} from './helpers/wallets';
import {
  setCurrencies,
  filterCurrencyList,
  handlSetCurrency
} from './helpers/currencies';
import {
  getToken,
  loadAccount,
  addCoinbase
} from './helpers/auth';
import Header from './Header';
import Signin from './Signin';
import Dashboard from './Dashboard';
import AllTransactions from './transactions/AllTransactions';
import Auth from './Auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      accountType: "",
      numberOfAddresses: 0,
      currencies: [],
      filteredCurrencies: [],
      selectedCurrency: "",
      address: "",
      walletName: "",
      coinbaseKey: "",
      coinbaseSecret: "",
      coinbaseAccount: []
    };
    this.loadWallets = loadWallets.bind(this);
    this.handleAccountType = handleAccountType.bind(this);
    this.handleMultipleAddresses = handleMultipleAddresses.bind(this);
    this.setCurrencies = setCurrencies.bind(this);
    this.filterCurrencyList = filterCurrencyList.bind(this);
    this.handlSetCurrency = handlSetCurrency.bind(this);
    this.addWallet = addWallet.bind(this);
    this.saveWallet = saveWallet.bind(this);
    this.handleAddress = handleAddress.bind(this);
    this.handleWalletName = handleWalletName.bind(this)
    this.handleCoinbaseKey = handleCoinbaseKey.bind(this);
    this.handleCoinbaseSecret = handleCoinbaseSecret.bind(this);
    this.getToken = getToken.bind(this);
    this.loadAccount = loadAccount.bind(this);
    this.addCoinbase = addCoinbase.bind(this);
  }

  componentDidMount() {
    this.loadWallets();
    this.setCurrencies();
  }

  handleSignIn(e) {
    e.preventDefault();
    const origin = window.location.origin;
    redirectToSignIn(origin, origin + "/manifest.json", [
      "store_write",
      "publish_data"
    ]);
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  render() {
    const { wallets, accountType, numberOfAddresses, filteredCurrencies, selectedCurrency } = this.state;

    return (
      <div>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            {!isUserSignedIn() ? (
                <Signin handleSignIn={this.handleSignIn} />
              ) : (
                <div>
                  <Header
                    handleSignOut={this.handleSignOut}
                  />
                  <BrowserRouter>
                    <div>
                    <Route exact path="/" render={(props) =>
                      <Dashboard {...props}
                        loadWallets={this.loadWallets}
                        handleAccountType={this.handleAccountType}
                        setCurrencies={this.setCurrencies}
                        filterCurrencyList={this.filterCurrencyList}
                        handlSetCurrency={this.handlSetCurrency}
                        addWallet={this.addWallet}
                        handleAddress={this.handleAddress}
                        handleWalletName={this.handleWalletName}
                        handleCoinbaseKey={this.handleCoinbaseKey}
                        handleCoinbaseSecret={this.handleCoinbaseSecret}
                        wallets={wallets}
                        accountType={accountType}
                        numberOfAddresses={numberOfAddresses}
                        filteredCurrencies={filteredCurrencies}
                        selectedCurrency={selectedCurrency}
                      />}
                    />
                    <Route exact path="/transactions" render={(props) =>
                      <AllTransactions {...props}

                      />}
                    />
                    <Route path="/auth" render={(props) =>
                      <Auth {...props}
                        getToken={this.getToken}
                      />}
                    />
                    </div>
                  </BrowserRouter>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
