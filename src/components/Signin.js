import React, { Component } from 'react';
import Header from './Header';

export default class Signin extends Component {
  render() {
    const { handleSignIn } = this.props;

    return (
      <div>
      <Header />
      <div className="welcome center-align" id="section-1">
        <h1 className="landing-heading">Welcome!</h1>
        <p className="intro-text">
        Coinocle is your decentralized and encrypted checkbook register for cryptocurrency.
        </p>
        <p className="lead">
          <button
            className="log-in btn btn-primary btn-lg"
            id="signin-button"
            onClick={ handleSignIn.bind(this) }
          >
            Sign In with Blockstack
          </button>
        </p>

      </div>
      </div>
    );
  }
}
