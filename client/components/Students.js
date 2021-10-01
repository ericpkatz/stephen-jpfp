import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import { destroyStudent, changeFilter } from '../store'


const Students = ({ students, campuses, destroy, filter, history })=> {
  const navigate = (ev)=> {
    if(ev.target.value){
      history.push(`/students/filter/${ev.target.value}`);
    }
    else {
      history.push('/students');
    }
  }
  return (
    <div>
      <StudentForm />
      <div id="allStudents" className="container">
        <div className="listControls">
          <h2 className="listHeader"><i className="fas fa-users"></i><br />Students ({ students.length })</h2>
          <div className="filter">
            <h3 className="filter">Filter by Campus</h3>
            <form>
              <select className="custom-select" value={ filter } onChange={ navigate  } >            
                <option value=''>All</option>
                {
                  campuses.map((campus) => {
                    
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    )
                  })
                }
                <option value={'notEnrolled'}>Not Enrolled</option>
              </select>
            </form>
          </div>
        </div>  
        <div>                        
          { students.map((student) => {
            const enrolledCampus = campuses.find( campus => campus.id*1 === student.campusId*1) || {name: "notEnrolled"};
            
            return (
              <div key={ student.id } className="row">          
                <h3 className="studentList">
                  {student.firstName} {student.lastName}                    
                </h3>
                <span className="sub-h3"> Student ID: {student.id}</span><br />
                <span className="sub-h3"> { enrolledCampus.name === 'notEnrolled' ? 'Not Enrolled' : `Attends ${enrolledCampus.name} Campus`}</span>
                <div className="listContainer">
                  <div className="listContainerItem seeDetails">                    
                    <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}'s Profile &nbsp;<i className="fas fa-long-arrow-alt-right"></i></Link>                  
                  </div>
                  <div className="listContainerItem deleteItem">                    
                    <div className="delete" onClick={ () => destroy(student.id) }>
                    <i className="far fa-times-circle"></i>&nbsp; &nbsp; Delete Student from Database 
                    </div>
                  </div>                  
                </div>

              </div>
            );
          }) }
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state, { match }) => {
  let students = state.students;
  const campuses = state.campuses || [];
  const filter = match.params.filter || '';
  if(filter === 'notEnrolled'){
    students = students.filter(student => !student.campusId);
  }
  else if(filter){
    students = students.filter(student => student.campusId === filter*1);
  }
  return {
    students,
    campuses,
    filter
  } 
};

const mapDispatch = (dispatch, otherProps) => {
  return {
    destroy: (id)=>{
      dispatch(destroyStudent(id, otherProps.history));
    }
  }
}


export default connect(mapStateToProps, mapDispatch)(Students);
