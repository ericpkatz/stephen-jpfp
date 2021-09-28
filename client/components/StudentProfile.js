import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import { destroyStudent } from '../store';

class StudentProfile extends Component{
  constructor(){
    super();
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      gpa: 0.0,
      imageUrl: "",
      campusId: 0,
      attendingCampus: {}
    };
  }
  async componentDidMount(){
    const studentProfile = (await axios.get(`/api/students/${this.props.match.params.id}`)).data;
    let attendingCampus = {name: "", imageUrl: "", id: null};
    if (studentProfile.campusId) {
      attendingCampus = (await axios.get(`/api/campuses/${studentProfile.campusId}`)).data;
    }
    this.setState({
      id: studentProfile.id,
      firstName: studentProfile.firstName,
      lastName: studentProfile.lastName,
      email: studentProfile.email,
      gpa: studentProfile.gpa,
      imageUrl: studentProfile.imageUrl,
      campusId: studentProfile.campusId,
      attendingCampus: attendingCampus
    });
  }
  render(){
    const { firstName, lastName, email, gpa, imageUrl, attendingCampus } = this.state;
    const { destroy } = this.props;
    return (
      <div>
        <div className="profileWrapper container">
          <div className="studentProfile">
            <div className="bio">
              <h1 className="profileType">{ firstName } { lastName }</h1>
              <div className="imageContainer">
                <img src={ imageUrl } />
              </div>
            </div>            
            <div className="container alt specsOverview">
              <div className='topSpecs'>
                <div className="spec">
                  <div className="spec-label">
                    Name
                  </div>
                  <div className="spec-value">
                    { firstName } { lastName }
                  </div>
                </div>
                <div className="spec">
                  <div className="spec-label">
                    Email:
                  </div>
                  <div className="spec-value">
                    <a href={ `mailto:` + email }>{ email }</a>
                  </div>
                </div>
                <div className="spec">
                  <div className="spec-label">
                    Cumulative GPA:
                  </div>
                  <div className="spec-value">
                    { gpa }
                  </div>
                </div>
              </div>
              <div className="bottomSpec">
                <div className="spec-last">
                  <div className="last-label">
                    Attending Campus:
                  </div>
                  <div className="last-value">
                    {
                      !attendingCampus.id? <h3>Not Enrolled</h3>
                        : <h3><Link to={`/campuses/${attendingCampus.id}`}> {attendingCampus.name} Campus </Link></h3>
                    }
                  </div>
                </div>
              </div> 
            </div>            
          </div> 
        </div>
        <StudentForm />
        <div className="delete delete-Student" onClick={ destroy }>
          <p>Delete Student from Database</p>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch, otherProps) => {
  return {
    destroy: ()=>{
      dispatch(destroyStudent(otherProps.match.params.id, otherProps.history));
    }
  }
}

export default connect(null, mapDispatch)(StudentProfile)