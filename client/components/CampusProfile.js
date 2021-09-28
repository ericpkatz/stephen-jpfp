import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { destroyCampus } from '../store';
import EditCampusForm from './EditCampusForm';
import { updateStudent } from '../store/'

class CampusProfile extends Component{
  constructor(){
    super();
    this.state = {
      id: "",
      name: "",
      imageUrl: "",
      address: "",
      description: "",
      enrolledStudents: []
    };
  }
  async componentDidMount(){
    const campusProfile = (await axios.get(`/api/campuses/${this.props.match.params.id}`)).data;
    const students = (await axios.get(`/api/students`)).data;
    const enrolledStudents = students.filter( student => student.campusId*1 === campusProfile.id);
    this.setState({
      id: campusProfile.id,
      name: campusProfile.name,
      imageUrl: campusProfile.imageUrl,
      address: campusProfile.address,
      description: campusProfile.description,
      enrolledStudents: enrolledStudents
    });
  }
  render(){
    const { name, imageUrl, address, description, enrolledStudents } = this.state;
    const { destroy } = this.props;
    return (
      <div>  
        <div className="profileWrapper container">

          <div className="studentProfile">

            <div className="bio">
              <h1 className="profileType">{ name }</h1>
              <div className="imageContainer">
                <img src={ imageUrl } />
              </div>              
            </div>
            
            <div className="container alt specsOverview">
              
              <div className='topSpecs campus'>
                
                <div className="spec-campus">
                  <div className="spec-label campus">
                    Campus Name
                  </div>
                  <div className="spec-value campus">
                    { name }
                  </div>
                </div>
                
                <div className="spec-campus">
                  <div className="spec-label campus">
                    address
                  </div>
                  <div className="spec-value campus">
                    { address }
                  </div>
                </div>
              
              </div>
              <div className="bottomSpec campus">
                <div className="spec-last campus">
                  <div className="last-label campus">
                    Enrolled Students:
                  </div>
                  <div className="last-value campus">
                    { enrolledStudents.length }
                  </div>
                </div>
                <div className="spec-last campus">
                  <div className="last-label campus">
                    Description:
                  </div>
                  <div className="last-value campus">
                    { description }
                  </div>
                </div>
              </div>   
            
            </div> 
          
          </div>
          </div>
          

          <EditCampusForm />

          <div className="delete delete-Campus" onClick={ destroy }>
            <p>Delete Campus</p>
          </div>

          <div className="container">
            <h2><i className="fas fa-user-check"></i>&nbsp;Enrolled Students ({enrolledStudents.length})</h2>
          
            { enrolledStudents.map( student => {
              return (
                <div key={ student.id } className="row">
                  <h3 className="studentList">
                    {student.firstName} {student.lastName}
                    {/* - <span className="sub-h3">Attends {enrolledCampus.name} Campus</span> */}
                  </h3>
                  <span className="sub-h3"> Student ID: {student.id}</span><br />          
                  <div className="listContainer">
                    <div className="listContainerItem seeDetails">                    
                      <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}'s Profile &nbsp;<i className="fas fa-long-arrow-alt-right"></i></Link>                  
                    </div>
                    <div className="listContainerItem deleteItem">                    
                      <div className="delete" onClick={ () => this.props.updateStudent(student.id, student.firstName, student.lastName, student.email, student.gpa, student.imageUrl) }>
                      <i className="far fa-times-circle"></i>&nbsp; &nbsp; Withdraw (Un-Enroll) Student from Campus
                      </div>
                    </div>                  
                  </div>

                </div>
              );
            }) }        
          </div>


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, otherProps)=>{
  return {
    destroy: ()=>{
      dispatch(destroyCampus(otherProps.match.params.id, otherProps.history));
    },
    updateStudent: (id, firstName, lastName, email, gpa, imageUrl)=>{
      dispatch(updateStudent(
        {
          id,
          firstName,
          lastName,
          email,
          gpa,
          imageUrl,
          campusId: null
        },
        otherProps.history
      ));
    }
  }
}

export default connect(null, mapDispatchToProps)(CampusProfile);