import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Button from '../../components/button';
import Logo from '../../assets/images/logo.png';
import LogoIcon from '../../assets/images/logo.svg';
import CheckIcon from '../../assets/icons/check.svg';
import { setVersion } from '../../state/app-data/actions';
import { setName } from '../../state/user-data/actions';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="innerPage">
        <Helmet>
          <title>Not Found</title>
          <meta name="description" content="The page was not found" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Not Found</h1>
              <div><Link to={`${this.props.basePath}/`}>Home</Link></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
