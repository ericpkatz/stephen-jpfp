import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CampusForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      address: '100 Mass Ave',
      imageUrl: '',
      description: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){    
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
    try {
      await this.props.save(campus);
    }
    catch(ex){
      this.setState({ error: ex.response.data } );
    }
  }

  render() {
    const { error, name, address, imageUrl, description } = this.state;
    const { handleSubmit, onChange } = this;

    return(
      <div className="form container">
        <div id="formHeader">
          <h2>
            <i className="fas fa-university"></i>&nbsp;Create Campus Form
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
