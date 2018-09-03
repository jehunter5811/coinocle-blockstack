import React, { Component } from 'react';
import Loading from './Loading';

export default class Auth extends Component {
  componentDidMount() {
    this.props.getToken();
  }
  render() {

    return (
      <div>
        <div className="container loading-indicator">
          Connecting...
          <Loading />
        </div>
      </div>
    );
  }
}
