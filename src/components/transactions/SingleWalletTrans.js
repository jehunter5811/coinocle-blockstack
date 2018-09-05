import React, { Component } from 'react';

export default class SingleWalletTrans extends Component {
  componentDidMount() {
    this.props.checkCoinbaseWallets(window.location.href.split('single/')[1]);
    var elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems);
  }

  render() {
    const { singleWalletTrans, walletToLoad, options, change, category } = this.props;
    console.log(category)
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
                  <th>Category <span className="tiny right"><a className="modal-trigger" href="#categoryModal">Add categories</a></span></th>
              </tr>
            </thead>

            <tbody>
              {
              singleWalletTrans.map(trans => {
              return(
                <tr key={trans.id}>
                  <td>{trans.created_at}</td>
                  <td>{trans.type}</td>
                  <td>{trans.native_amount.amount}</td>
                  <td>{trans.amount.amount}</td>
                  <td>
                  <select value={trans.category} onChange={this.props.handleSetCategory}>
                    <option value="" disabled selected>Categorize transaction</option>
                    <option value="none">None</option>
                    {options.reverse().map(option => {
                      return(
                        <option key={option} value={option}>{option}</option>
                      )
                    })}
                  </select>
                  {change ? <span className="right tiny"><a onClick={() => this.props.handleCategoryChange(trans)}>Save</a></span> : <span className="hide"></span>}
                  </td>
                </tr>
              );
              })
            }
            </tbody>
          </table>

          {/* Category Modal */}
          <div id="categoryModal" className="modal">
           <div className="modal-content">
             <h4>Add Transaction Category</h4>
             <input placeholder="New category" id="category" type="text" onChange={this.props.handleCategory} />
             <label htmlFor="category">New Category</label>
           </div>
           <div className="modal-footer">
             <a onClick={this.props.addCategory} className="modal-close waves-effect waves-green btn-flat">Add Category</a>
             <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
           </div>
         </div>
          {/* End Category Modal */}
        </div>
      </div>
    );
  }
}
