// @flow
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import routes from "../constants/routes";
import styles from "./Board.css";
import { SideNav, SideNavItem, Button, Modal } from "react-materialize";

import LectureTable from "./models/LectureTable";

type Props = {};

class Board extends Component<Props> {
  props: Props;
  state = {
    background: "https://placeimg.com/640/480/tech",
    image: "",
    name: "",
    department: ""
  };

  componentDidMount() {
    if (sessionStorage.account) {
      let account = JSON.parse(sessionStorage.account);
      this.setState({
        image: account.profile_image,
        name: account.name,
        email: account.department
      });
    } else {
      this.setState({
        image: "",
        name: "",
        email: ""
      });
    }
  }

  render() {

    const isLoggedIn = sessionStorage.account;
    var myInformation = <SideNavItem waves href="#">내 정보</SideNavItem>;
    var loginButton;
    if(isLoggedIn)
      loginButton = <Link to={routes.LOGOUT}><SideNavItem waves>로그아웃</SideNavItem></Link>;
    else
      loginButton = <Link to={routes.LOGIN}><SideNavItem waves>로그인</SideNavItem></Link>;

    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.sideNavButton}>
          <SideNav
            trigger={
              <Button floating large className="red" waves="light">
                <i class="fa fa-arrow-right fa-3x" />
              </Button>
            }
            options={{ closeOnClick: true }}
          >
            <SideNavItem userView subheader user={this.state} />
            <SideNavItem waves href="#">
              보관된 시간표 목록
            </SideNavItem>
            <SideNavItem divider />
            <SideNavItem waves href="#">
              시간표 파일 내보내기
            </SideNavItem>
            <SideNavItem waves href="#">
              시간표 파일 불러오기
            </SideNavItem>
            <SideNavItem divider />
            {!isLoggedIn || myInformation}
            {loginButton}
          </SideNav>
        </div>
        <div className={`row ${styles.spaceArea}`}>
          <LectureTable />
        </div>
      </div>
    );
  }
}

export default withRouter(Board);

//<Link to={routes.COUNTER}>to Counter</Link>
