import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { RaisedButton, TextField } from 'material-ui';
import { connect } from 'react-redux';
import * as SessionsService from '../../services/sessions';

class LoginPage extends Component {
  state = {};

  handleChange(key,value) {
    this.setState({ [key]: value })
  }

  handleLogin = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    SessionsService.login({email, password})
      .success(res => {
        location.href = '#/';
      })
  }

  render(){
    const { isLoading } = this.props.app.main;

    return(
      <div className="login-page">
        <div>
          <img src="/images/keys.png" className="login-image" />
          <h1>Urhqbackend</h1>
          <form onSubmit={this.handleLogin} className="login-form">
            <TextField hintText="Email address" fullWidth={true}
                       onChange={(_,val) => this.handleChange('email', val)} />
            <TextField hintText="Password" fullWidth={true} type="password"
                       onChange={(_,val) => this.handleChange('password', val)} />
            <br/><br/>
            <RaisedButton type="submit" label="login" primary={true} fullWidth={true} disabled={isLoading} />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(LoginPage)
