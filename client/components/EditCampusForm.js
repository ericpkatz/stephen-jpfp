import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { updateCampus, createCampus } from '../store/campuses';


class EditCampusForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
      edit: false   
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount(){    
    if (this.props.campus.id){
      this.setState({
        name: this.props.campus.name,
        address: this.props.campus.address,
        imageUrl: this.props.campus.imageUrl,
        description: this.props.campus.description,
        edit: true
      });
    }
  }
  componentDidUpdate(prevProps){
    console.log('componentDidUpdate:', this.props);
    if (!prevProps.campus.id && this.props.campus.id) {
      this.setState({
        name: this.props.campus.name,
        address: this.props.campus.address,
        imageUrl: this.props.campus.imageUrl,
        description: this.props.campus.description,
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
      this.props.createCampus(this.state.name, this.state.address, this.state.imageUrl, this.state.description)
    } else {      
      this.props.update(this.state.name, this.state.address, this.state.imageUrl, this.state.description)
    }
  }

  render() {
    const { history, match } = this.props;
    const { name, address, imageUrl, description } = this.state;
    const { handleSubmit, onChange } = this;

    return(
      <div className="form container">
        {
          !this.props.campus.id ? <div id="formHeader"><h2><i className="fas fa-university"></i>&nbsp; Create Campus Form </h2></div> : <div id="formHeader"><h2><i className="fas fa-pencil-ruler"></i>&nbsp;Edit Campus Form</h2></div>
        }        
        <form id='campus-edit-form' onSubmit={handleSubmit}>
                    
          <input placeholder="Name" name='name' value={name} onChange={ onChange } />
          <br />          
          <input placeholder="Address" name='address' value={address} onChange={ onChange } />
          <br />        
          <input placeholder="Image URL" name='imageUrl' value={imageUrl} onChange={ onChange } />
          <br />          
          <input placeholder="Description" name='description' value={description} onChange={ onChange } />
          <br />
          <div className="buttonContainer">
            <button type='submit'>Submit</button>
          </div>
          <br />          
        </form>
      </div>
    );
  }
}


const mapState = (state, { match })=>{
  const id = match.params.id*1;
  const campus = state.campuses.find( campus => campus.id === id ) || {};
  return { campus };
};

const mapDispatchToProps = (dispatch, otherProps) => {
  return {
    update: (name, address, imageUrl, description) => {
      dispatch(updateCampus(
        {
          id: otherProps.match.params.id, 
          name,
          address,
          imageUrl,
          description
        }, 
        otherProps.history
      ));
    },
    createCampus: (name, address, imageUrl, description) => {
      dispatch(createCampus(
        {
          name,
          address,
          imageUrl,
          description
        }, 
        otherProps.history
      ));
    }
  };
};

export default withRouter(connect(mapState, mapDispatchToProps)(EditCampusForm))