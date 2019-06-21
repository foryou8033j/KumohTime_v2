// @flow
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import routes from "../constants/routes";
import styles from "./Loading.css";

type Props = {};

class Logout extends Component<Props> {
  props: Props;


  componentDidMount() {
    this.logout();
  }

  async logout() {
    sessionStorage.removeItem('account');
    localStorage.removeItem('account');
    this.props.history.push(routes.LOADING);
  }


  render() {
    return (
      <div className={styles.container} data-tid="container">

      </div>
    );
  }
}

export default withRouter(Logout);
