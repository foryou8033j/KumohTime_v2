import React, { Component } from "react";
import { SideNav, SideNavItem, Button, Card } from "react-materialize";
import axios from "axios";

export default class TimeTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    //this.loadLectureList();
  }

  async loadLectureList() {
    let { data } = this.state;

    try {
      const response = await axios.get("https://kumoh42.com/app/data/service/kumohtime/getLectureList.php");
      if (response.status === 200){
        response.data.forEach(item => {
          data.push(item);
          console.log(item);
        })
      }else{
        throw new Exception("FAIL TO LOAD LECTURE LIST");
      }
    } catch (error) {
      console.log(error);
    }


    this.setState({ data });
  }

  render() {
    return (
      <div style={{ maxWidth: "100%", maxHeight:"300px" }}>
        <Card>
          <table className={`black-text`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(item => (
                <Row item={item} />
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

const Row = ({ item }) => (
  <tr className={`hoverable`}>
    <td>{item.TimeTable_id}</td>
    <td>{item.년도}</td>
  </tr>
);
