// @flow
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import routes from "../constants/routes";
import styles from "./Loading.css";
import M from "materialize-css";
import { Modal, Button } from "react-materialize";
import { Animated } from "react-animated-css";
import axios from "axios";

type Props = {};
const trigger = <Button>Modal Test</Button>;

class Loading extends Component<Props> {
  props: Props;
  state = {
    loadingText: "",
    animation: false,
    isModalOpen: false,
    modalHeader: "",
    modalBody: ""
  };

  changeMessage(message) {
    let current = this;

    current.setState({ animation: false });
    setTimeout(function() {
      current.setState({
        loadingText: message,
        animation: true
      });
    }, 300);
  }

  componentDidMount() {
    this.loadTasks();
  }

  async loadTasks() {
    let current = this;

    current.changeMessage("서버 연결 확인 중");
    try {
      const liveResponse = await axios.get("https://kumoh42.com/");
      if (liveResponse.status === 200) {
        current.changeMessage("로그인 정보 확인 중");

        setTimeout(async function() {
          if (localStorage.account) {

            let account = JSON.parse(localStorage.account);

            try{
              const accountResponse = await axios.get("https://kumoh42.com/app/data/service/kumohtime/accountCheck.php?hash=" + account.hash);
              if (accountResponse.status === 200) {
                current.setState({ animation: false });

                if(accountResponse.data.type == 'kumoh42'){
                  sessionStorage.account = JSON.stringify({
                    type : accountResponse.data.type,
                    name : accountResponse.data.data.user_name,
                    profile_image : accountResponse.data.data.profile_image,
                    department : accountResponse.data.data.department
                  });
                }else{
                  sessionStorage.account = JSON.stringify({
                    type : accountResponse.data.type,
                    name : accountResponse.data.data.user_id,
                    profile_image : 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png',
                    department : '원스톱 계정'
                  });
                }

                setTimeout(function() {
                  current.props.history.push(routes.BOARD);
                }, 300);
              } else {
                this.setState({
                  modalHeader: "오류",
                  modalBody: "클라우드 정보를 수신 할 수 없습니다.",
                  isModalOpen: true
                });
              }
            }catch (error){
              setTimeout(function() {
                current.props.history.push(routes.LOGIN);
              }, 300);
            }
          }else{
            setTimeout(function() {
              current.props.history.push(routes.LOGIN);
            }, 300);
          }
        }, 500);
      } else {
        throw new Error("Exception!!");
      }
    } catch (error) {
      this.setState({
        modalHeader: "오류",
        modalBody: "서버에 연결 할 수 없습니다.",
        isModalOpen: true
      });
    }
  }

  handleModalClose() {
    this.setState({
      isModalOpen: false
    });
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.loading}>
          <div class="row">
            <div class="col s12">
              <div class="preloader-wrapper active">
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
            <div class="col s12">
              <Animated
                animationIn="fadeInUp"
                animationOut="fadeOut"
                isVisible={this.state.animation}
              >
                <p>{this.state.loadingText}</p>
              </Animated>
            </div>
            <Modal
              header={this.state.modalHeader}
              open={this.state.isModalOpen}
              actions={[
                <Button waves="green" modal="close" flat>
                  오프라인모드로 계속합니다
                </Button>,
                <Button waves="green" modal="close" flat>
                  종료
                </Button>
              ]}
              options={{
                dismissible: false,
                onCloseEnd: () => this.handleModalClose()
              }}
            >
              {this.state.modalBody}
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Loading);
