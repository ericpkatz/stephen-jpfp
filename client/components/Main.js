import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Main extends Component {
  constructor(){
    super();
    this.state = {
      selected: ""
    }
  }
  render(){
    const { selected } = this.state;
    const { location } = this.props;    
    const view = location.pathname.slice(1);
    console.log(view)
    return (
      <div id="nav-wrapper">
        <div id="navBar">                        
          <Link to='/' className={ view === "" ? 'main main-selected navLink' : 'main navLink' } >            
            <div id="navHomeLink">
              <div className="navHeader">
                <h1> <i className="fas fa-graduation-cap"></i></h1>
                <div className={ view === "" ? 'h-selected cell-flex' : 'cell-flex' }>
                  <h1>M S U</h1>
                  <h2>Enrollment Dashboard</h2>
                </div>
              </div>
            </div>                
          </Link>
          <Link to={`/students`} className={ view === 'students' ? 'selected navTab alt navLink' : "navTab alt navLink" }>
            <div className='cell'>
              Students
            </div>
          </Link>        
          <Link to={`/campuses`} className={ view === 'campuses' ? 'selected navTab alt navLink' : "navTab alt navLink" }>
            <div className='cell'>
              Campuses
            </div>      
          </Link>              
        </div>
      </div>
    );
  }
};


export default withRouter(connect()(Main));