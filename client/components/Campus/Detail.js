import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CampusForm from './Form';
import { destroyCampus, updateStudent, updateCampus } from '../../store/'

const CampusProfile = ({ enrolledStudents, campus, destroy, updateStudent, save })=> {
  const { name, imageUrl, address, description } = campus;
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
        

        <CampusForm campus={ campus } save={ save }/>

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
                    <div className="delete" onClick={ () => updateStudent(student.id, student.firstName, student.lastName, student.email, student.gpa, student.imageUrl) }>
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

const mapStateToProps = ({ campuses, students }, { match })=> {
  const id = match.params.id * 1;
  const campus = campuses.find( campus => campus.id === id); 
  const enrolledStudents = students.filter(student => student.campusId === id);
  return {
    campus,
    enrolledStudents
  }
};

const mapDispatchToProps = (dispatch, otherProps)=>{
  return {
    save: (campus)=> {
      return dispatch(updateCampus({...campus, id: otherProps.match.params.id}));
    },
    destroy: ()=>{
      return dispatch(destroyCampus(otherProps.match.params.id, otherProps.history));
    },
    updateStudent: (id, firstName, lastName, email, gpa, imageUrl)=>{
      return dispatch(updateStudent(
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

export default connect(mapStateToProps, mapDispatchToProps)(CampusProfile);
