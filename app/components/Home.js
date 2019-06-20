// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

type Props = {};

$(document).ready(function(){
  
});

export default class Home extends Component<Props> {
  props: Props;


  handleLoginCheck(){
    $('.model').modal();
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>KumohTime</h2>
        <div className={`row ${styles.userForm}`}>
          <div class="col s12">
            <p>금오사이 계정으로 로그인하세요.</p>
          </div>
          <div class="input-field col s12">
            <input id="user_id" type="text" />
            <label for="user_id">ID</label>
          </div>
          <div class="input-field col s12">
            <input id="password" type="password" />
            <label for="password">Password</label>
          </div>
          <div class="col s12">
            <button type="button" class="waves-effect waves-light btn" onClick={this.handleLoginCheck} >Login</button><br/><br/>
            <Link to={routes.BOARD}>to Board</Link><br/><br/>
            <button data-target="modal-alert" class="btn modal-trigger">Modal</button><br/><br/>
          </div>
        </div>
      </div>
    );
  }
}

//<Link to={routes.COUNTER}>to Counter</Link>
