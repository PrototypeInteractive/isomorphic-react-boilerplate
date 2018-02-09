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

export class InnerPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="innerPage">
        <Helmet>
          <title>Inner Page</title>
          <meta name="description" content="Inner page description" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Inner page!</h1>
              <div><Link to={`${this.props.basePath}/`}>Home</Link></div>
              <div><Link to="/inner-page">English</Link></div>
              <div><Link to="/ar/inner-page">Arabic</Link></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setVersion: (data) => dispatch(setVersion(data)),
  setName: (data) => dispatch(setName(data))
});

const mapStateToProps = state => ({
  appData: state.appData,
  userData: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerPage);
