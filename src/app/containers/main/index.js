import React, { Component } from 'react';
import Icon from '../../components/icon';
import Button from '../../components/button';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <section className="main">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Test page!!!</h1>
              <Icon alt="This is an icon!!!" />
              <Button label="This is a button!!!" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
