// @flow
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import routes from "../constants/routes";
import styles from "./Board.css";
import { SideNav, SideNavItem, Button } from "react-materialize";

import LectureTable from "./models/LectureTable";
import TimeTable from "./models/TimeTable";

type Props = {};

class Board extends Component<Props> {
  props: Props;

  componentDidMount() {}

  render() {
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
            <SideNavItem
              userView
              user={{
                background: "https://placeimg.com/640/480/tech",
                image: "static/media/react-materialize-logo.824c6ea3.svg",
                name: "John Doe"
              }}
            />
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
            <SideNavItem waves href="#">
              내 정보
            </SideNavItem>
            <SideNavItem waves href="#">
              로그아웃
            </SideNavItem>
          </SideNav>
        </div>
        <div className={`row ${styles.spaceArea}`}>
          <div class="col s8">
            <LectureTable/>
          </div>
          <div class="col s4">
            <TimeTable/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Board);

//<Link to={routes.COUNTER}>to Counter</Link>
