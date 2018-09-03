import React, { Component } from 'react';
import coinbase from '../../images/coinbase.png';

export default class AddWallet extends Component {

  componentDidMount() {
    var elemsTwo = document.querySelectorAll('select');
    window.M.FormSelect.init(elemsTwo);
  }

  render() {
    const {accountType, filteredCurrencies, selectedCurrency} = this.props;
    return (
      <div>
      <div className="modal-content">
        <h4>Add Wallet</h4>
        <div className="row container">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this.props.handleWalletName} placeholder="Wallet or Account Name" id="wallet_name" type="text" />
                <label htmlFor="first_name">Wallet or Account Name</label>
              </div>
              <div className="input-field col s12">
                <select value={accountType} onChange={this.props.handleAccountType}>
                  <option value="" disabled selected>Select Account Type</option>
                  <option value="single">Enter Crypto Address</option>
                  <option value="coinbase">Connect to Coinbase</option>
                  <option value="gdax">Connect to GDAX</option>
                  <option value="gemini">Connect to Gemini</option>
                </select>
                <label>Account/Wallet Type</label>
              </div>
              {
                accountType === "single" ?
                <div>
                  <div className="input-field col s12">
                    <input onChange={this.props.handleAddress} placeholder="Address" id="address" type="text" />
                    <label className="active" htmlFor="address">Wallet Address</label>
                  </div>
                  <div className="input-field col s12">
                    {
                      selectedCurrency ==="" ?
                      <div>
                        <input placeholder="Search for a currency" onChange={this.props.filterCurrencyList} type="text" />
                        <label className="active" htmlFor="currency">Search for a Currency</label>
                      </div> :
                      <input type="text" readOnly value={selectedCurrency} />
                    }
                    {selectedCurrency ==="" ?
                    <div className="collection">
                    {filteredCurrencies.map(result => {
                        return (
                          <div key={result.id}>
                          <a className="collection-item" onClick={() => this.props.handlSetCurrency(result.name)}>
                            {result.name} - {result.symbol}
                          </a>
                          </div>
                        )
                      })
                    }
                    </div> :
                    null
                    }
                  </div>
                </div> :
                accountType === "coinbase" ?
                <div className="input-field col s12">
                  <p>Click to connect</p>
                  <a onClick={this.props.addWallet} className='coinbase modal-trigger' href='#coinbaseModal'><img className="left coinbase-logo" src={coinbase} alt='connect with coinbase' /></a>
                </div> :
                accountType === "gdax" ?
                <div className="input-field col s12">
                  GDAX
                  <label>GDAX</label>
                </div> :
                accountType === "gemini" ?
                <div className="input-field col s12">
                  Gemini
                  <label>Gemini</label>
                </div> :
                null
              }
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        {accountType === "single" ?
          <a onClick={this.props.addWallet} className="modal-close waves-effect waves-green btn-flat">Add</a>:
          <div className="hide"></div>
        }
        <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
      </div>
    );
  }
}
