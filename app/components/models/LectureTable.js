import React, { Component } from "react";
import styles from "./LectureTable.css";
import { SideNav, SideNavItem, Button, Card, Modal } from "react-materialize";
import axios from "axios";
import storage from "electron-json-storage";
import { Animated } from "react-animated-css";

export default class LectureTable extends Component {
  state = {
    lecture: [],
    isLoadingModalOpen : true
  };



  componentWillMount(){

  }

  componentDidMount() {
    let current = this;
    setTimeout(function(){
      current.loadLectureList();
    }, 300);
  }

   loadLectureList() {

    let { lecture } = this.state;
    let current = this;

    try {
      storage.get("lecture", function(error, data) {
        if (error) throw error;

        data.forEach(item => {
          lecture.push(item);
        });
        current.setState({ lecture });
        current.setState({ isLoadingModalOpen : false });
        //console.log(current.state.lecture);
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleClickLecture(item) {
    console.log(item);
  }

  render() {
    let current = this;
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div class="row">
          <div class="col s8">
            <Card>
              <table
                className={`black-text responsive-table ${styles.lectureTable}`}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>년도</th>
                    <th>학기</th>
                    <th>교과목명</th>
                    <th>담당교수</th>
                    <th>교육과정명</th>
                    <th>종류</th>
                    <th>구분</th>
                    <th>교과목코드</th>
                    <th>강의시간/강의실</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lecture.map(item => (
                    <Row item={item} current={current} />
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
          <div class="col s4">
            <Card>
              <div class="center">
                <h5 className={`pink-text ${styles.timeTableHeader}`}>
                  시간표
                </h5>
              </div>
              <div className={styles.tab}>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr className={styles.days}>
                      <th>#</th>
                      <th>월</th>
                      <th>화</th>
                      <th>수</th>
                      <th>목</th>
                      <th>금</th>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        1<br />
                        09:00~09:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        2<br />
                        10:00~10:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        3<br />
                        11:00~11:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        4<br />
                        12:00~12:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        5<br />
                        13:00~13:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        6<br />
                        14:00~14:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        7<br />
                        15:00~15:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        8<br />
                        16:00~16:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className={styles.time}>
                        9<br />
                        17:00~17:50
                      </td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <Modal
            header=""
            open={this.state.isLoadingModalOpen}
            bottomSheet
            actions={<div className="row" />}
            options={{
              dismissible: true
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
                <p class="black-text">강의정보를 불러오는 중</p>
              </div>
            </div>
          </Modal>
        </div>
      </Animated>
    );
  }
}

const Row = ({item, current}) => (
  <tr className={``} onClick={()=>current.handleClickLecture(item)}>
    <td>{item.TimeTable_id}</td>
    <td>{item.년도}</td>
    <td>{item.학기}</td>
    <td>{item.교과목명}</td>
    <td>{item.담당교수}</td>
    <td>
      {item.교육과정명}
      <br />
      {item.수강학과}
    </td>
    <td>{item.교과목_종류}</td>
    <td>{item.이수_구분}</td>
    <td>{item.개설교과목코드}</td>
    <td>{item.강의시간강의실}</td>
  </tr>
);
