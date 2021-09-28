import React, { Component } from 'react';
import { createStudent } from '../store/students';
import { createCampus } from '../store/campuses';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import CampusProfile from './CampusProfile';


class CampusForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: ''   
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    this.props.createCampus({ ...this.state });
  }

  render() {
    const { history, match } = this.props;
    const { name, address, imageUrl, description } = this.state;
    const { handleSubmit, onChange } = this;

    return(
      <div className="form">
        <h2>Create Campus Form</h2>
        <form id='campus-form' onSubmit={handleSubmit}>
          
          <label htmlFor='name'>Name:</label> &nbsp;
          <input name='name' value={name} onChange={ onChange } />
          <br />

          <label htmlFor='address'>Address:</label> &nbsp;
          <input name='address' value={address} onChange={ onChange } />
          <br />

          <label htmlFor='imageUrl'>Image URL:</label> &nbsp;
          <input name='imageUrl' value={imageUrl} onChange={ onChange } />
          <br />

          <label htmlFor='description'>Description:</label> &nbsp;
          <input name='description' value={description} onChange={ onChange } />
          <br />

          <button type='submit'>Submit</button>
          <br />
          <Link to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, { history }) => ({
  createCampus: (student) => dispatch(createCampus(student, history))
});


export default withRouter(connect(null, mapDispatchToProps)(CampusForm))