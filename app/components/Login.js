// @flow
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import routes from "../constants/routes";
import styles from "./Login.css";
import M from "materialize-css";
import { Modal, Button } from "react-materialize";
import axios from "axios";
import { Animated } from "react-animated-css";
import queryString from "query-string";

type Props = {};
const trigger = <Button>로그인</Button>;

class Login extends Component<Props> {
  props: Props;
  state = {
    user_id: "",
    user_pw: "",
    isLoginModalOpen: false,

    isModalOpen: false,
    modalHeader: "",
    modalBody: "",

    isVisibleLoginForm: true
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
      .post(
        "https://kumoh42.com/app/data/service/kumohtime/doLogin.php",
        queryString.stringify({
          user_id: current.state.user_id,
          user_pw: current.state.user_pw
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          }
        }
      )
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          if (response.data.error === 0) {

            localStorage.account = JSON.stringify({
              type : response.data.type,
              hash : response.data.hash
            });

            if(response.data.type == 'kumoh42'){
              sessionStorage.account = JSON.stringify({
                type : response.data.type,
                name : response.data.data.user_name,
                profile_image : response.data.data.profile_image,
                department : response.data.data.department
              });
            }else{
              sessionStorage.account = JSON.stringify({
                type : response.data.type,
                name : current.state.user_id,
                profile_image : 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png',
                department : '원스톱 계정'
              });
            }

            current.setState({
              isLoginModalOpen: false,
              isVisibleLoginForm: false
            });

            setTimeout(function() {
              current.props.history.push(routes.BOARD);
            }, 1200);
          } else {
            current.setState({
              isLoginModalOpen: false,
              isModalOpen: true,
              modalHeader: "로그인 실패",
              modalBody: response.data.message
            });
          }
        } else {
          console.log(response);
          current.setState({
            isLoginModalOpen: false,
            isModalOpen: true,
            modalHeader: "로그인 실패",
            modalBody: "서버에 접근 중 오류가 발생하였습니다."
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        current.setState({
          isLoginModalOpen: false,
          isModalOpen: true,
          modalHeader: "로그인 실패",
          modalBody: "서버에 접근 중 오류가 발생하였습니다."
        });
      });
  };

  handleModalClose() {
    this.setState({
      isModalOpen: false
    });
  }

  handlePassLogin() {
    let current = this;

    localStorage.removeItem('account');
    sessionStorage.removeItem('account');

    this.setState({
      isVisibleLoginForm: false
    });

    setTimeout(function() {
      current.props.history.push(routes.BOARD);
    }, 1200);
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={this.state.isVisibleLoginForm}
        >
          <div className={styles.loginForm}>
            <h2 class="bold">KumohTime</h2>
            <div className={`row ${styles.userForm}`}>
              <div class="col s12">
                <p>
                  금오사이 계정 또는 원스톱 계정으로 로그인하고
                  <br />
                  시간표를 관리 해 보세요
                </p>
              </div>
              <br />
              <div className={`input-field col s12 ${styles.inputStyle}`}>
                <input
                  id="user_id"
                  name="user_id"
                  type="text"
                  value={this.state.user_id}
                  onChange={this.handleChange}
                />
                <label for="user_id">ID</label>
              </div>
              <div className={`input-field col s12 ${styles.inputStyle}`}>
                <input
                  id="user_pw"
                  name="user_pw"
                  type="password"
                  value={this.state.user_pw}
                  onChange={this.handleChange}
                  className={styles.inputStyle}
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
                      <p class="black-text">로그인 정보를 가져오는 중</p>
                    </div>
                  </div>
                </Modal>
              </div>
              <div className={`col s12 ${styles.passLogin}`}>
                <Button
                  flat
                  waves="light"
                  onClick= {() => this.handlePassLogin()}
                  tooltip="로그인하지 않으면 시간표 동기화가 비활성화됩니다."
                  tooltipOptions={{ position: "bottom" }}
                >
                  <span class="white-text">로그인하지 않고 사용하기</span>
                </Button>
                <br />
                <Link to={routes.LOADING}>
                  <Button flat waves="light">
                    <span class="white-text">Loading Test</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    );
  }
}

//<Link to={routes.COUNTER}>to Counter</Link>
export default withRouter(Login);
