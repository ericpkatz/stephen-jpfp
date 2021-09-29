import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusForm from './CampusForm';
import { createCampus } from '../store';

const Campuses = ({ campuses, save }) => {
  return (
    <div>
      <CampusForm save={ save }/>
      <div id="allCampuses" className="container">
        <h2><i className="fas fa-university i-tiny"></i><i className="fas fa-landmark"></i><i className="fas fa-university i-tiny"></i>&nbsp; All Campuses</h2>
          <div className="cardContainer">
            { campuses.map((campus) => {
              return (
                <div key={ campus.id } className="card">
                  <div className="cardBody">
                    <Link to={`/campuses/${campus.id}`}>
                      <div className="imageBackground"
                        style={
                          {
                            backgroundImage: `url(` + `${campus.imageUrl}` + `)`
                          }
                        }>
                        <div className="cardHeading">
                          <h2 className="heading">{campus.name}</h2>
                        </div>                      
                      </div>                                        
                    </Link>
                    <br />
                    <div className='cardControls'>
                      <p>{ campus.address }</p>
                      <div className="listContainerItem seeDetails campus">                                          
                        <Link to={`/campuses/${campus.id}`}>{campus.name} Details Here&nbsp;<i className="fas fa-long-arrow-alt-right"></i></Link>                  
                      </div>
                    </div>                  
                  </div>
                </div>
              )
            }) }
          </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    save: (campus)=> {
      return dispatch(createCampus(campus, history));
    }
  }

};
const mapStateToProps = ({ campuses }) => ({
  campuses
});

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
