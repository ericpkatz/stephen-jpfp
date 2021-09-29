import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CampusForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){    
    if(this.props.campus){
      const { name, address, imageUrl, description } = this.props.campus;
      this.setState({
        name,
        address,
        imageUrl,
        description
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

  async handleSubmit(event){
    event.preventDefault();    
    const campus = {...this.state }
    delete campus.error;
    try {
      await this.props.save(campus);
    }
    catch(ex){
      console.log(ex);
      this.setState({ error: ex.response.data } );
    }
  }

  render() {
    const { error, name, address, imageUrl, description } = this.state;
    const { handleSubmit, onChange } = this;
    const { campus } = this.props;

    return(
      <div className="form container">
        <div id="formHeader">
          <h2>
            <i className="fas fa-university"></i>&nbsp;{ campus ? 'Edit' : 'Create'} Campus Form
          </h2>
          { error }
        </div> 
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

export default CampusForm; 
