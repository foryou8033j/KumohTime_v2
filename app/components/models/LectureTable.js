import React, { Component } from "react";
import styles from "./LectureTable.css";
import { SideNav, SideNavItem, Button, Card } from "react-materialize";
import axios from "axios";

export default class LectureTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.loadLectureList();
  }

  async loadLectureList() {
    let { data } = this.state;

    try {
      const response = await axios.get(
        "https://kumoh42.com/app/data/service/kumohtime/getLectureList.php"
      );
      if (response.status === 200) {
        response.data.forEach(item => {
          data.push(item);
          console.log(item);
        });
      } else {
        throw new Exception("FAIL TO LOAD LECTURE LIST");
      }
    } catch (error) {
      console.log(error);
    }

    this.setState({ data });
  }

  render() {
    return (
      <Card>
        <table className={`black-text striped highlight centered ${styles.lectureTable}`}>
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
            {this.state.data.map(item => (
              <Row item={item} />
            ))}
          </tbody>
        </table>
      </Card>
    );
  }
}

const Row = ({ item }) => (
  <tr className={``}>
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
