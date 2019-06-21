// @flow
import React, { Component } from 'react';
import Board from '../components/Board';

type Props = {};

export default class BoardPage extends Component<Props> {
  props: Props;

  render() {
    return <Board />;
  }
}