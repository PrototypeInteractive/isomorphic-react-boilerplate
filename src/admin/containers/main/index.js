import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Button from '../../components/button';
import Logo from '../../assets/images/logo.png';
import LogoIcon from '../../assets/images/logo.svg';
import CheckIcon from '../../assets/icons/check.svg';
import { setVersion } from '../../state/app-data/actions';
import { setName } from '../../state/user-data/actions';

export class Main extends Component {
  static propTypes = {
    // Redux
    setName: PropTypes.func.isRequired,
    setVersion: PropTypes.func.isRequired,
    appData: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,

    // Component
    basePath: PropTypes.string.isRequired,
    rootPath: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      title: 'Test Admin page!!!'
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onButton2Click = this.onButton2Click.bind(this);
    this.onButton3Click = this.onButton3Click.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    this.setState({
      title: 'Updated Admin page!!!'
    });
  }

  onButton2Click(e) {
    const { setName } = this.props;

    e.preventDefault();
    setName('New name');
  }

  onButton3Click(e) {
    const { setVersion } = this.props;

    e.preventDefault();
    setVersion('1.2.3');
  }

  render() {
    const {
      userData, appData, basePath, rootPath
    } = this.props;

    const {
      title
    } = this.state;

    return (
      <section className="main">
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home description" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>{title}</h1>
              <h2>{userData.name}</h2>
              <h2>{appData.version}</h2>
              <h2>{appData.labels.LocalizedTitle}</h2>
              <CheckIcon width={50} height={50} />
              <div><Button label="Change title (state)" onClick={this.onButtonClick} /></div>
              <div><Button label="Change name (redux)" onClick={this.onButton2Click} /></div>
              <div><Button label="Change version (redux)" onClick={this.onButton3Click} /></div>
              <br />
              <div><Link to={`${basePath}/inner-page`}>Inner page</Link></div>
              <div><Link to={`${rootPath}`}>English</Link></div>
              <div><Link to={`${rootPath}/ar`}>Arabic</Link></div>
              <div><Link to={`${basePath}/asdf`}>404</Link></div>
              <br />
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

const mapDispatchToProps = dispatch => ({
  setVersion: (data) => dispatch(setVersion(data)),
  setName: (data) => dispatch(setName(data))
});

const mapStateToProps = state => ({
  appData: state.appData,
  userData: state.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
