import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import { destroyStudent, changeFilter } from '../store'


class Students extends Component {
  constructor(){
    super();
    this.state = {
      filter: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount(){
    if (!this.props.match.params)this.props.history.push(`/students`);
    if (this.props.filterView.length > 1){
      this.setState({
        filterView: true
      });
    }
    if (this.props.match.params.filterId) {
      this.props.changeFilter(this.props.students, this.props.match.params.filterId)
      this.setState({
        filterView: true
      })
    } 
  }

  componentDidUpdate(prevProps){
    if (!prevProps.filterView[0] && !!this.props.filterView[0]) {
      this.setState({
        filterView: true
      });      
    }
    if (prevProps.filterView[0] && !this.props.filterView[0]) {
      this.setState({
        filterView: false
      })
    }
    if (!this.props.match.params.filterId && !!this.state.filterView) {
      this.setState({
        filterView: false
      })
    }
    if (!this.state.filterView && this.state.filter.length > 0){
      this.setState({
        filterView: true
      })
    }
  }

  onChange(event){
    const name = event.target.name;
    const value = event.target.value;
    const change = {};
    change[name] = value;
    this.setState(change);
    this.props.changeFilter(this.props.students, value * 1);
    
    !value ? this.props.history.push(`/students`) 
      : this.props.history.push(`/students&filter=${value}`)
  }

  render() {
    const { students, campuses, destroy, filterView } = this.props;
    const { filter } = this.state;
    const { onChange } = this;
    const findView = () => !this.state.filterView ? students : filterView.length > 1 ? filterView : students  
    return (
      <div>
        <StudentForm />
        <div id="allStudents" className="container">
          <div className="listControls">
            <h2 className="listHeader"><i className="fas fa-users"></i><br />All Students</h2>
            <div className="filter">
              <h3 className="filter">Filter by Campus</h3>
              <form>
                <select className="custom-select" name='filter' value={ filter || ''} onChange={ onChange } >            
                  <option placeholder="-- Select Campus" value={''}>&nbsp;</option>
                  {
                    campuses.map((campus) => {
                      
                      return (
                        <option key={campus.id} value={campus.id}>{campus.name}</option>
                      )
                    })
                  }
                  <option value={999}>Not Enrolled</option>
                </select>
                {!this.props.filterview && this.state.filter === '999' ? <p className="alert-text">No students have null enrollment</p> : null}
              </form>
            </div>
          </div>  
          <div>                        
            { findView().map((student) => {
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
}

const _Students = ({ students, campuses, destroy }) => {
  return (
    <div>
      <StudentForm />
      <div id="allStudents" className="container">
        <div className="listControls">
          <h2 className="listHeader"><i className="fas fa-users"></i><br />All Students</h2>
          <div className="filter">
            <h3 className="filter">Filter by Campus</h3>
            {/* <select className="custom-select" name='campusId' value={ campusId || null} onChange={ onChange } > */}
            <form>
            <select className="custom-select" name='campusId' value={ 1 || null} >
                <option placeholder="-- Select Campus" value={'select'}>&nbsp;</option>
                {
                  campuses.map((campus) => {
                    
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    )
                  })
                }
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
                <span className="sub-h3"> Attends {enrolledCampus.name} Campus</span>
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
};

const mapStateToProps = (state) => {
  const students = state.students;
  const campuses = state.campuses || [];
  const filterView = state.filterView || [];
  return {
    students,
    campuses,
    filterView
  } 
};

const mapDispatch = (dispatch, otherProps) => {
  return {
    destroy: (id)=>{
      dispatch(destroyStudent(id, otherProps.history));
    },
    changeFilter: (students, filterId)=>{
      dispatch(changeFilter(
        {
          students,
          filterId
        }
      ));
    }
  }
}


export default connect(mapStateToProps, mapDispatch)(Students);