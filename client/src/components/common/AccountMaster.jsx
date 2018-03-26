import 'babel-polyfill';
import React, { ReactPropTypes } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import LoadingBar from 'react-redux-loading-bar';

/* eslint-disable react/prefer-stateless-function */
class AccountMaster extends React.Component {
  render() {
    return (
      <div className="primary-bg-color full-height">
        <LoadingBar className="loadingBar" />
        <ToastContainer autoClose={10000} />
        <div className="container padding-top">
          {/*<!-- Logo Image Begins -->*/}
          <div className="row">
            <div className="col hide-on-small-only m4 l4 xl4" />
            <div className="col s12 m4 l4 xl4">
              <div className="center">
                <img className="responsive-img center" alt="" height="60" width="60" src="./assets/logo.jpg" />
              </div>
            </div>
            <div className="col hide-on-small-only m4 l4 xl4" />
          </div>
          {/*<!-- Logo Image Ends -->*/}
          {/*<!-- Heading content Begins -->*/}
          <div className="center">
            <h3 className="white-text">SLATE</h3>
            <p className="white-text">Your personal docket</p>
          </div>
          {/*<!-- Heading content Ends -->*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}
/*
AccountMaster.propTypes = {
  children: ReactPropTypes.object.isRequired
};
*/

export default AccountMaster;