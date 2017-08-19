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
  Toggle,
  AutoComplete,
  TimePicker
} from 'material-ui';
import FroalaEditor from 'react-froala-wysiwyg'
import { paperStyle } from '../common/styles';
import ImageComponent from '../common/image_component';
import ImagesComponent from '../common/images_component';
import { FormErrorMessage } from '../common/form-error-message.component'
import { all, upsert } from '../../services/system_settings';

class SystemSettingForm extends Component {
    state = {
      system_setting: {
        activity_min_distance: 0,
      },
      validationErrors: {},
    };

  componentWillMount() {
    this._retrieveSystemSetting();
  }

  _retrieveSystemSetting = () => {
    all().success(res => {
      res.system_setting.activity_sync_from_date = new Date(res.system_setting.activity_sync_from_date);
      this.setState({
        system_setting: res.system_setting
      })
    })
  };

  _handleChange = (key,value) => {
    const { system_setting } = this.state;

    this.setState({
      system_setting: {
          ...system_setting,
        [key]: value
      },
      validationErrors: {
        ...this.state.validationErrors,
        [key]: null
      }
    }, () => {
      // after state update
    })
  };

  _handleSubmit = event => {
    event.preventDefault();
    const { system_setting } = this.state;
    upsert(system_setting)
      .success(res => {

      })
      .progress(value => {
        this.setState({ progress: value })
      })
      .error(res => {
          this.setState({
          validationErrors: res.validation_errors
        })
      })
  };


  render() {
    const { isLoading } = this.props.app.main;
    const { system_setting, progress, validationErrors } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <Row>
            <Col sm={6}>
              <h2>{ I18n.t('system_setting.header') }</h2>
            </Col>
          </Row>

          <br/>
          <form onSubmit={this._handleSubmit}>
            <FormGroup>
              <DatePicker
                floatingLabelText={ I18n.t('system_setting.fields.activity_sync_from_date') }
                container="inline"
                value={system_setting.activity_sync_from_date}
                onChange={(_,val) => this._handleChange('activity_sync_from_date', val)}
                errorText={ validationErrors.activity_sync_from_date }
                fullWidth={true}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                type='number'
                floatingLabelText={ I18n.t('system_setting.fields.activity_min_distance') }
                fullWidth={true}
                value={system_setting.activity_min_distance}
                onChange={(_,val) => this._handleChange('activity_min_distance', val)}
              />
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton
                type='submit'
                primary={true}
                className='pull-right'
                label={ I18n.t('actions.submit') }
                disabled={isLoading}
              />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(SystemSettingForm)
