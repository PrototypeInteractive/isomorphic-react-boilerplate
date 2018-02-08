import React, { Component } from 'react';
// import Icon from '../../components/icon';
import Button from '../../components/button';
import Logo from '../../assets/images/logo.png';
import LogoIcon from '../../assets/images/logo.svg';
import CheckIcon from '../../assets/icons/check.svg';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Test page!!!'
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e)
  {
    e.preventDefault();
    this.setState({
      title: 'Updated page!!!'
    })
  }

  render() {
    return (
      <section className="main">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>{this.state.title}</h1>
              <CheckIcon width={50} height={50} />
              <Button label="This is a button!!!" onClick={this.onButtonClick} />
              <div>
                <LogoIcon width={500} height={100} />
              </div>
              <div>
                <img src={Logo} alt="logo" width="500" height="100" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
