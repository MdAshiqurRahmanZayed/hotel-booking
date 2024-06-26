import React, { Component } from "react";
import { Formik } from "formik";

import { connect } from "react-redux";
import { auth } from "../../redux/authActionCreators";
import Spinner from "../Loading/Loading";
import { Alert } from "reactstrap";


const mapStateToProps = (state)=>{
return {
  authLoading: state.authLoading,
  authFailedMsg: state.authFailedMsg,
};
}


const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode)),
  };
};
class Auth extends Component {
  state = {
    mode: "Sign Up",
    showPassword: true,
  };

  switchModeHandler = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
    });
  };

  handleShowPassword = ()=>{
    this.setState({
      showPassword:!this.state.showPassword
    })
  }
  render() {
    let error =  null;
    if (this.props.authFailedMsg !== null) {
      error = <Alert color="danger">{this.props.authFailedMsg}</Alert>;
    }
    // console.log(typeof(this.props.authFailedMsg));
    let form = null;
    if (this.props.authLoading) {
      form = (
        <Spinner/>
      )
    }
    else{
      form = (
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode);
            // console.log(values);
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 4) {
              errors.password = "Must be atleast 4 characters!";
            }

            if (this.state.mode === "Sign Up") {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required";
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Password field does no match!";
              }
            }
            //console.log("Errors:", errors)
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px grey solid",
                padding: "15px",
                borderRadius: "7px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#537188",
                  color: "white",
                }}
                className="btn btn-lg"
                onClick={this.switchModeHandler}
              >
                Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
              </button>
              <br />
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  name="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.email}</span>
                <br />
                <input
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={values.password}
                  type={this.state.showPassword ? "password" : "text"}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{errors.password}</span>
                <br />

                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                      className="form-control"
                      type={this.state.showPassword ? "password" : "text"}
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>
                      {errors.passwordConfirm}
                    </span>
                    <br />
                  </div>
                ) : null}
                <div className="m-1">
                  <input type="checkbox" name="" className="form-check-input" id="" onClick={()=>this.handleShowPassword()} value={this.state.showPassword} /> Show password
                </div>
                <button type="submit" className="btn btn-success">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      );
    }
    return (
      <div className="container my-5 px-5">
        {error}
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
