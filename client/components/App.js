import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Students from './Students';
import Campuses from './Campus/List';
import StudentProfile from './StudentProfile';
import CampusProfile from './Campus/Detail';
import Nav from './Nav';
import StudentForm from './StudentForm';
import { connect } from 'react-redux';
import { fetchStudents } from '../store/students';
import { fetchCampuses } from '../store/campuses';

const Home = connect(state => state)(({ students, campuses})=> {
  const enrolledCount = students.filter( student => student.campusId).length;
  return (
      <div id="welcome" className="container">          
        <h1>
          <i className="fas fa-tachometer-alt"></i>
          <br />
          Welcome to Music Stack University's Enrollment Dashboard
        </h1>
          <p>
            {students.length} Students, ({ enrolledCount} Enrolled) across {campuses.length} Campuses.
          </p>
          <p className="sub-text">
            Project by Stephen Wong at FullStack Academy.<br /> 
            <a href="https://github.com/stephen-wong-tx/jpfp-template-a-flex" target="_blank">About</a>
          </p>
      </div>
  );
});

export class App extends Component {
  constructor(){
    super();
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.load();
    this.setState({ loading: false });
  }
  
  
  render(){    
    const { loading } = this.state;
    if (loading) return (
      <div className="load-wrapper">
        <h1>...LOADING MY STACK UNIVERSITY DASHBOARD</h1>
        <div className="loader"></div>
        </div>
      )      
    return(
      <div>
        
        <Router>
          <div id="main-content">
            <Route component={ Nav } />

            <Switch>              
              <Route path='/' exact component={ Home } />
              <Route exact path='/students' component={Students} />
              <Route path='/students/:id' component={StudentProfile} />
              <Route path='/students&filter=:filterId' component={Students} />
              <Route exact path='/form' component={StudentForm} />
              <Route exact path='/campuses' component={Campuses} />
              <Route path='/campuses/:id' component={CampusProfile} />
            </Switch>            
          </div>

        </Router>
      </div>
    )
  }
}

const mapState = ({ students, campuses }) => ({
  students,
  campuses
});

const mapDispatch = (dispatch) => ({
  load: () => {
    return Promise.all([
      dispatch(fetchCampuses()),
      dispatch(fetchStudents())
    ]);
  }
});

export default connect(mapState, mapDispatch)(App);
