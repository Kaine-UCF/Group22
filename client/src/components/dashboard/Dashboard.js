import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import PeopleDex from "../../img/openPeopleDex.png";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
          <h1>
            <br/> Welcome to the world of People! My name is Oak!
            People call me the People Prof!
            <br/>This world is inhabited by creatures called People! For some
            people, People are pets. Others use them for fights. Myself...
            I study people as a profession.
            <br/>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}! Your very own People legend is about to unfold! A world of
            dreams and adventures with People awaits! Let's go!
            </h1>
            <Link to="/add-contact" className="btn btn-lg btn-primary">
              <img src={PeopleDex} className="OpenPeopledex"></img>
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Hello there!</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
