import React, { Component } from 'react';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStudents: [],
      allCampuses: []
    }
  }
  render(){
    return(
      <div id="main-content"><h1>Music Stack University</h1></div>
    )
  }
}