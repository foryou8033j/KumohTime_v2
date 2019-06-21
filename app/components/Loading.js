// @flow
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Loading.css';
import M from 'materialize-css';
import { Modal, Button } from 'react-materialize';

type Props = {};
const trigger = <Button>Modal Test</Button>;

class Loading extends Component<Props> {
  props: Props;
  state = {
    loadingText : "서버 연결 확인 중"
  };

  componentDidMount() {
    this.setState({loadingText : "서버 연결 확인 중"});

    this.setState({loadingText : "로그인 정보 확인 중"});

    this.props.history.push(routes.LOGIN);
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
              <p>{this.state.loadingText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Loading)