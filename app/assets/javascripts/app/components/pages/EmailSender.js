import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Clearfix
} from 'react-bootstrap';
import {
  Paper,
  RaisedButton,
  TextField,
  SelectField,
  MenuItem,
  CircularProgress,
  DatePicker,
  Toggle
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show, update } from '../../services/email_sender';

class EmailSenderForm extends Component {
  state = {
    email_sender: {
      address: '',
      port: '',
      domain: '',
      authentication: '',
      user_name: '',
      enable_starttls_auto: false
    }
  }

  componentWillMount() {
    this._retrieveEmailSender();
  }

  _retrieveEmailSender = () => {
    show().success(res => {
      this.setState({
        email_sender: res.email_sender
      })
    })
  };

  handleChange = (key,value) => {
    this.setState({
      email_sender: {
        ...this.state.email_sender,
        [key]: value
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email_sender } = this.state;
    update(email_sender)
      .success(res => {
        location.hash = '#/';
      })
      .progress(value => {
        this.setState({ progress: value })
      })
  };

  render() {
    const { isLoading } = this.props.app.main;
    const { email_sender, progress } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;EmailSender Form</h2>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Address:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField
                    hintText='smtp.gmail.com'
                    fullWidth={true}
                    value={email_sender.address}
                    onChange={(_,val) => this.handleChange('address', val)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Port:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField
                    hintText='587'
                    fullWidth={true}
                    value={email_sender.port}
                    onChange={(_,val) => this.handleChange('port', val)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Domain:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField
                    hintText='example.com'
                    fullWidth={true}
                    value={email_sender.domain}
                    onChange={(_,val) => this.handleChange('domain', val)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Authentication:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField
                    hintText='plain'
                    fullWidth={true}
                    value={email_sender.authentication}
                    onChange={(_,val) => this.handleChange('authentication', val)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    User name:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField hintText='User name' fullWidth={true}
                    value={email_sender.user_name}
                    onChange={(_,val) => this.handleChange('user_name', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Password:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField hintText='Password' type='password' fullWidth={true}
                    value={email_sender.password}
                    onChange={(_,val) => this.handleChange('password', val)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Enable Starttls Auto:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <Toggle
                    toggled={email_sender.enable_starttls_auto}
                    onToggle={() => this.handleChange('enable_starttls_auto', !email_sender.enable_starttls_auto)}
                  />
                </Col>
              </Row>
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton type='submit' primary={true} className='pull-right' label="Save EmailSender" disabled={isLoading} />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(EmailSenderForm)
