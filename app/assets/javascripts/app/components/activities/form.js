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
import { show, upsert } from '../../services/activities';
import { all as getAllUsers }  from '../../services/athlet';

class ActivityForm extends Component {
    state = {
      activity: {
        name: '',
        distance: 0,
        moving_time: 0,
        elapsed_time: 0,
        total_elevation_gain: 0,
        elev_high: 0,
        elev_low: 0,
        type: '',
        start_latitude: 0,
        start_longitude: 0,
        end_latitude: 0,
        end_longitude: 0,
      },
      validationErrors: {},
      users: [],
    };

  componentWillMount() {
    this._retrieveActivity();
    this._retrieveUserSearch();
  }

  _retrieveActivity = () => {
    const { id } = this.props.params;
    if (!id) { return false }
    show(id).success(res => {
      res.activity.start_date = new Date(res.activity.start_date);
      res.activity.created_at = new Date(res.activity.created_at);
      res.activity.updated_at = new Date(res.activity.updated_at);
      this.setState({
        activity: res.activity
      })
    })
  };

  _handleChange = (key,value) => {
    const { activity } = this.state;

    this.setState({
      activity: {
          ...activity,
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
    const { activity } = this.state;
    upsert(activity)
      .success(res => {
        location.hash = '#/activities';
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

  updatePhotos = files => {
    this.setState({
    activity: {
      ...this.state.activity,
        photos: files
      }
    })
  };
  _retrieveUserSearch = (value = '') => {
    if (this._UserSearchTimeout) {
      clearTimeout(this._UserSearchTimeout);
      this._UserSearchTimeout = null;
    }
    this._UserSearchTimeout = setTimeout( () => {
      getAllUsers({page: 1, per_page: 10, title: value}).success(res => {
        this.setState({
          users: res.users        })
      })
    }, 500);
  }

  render() {
    const { isLoading } = this.props.app.main;
    const { activity, progress, validationErrors } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Activity Form</h2>
          <br/>
          <form onSubmit={this._handleSubmit}>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Name:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField
                    hintText='Name'
                    fullWidth={true}
                    value={activity.name}
                    onChange={(_,val) => this._handleChange('name', val)}
                    errorText={ validationErrors.name }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Description:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      hintText='Description'
                      fullWidth={true}
                      multiLine={true}
                      value={activity.description}
                      onChange={(_,val) => this._handleChange('description', val)}
                      errorText={ validationErrors.description }
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Distance:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Distance'
                      fullWidth={true}
                      value={activity.distance}
                      onChange={(_,val) => this._handleChange('distance', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Moving time:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Moving time'
                      fullWidth={true}
                      value={activity.moving_time}
                      onChange={(_,val) => this._handleChange('moving_time', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Elapsed time:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Elapsed time'
                      fullWidth={true}
                      value={activity.elapsed_time}
                      onChange={(_,val) => this._handleChange('elapsed_time', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Total elevation gain:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Total elevation gain'
                      fullWidth={true}
                      value={activity.total_elevation_gain}
                      onChange={(_,val) => this._handleChange('total_elevation_gain', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Elev high:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Elev high'
                      fullWidth={true}
                      value={activity.elev_high}
                      onChange={(_,val) => this._handleChange('elev_high', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Elev low:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Elev low'
                      fullWidth={true}
                      value={activity.elev_low}
                      onChange={(_,val) => this._handleChange('elev_low', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Type:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <TextField
                    hintText='Type'
                    fullWidth={true}
                    value={activity.type}
                    onChange={(_,val) => this._handleChange('type', val)}
                    errorText={ validationErrors.type }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Start date:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <DatePicker
                    hintText='Start date'
                    container="inline"
                    value={activity.start_date}
                    onChange={(_,val) => this._handleChange('start_date', val)}
                    errorText={ validationErrors.start_date }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Start latitude:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Start latitude'
                      fullWidth={true}
                      value={activity.start_latitude}
                      onChange={(_,val) => this._handleChange('start_latitude', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Start longitude:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='Start longitude'
                      fullWidth={true}
                      value={activity.start_longitude}
                      onChange={(_,val) => this._handleChange('start_longitude', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    End latitude:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='End latitude'
                      fullWidth={true}
                      value={activity.end_latitude}
                      onChange={(_,val) => this._handleChange('end_latitude', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    End longitude:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                    <TextField
                      type='number'
                      hintText='End longitude'
                      fullWidth={true}
                      value={activity.end_longitude}
                      onChange={(_,val) => this._handleChange('end_longitude', val)}
                    />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    Photos:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <ImagesComponent value={activity.photos} update={this.updatePhotos} />
                  <Clearfix/>
                  <FormErrorMessage errors={ validationErrors.photos  } />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col sm={2}>
                  <ControlLabel>
                    User:
                  </ControlLabel>
                </Col>
                <Col sm={10}>
                  <AutoComplete
                    searchText={activity.user}
                    errorText={ (validationErrors.user || []).join('. ') }
                    floatingLabelText="User"
                    dataSource={this.state.users}
                    onUpdateInput={this._handleUserSearch}
                    fullWidth={true}
                    dataSourceConfig={{text: 'title', value: 'id'}}
                    filter={AutoComplete.caseInsensitiveFilter}
                    openOnFocus={true}
                    onNewRequest={(val) => this._handleChange('user_id', val.id) }
                  />
                </Col>
              </Row>
            </FormGroup>
            <Col sm={4} smOffset={8} className="text-right">
              <br/>
              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
              <RaisedButton type='submit' primary={true} className='pull-right' label="Save Activity" disabled={isLoading} />
            </Col>
            <Clearfix />
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(ActivityForm)
