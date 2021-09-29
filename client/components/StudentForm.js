import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import CampusProfile from './Campus/Detail';
import { updateStudent, createStudent } from '../store/students';

class StudentForm extends Component {
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: 0.00,
      imageUrl: "",
      campusId: "",
      edit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount(){
    if (this.props.student.id){
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
        gpa: this.props.student.gpa,
        imageUrl: this.props.student.imageUrl,
        campusId: this.props.student.campusId,
        edit: true
      });
    }
  }

  componentDidUpdate(prevProps){
    console.log('componentDidUpdate:', this.props);
    if (!prevProps.student.id && this.props.student.id) {
      this.setState({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        gpa: this.state.gpa,
        imageUrl: this.state.imageUrl,
        campusId: this.state.campusId,
        edit: true
      });
    } 
  }

  onChange(event){
    const name = event.target.name;
    const value = event.target.value;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  handleSubmit(event){
    event.preventDefault();
    if (!this.state.edit) {
      this.props.createStudent(this.state.firstName, this.state.lastName, this.state.email, this.state.gpa, this.state.imageUrl, this.state.campusId);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        gpa: 0,
        campusId: ''
      })
    } else {
      this.props.updateStudent(this.state.firstName, this.state.lastName, this.state.email, this.state.gpa, this.state.imageUrl, this.state.campusId);
    }
  }

  render() {
    const { history, match, campuses } = this.props;
    const { firstName, lastName, email, gpa, imageUrl, campusId } = this.state;
    const { handleSubmit, onChange } = this;

    return(
      <div className="form container">       
        {
          !this.props.student.id ? <div id="formHeader"><h2><i className="fas fa-user-plus"></i><br />Create Student Form</h2></div> : <div id="formHeader"><h2><i className="fas fa-user-edit"></i><br />Edit Student Form</h2></div>
        }
        
        <form id='student-form' onSubmit={handleSubmit}>
          
          <input placeholder="First Name" name='firstName' value={firstName} onChange={ onChange } />
          <br />
          <input placeholder="Last Name" name='lastName' value={lastName} onChange={ onChange } />
          <br />          
          <input placeholder="Email" name='email' value={email} onChange={ onChange } />
          <br />          
          <input placeholder="GPA" name='gpa' value={gpa} onChange={ onChange } />
          <br />          
          <input placeholder="Image URL" name='imageUrl' value={imageUrl} onChange={ onChange } />          
          <br />          
          <select className="custom-select" name='campusId' value={campusId || 'Empty'} onChange={ onChange } >
            <option placeholder="Enroll in Campus" value={'select'}>Enroll in Campus</option>
            {
              campuses.map((campus) => {
                
                return (
                  <option key={campus.id} value={campus.id}>{campus.name}</option>
                )
              })
            }
          </select>
          <br />&nbsp;
          <br />
          <div className="buttonContainer">
            <button type='submit'>Submit <i className="fas fa-plus" aria-hidden="true"></i></button>
          </div>
          <br />          
        </form>
      </div>
    );
  }
}


const mapState = (state, { match })=> {
  const id = match.params.id*1;
  const student = state.students.find( student => student.id === id ) || {};
  const campuses = state.campuses || [];
  return { student, campuses };
};

const mapDispatchToProps = (dispatch, otherProps) => {
  return {
    updateStudent: (firstName, lastName, email, gpa, imageUrl, campusId) => {
      dispatch(updateStudent(
        {
          id: otherProps.match.params.id,
          firstName,
          lastName,
          email,
          gpa,
          imageUrl,
          campusId
        },
        otherProps.history
      ));
    },
    createStudent: (firstName, lastName, email, gpa, imageUrl, campusId) => {
      dispatch(createStudent(
        {
          firstName,
          lastName,
          email,
          gpa,
          imageUrl,
          campusId
        },
        otherProps.history
      ));
    }
  };
};


export default withRouter(connect(mapState, mapDispatchToProps)(StudentForm))
