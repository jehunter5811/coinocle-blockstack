import React, { Component } from 'react';
import {
  isUserSignedIn,
} from 'blockstack';
import coinocle from '../images/coinocle.png';

export default class Header extends Component {

  componentDidMount() {
    window.$('.sidenav').sidenav();
  }

  renderHeader() {
    if (isUserSignedIn()) {
      return (
        <div>
          <nav>
           <div className="nav-wrapper">
             <a href='/' className="brand-logo"><img src={coinocle} className="logo" alt="account logo" /></a>
             <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><a onClick={ this.props.handleSignOut }>Sign out</a></li>
             </ul>
           </div>
          </nav>
        </div>
      );
    } else {
      return(
        <div />
      );
    }
  }

  render() {
    return (
      <div>
      {this.renderHeader()}
      </div>
    );
  }
}
