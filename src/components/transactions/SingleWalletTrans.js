import React, { Component } from 'react';

export default class SingleWalletTrans extends Component {
  componentDidMount() {
    this.props.checkCoinbaseWallets(window.location.href.split('single/')[1]);
  }

  render() {
    const { singleWalletTrans, walletToLoad } = this.props;
    return (
      <div>
        <div className="container">
          <h3>Transactions for {walletToLoad.walletName}</h3>
          <table>
            <thead>
              <tr>
                  <th>Date</th>
                  <th>Inflow/Outflow</th>
                  <th>Amount</th>
                  <th>Coin Amount</th>
                  <th>Category</th>
              </tr>
            </thead>

            <tbody>
              {
              singleWalletTrans.reverse().map(trans => {
              return(
                <tr key={trans.id}>
                  <td>{trans.created_at}</td>
                  <td>{trans.type}</td>
                  <td>{trans.native_amount.amount}</td>
                  <td>{trans.amount.amount}</td>
                  <td>
                  <select>
                    <option value="" disabled selected>Categorize transaction</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                    <option value="4">Category 4</option>
                    <option value="5">Category 5</option>
                  </select>
                  </td>
                </tr>
              );
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
