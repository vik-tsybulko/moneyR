import React, { Component } from 'react';
import {
  TextField,
  RaisedButton,
  Card,
  CardHeader,
  CardActions,
  CardText,
  DatePicker
} from 'material-ui';
import { Row, Col } from 'react-bootstrap';

export default class Filters extends Component {
  state = {};

  updateParent() {
    const { update } = this.props;
    const state = Object.keys(this.state).map(key => {
      return {[key]:this.state[key]}
    });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      update(state);
    }, 500)
  }

  updateState = (key,value) => {
    this.setState({ [key]:value }, this.updateParent)
  };

  clearState = () => {
    let hash = {};
    Object.keys(this.state).forEach(key => hash[key] = '');
    this.setState(hash, this.updateParent)
  };

  renderFilterUnit = (column) => {
    switch (column.type) {
      case 'datetime':
        return <DatePicker hintText={column.label} container="inline"
                           value={this.state[column.key]}
                           onChange={(_,val) => this.updateState(column.key, val)} />;
      default:
        return <TextField hintText={column.label} value={this.state[column.key]}
                          name={column.key} onChange={(_,val) => this.updateState(column.key,val)} />
    }
  };

  render() {
    const { columns } = this.props;

    return(
      <Card style={{marginBottom: 10}}>
        <CardHeader
          title="Filters"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <RaisedButton label="Reset" secondary={true} onTouchTap={this.clearState} />
        </CardActions>
        <CardText expandable={true}>
          <Row>
            {
              Object.keys(columns).map((item,i) => {
                return (<Col md={3} key={i}>
                    { this.renderFilterUnit(columns[i]) }
                  </Col>
                )
              })
            }
          </Row>
        </CardText>
      </Card>
    )
  }
}
