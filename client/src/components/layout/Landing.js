import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Logo from "../../img/logo.png";

class Landing extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 text-center">
              <a><img src={Logo}></img></a>
                <p className="lead"> An App To Index People You Know!</p>
                <Link to="/register" className="btn btn-lg btn-warning mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-primary">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
