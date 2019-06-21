// @flow
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Login.css';
import M from 'materialize-css';
import { Modal, Button } from 'react-materialize';
import axios from 'axios';

type Props = {};
const trigger = <Button>Login</Button>;

class Login extends Component<Props> {
  props: Props;
  state = {
    user_id: '',
    user_pw: '',
    isLoginModalOpen: false,

    isModalOpen: false,
    modalHeader: '',
    modalBody: ''
  };

  componentDidMount() {
    M.Modal.init(this.Modal);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginCheck = e => {
    //e.preventDefault();
    let current = this;

    axios
      .post('https://kumoh42.com/app/data/member/doLogin.php', {
        user_id: this.state.user_id,
        user_pw: this.state.user_pw
      })
      .then(function(response) {
        console.log(response);
        current.setState({
          isLoginModalOpen: false,
          isModalOpen: true,
          modalHeader: '로그인 실패',
          modalBody: response.data[0].message
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    //this.props.history.push(routes.BOARD);
  };

  handleModalClose() {
    this.setState({
      isModalOpen: false
    });
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2 class="animated bounce">KumohTime</h2>
        <div className={`row ${styles.userForm}`}>
          <div class="col s12">
            <p>금오사이 계정으로 로그인하세요.</p>
          </div>
          <div class="input-field col s12">
            <input
              id="user_id"
              name="user_id"
              type="text"
              value={this.state.user_id}
              onChange={this.handleChange}
            />
            <label for="user_id">ID</label>
          </div>
          <div class="input-field col s12">
            <input
              id="user_pw"
              name="user_pw"
              type="password"
              value={this.state.user_pw}
              onChange={this.handleChange}
            />
            <label for="user_pw">Password</label>
          </div>
          <div class="col s12">
            <Modal
              header={this.state.modalHeader}
              open={this.state.isModalOpen}
              actions={<div className="row" />}
              options={{
                dismissible: true,
                onCloseEnd: () => this.handleModalClose()
              }}
            >
              {this.state.modalBody}
            </Modal>
            <Modal
              header=""
              trigger={trigger}
              open={this.state.isLoginModalOpen}
              bottomSheet
              actions={<div className="row" />}
              options={{
                dismissible: true,
                onOpenEnd: () => this.handleLoginCheck()
              }}
            >
              <div class="row">
                <div class="col s12 center">
                  <div class="preloader-wrapper small active">
                    <div class="spinner-layer spinner-blue">
                      <div class="circle-clipper left">
                        <div class="circle" />
                      </div>
                      <div class="gap-patch">
                        <div class="circle" />
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle" />
                      </div>
                    </div>

                    <div class="spinner-layer spinner-red">
                      <div class="circle-clipper left">
                        <div class="circle" />
                      </div>
                      <div class="gap-patch">
                        <div class="circle" />
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle" />
                      </div>
                    </div>

                    <div class="spinner-layer spinner-yellow">
                      <div class="circle-clipper left">
                        <div class="circle" />
                      </div>
                      <div class="gap-patch">
                        <div class="circle" />
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle" />
                      </div>
                    </div>

                    <div class="spinner-layer spinner-green">
                      <div class="circle-clipper left">
                        <div class="circle" />
                      </div>
                      <div class="gap-patch">
                        <div class="circle" />
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12 center">
                  <p>로그인 정보를 가져오는 중</p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

//<Link to={routes.COUNTER}>to Counter</Link>
export default withRouter(Login);
