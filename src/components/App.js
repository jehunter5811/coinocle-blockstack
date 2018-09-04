import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  loadUserData,
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
  handleCoinbaseSecret,
  checkCoinbaseWallets
} from './helpers/wallets';
import {
  handleDeleteWallet,
} from './helpers/deleteWallet';
import {
  setCurrencies,
  filterCurrencyList,
  handlSetCurrency
} from './helpers/currencies';
import {
  getBalance
} from './helpers/conversions';
import {
  getToken,
  loadAccount,
  addCoinbase,
  getNewAccessToken,
  loadAccountRefresh
} from './helpers/auth';
import {
  loadTransactions,
  loadWalletTrans,
  saveTransactions
} from './helpers/transactions';
import Header from './Header';
import Signin from './Signin';
import Dashboard from './Dashboard';
import AllTransactions from './transactions/AllTransactions';
import SingleWalletTrans from './transactions/SingleWalletTrans';
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
      selectedCurrency: "USD",
      address: "",
      walletName: "",
      coinbaseKey: "",
      coinbaseSecret: "",
      coinbaseAccount: [],
      index: "",
      refreshToken: "",
      accessToken: "",
      accountId: "",
      count: 0,
      refreshing: false,
      deleting: false,
      walletToLoad: {},
      singleWalletTrans: []
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
    this.checkCoinbaseWallets = checkCoinbaseWallets.bind(this);
    this.getNewAccessToken = getNewAccessToken.bind(this);
    this.loadAccountRefresh = loadAccountRefresh.bind(this);
    this.handleDeleteWallet = handleDeleteWallet.bind(this);
    this.getBalance = getBalance.bind(this);
    this.loadTransactions = loadTransactions.bind(this);
    this.loadWalletTrans = loadWalletTrans.bind(this);
    this.saveTransactions = saveTransactions.bind(this);
  }

  componentDidMount() {
    isUserSignedIn() ? this.loadWallets() : loadUserData();
    isUserSignedIn() ? this.setCurrencies() : loadUserData();
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
    const { wallets, accountType, numberOfAddresses, filteredCurrencies, selectedCurrency, singleWalletTrans, walletToLoad } = this.state;

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
                        checkCoinbaseWallets={this.checkCoinbaseWallets}
                        handleDeleteWallet={this.handleDeleteWallet}
                        getBalance={this.getBalance}
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
                    <Route exact path="/transactions/single/:id" render={(props) =>
                      <SingleWalletTrans {...props}
                        checkCoinbaseWallets={this.checkCoinbaseWallets}
                        wallets={wallets}
                        singleWalletTrans={singleWalletTrans}
                        walletToLoad={walletToLoad}
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
