import React, { Component } from 'react';
import Icon from '../../components/icon';
import Button from '../../components/button';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <h1>Test page!</h1>
        <Icon />
        <Button />
      </div>
    );
  }
}
