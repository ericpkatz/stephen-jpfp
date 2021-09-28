import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ location, studentCount, campusCount })=> {
  const view = location.pathname.slice(1);
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
            Students ({ studentCount })
          </div>
        </Link>        
        <Link to={`/campuses`} className={ view === 'campuses' ? 'selected navTab alt navLink' : "navTab alt navLink" }>
          <div className='cell'>
            Campuses ({ campusCount })
          </div>      
        </Link>              
      </div>
    </div>
  );
};


export default connect(state => {
  return {
    campusCount: state.campuses.length,
    studentCount: state.students.length
  };
})(Nav);
