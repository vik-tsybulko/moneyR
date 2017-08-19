import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { FormGroup, ControlLabel, Row, Col, Clearfix } from 'react-bootstrap';
import {
  Paper
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show } from '../../services/activities';

class Activity extends Component {
  state = {
    activity: {
      photos: [],
    },
  };

  componentWillMount() {
    this._retrieveActivity();
  }

  _retrieveActivity = () => {
    const { id } = this.props.params;
    show(id).success(res => {
      this.setState({
        activity: res.activity
      })
    })
  };

  render() {
    const { activity } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>&nbsp;Activity</h2>
          <br/>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Name</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.name }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Description</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.description }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Distance</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.distance }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Moving time</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.moving_time }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Elapsed time</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.elapsed_time }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Total elevation gain</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.total_elevation_gain }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Elev high</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.elev_high }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Elev low</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.elev_low }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Type</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.type }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Start date</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.start_date }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Start latitude</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.start_latitude }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Start longitude</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.start_longitude }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>End latitude</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.end_latitude }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>End longitude</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.end_longitude }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Photos</ControlLabel>
              </Col>
              <Col sm={10}>
                {
                  activity.photos.map((item,i) => {
                    return (
                      <Col xs={6} md={3} key={i}>
                        <figure className='image-preview' style={{backgroundImage: `url(${item.url})`}}>
                        </figure>
                      </Col>
                    )
                  })
                }
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>User</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.user }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Created at</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.created_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={2}>
                <ControlLabel>Updated at</ControlLabel>
              </Col>
              <Col sm={10}>
                <span className="form-control-static">
                  { activity.updated_at }
                </span>
              </Col>
            </Row>
            <hr/>
          </FormGroup>
        </Paper>
    )
  }
}

export default connect(state => state)(Activity)
