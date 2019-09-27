import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Signup from "../../img/signup.png";


class Register extends Component {
  constructor() {
    super();
    this.state ={
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this); // Form bind:
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

onChange(e) { // e is an event parameter
  this.setState({[e.target.name]: e.target.value});
}

onSubmit(e) {
  e.preventDefault();
const newUser = {
  name: this.state.name,
  email: this.state.email,
  password: this.state.password,
  password2: this.state.password2,
  errors: {}
};
  this.props.registerUser(newUser, this.props.history);
}

  render() {
    const { errors } = this.state;

    return (
      <div className="registerLoginPage">
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <h1><img src={Signup}></img></h1>
              {/*<p className="lead text-center">Create Your Contact App Account</p>}
              {/* Binding this form above as well submit */}
              {/* noValidate onSubmit removes html5 validations to ensure my custom validations display instead */}
              <form noValidate onSubmit={this.onSubmit}> 
              <TextFieldGroup 
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup 
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  //info="This Site Uses Gravatar So If You Want A Profile Image, Use A Gravatar Email"
                />

                <TextFieldGroup 
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup 
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-warning btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
