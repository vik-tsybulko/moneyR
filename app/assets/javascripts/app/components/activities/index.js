import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Clearfix} from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  FlatButton,
  Dialog,
  IconButton,
  Paper,
  CircularProgress
} from 'material-ui';
import {
  ActionVisibility,
  ImageEdit,
  ActionDelete
} from 'material-ui/svg-icons';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import en_US from 'rc-pagination/lib/locale/en_US';
import SortingTh from '../common/sorting_th';
import Filters from '../common/filters_component';
import { paperStyle } from '../common/styles';
import { all, destroy } from '../../services/activities';

class Activities extends Component {
  state = {
    filters: {
      page: 1,
      per_page: 10
    },
    activities: [],
    count: 0,
    showConfirm: false
  };

  componentWillMount() {
    this._retrieveActivities();
  }

  _retrieveActivities = () => {
    const { filters } = this.state;
    all(filters).success(res => {
      this.setState({
        activities: res.activities,
        count: res.count
      })
    })
  };

  handlePageChange = (page) => {
    this.setState({filters: {...this.state.filters, page}}, this._retrieveActivities);
  };

  handleShowSizeChange = (_,per_page) => {
    this.setState({filters: {...this.state.filters, page: 1, per_page}}, this._retrieveActivities);
  };

  prepareToDestroy = record => {
    this.setState({
      selectedRecord: record,
      showConfirm: true
    })
  };

  updateFilters = (filters = []) => {
    let hash = {};
    filters.forEach(item => Object.keys(item).forEach(key => hash[key] = item[key]));
    this.setState({
      filters: {
        ...this.state.filters,
        ...hash,
        page: 1
      }
    }, this._retrieveActivities)
  };

  closeConfirm = () => {
    this.setState({ showConfirm: false })
  };

  handleDelete = () => {
    const { selectedRecord } = this.state;
    destroy(selectedRecord.id).success(res => {
      this._retrieveActivities();
      this.closeConfirm();
    });
  };

  render() {
    const { isLoading } = this.props.app.main;
    const { activities, showConfirm, count } = this.state;
    const { page, per_page } = this.state.filters;
    const { palette } = this.context.muiTheme;

    return (
      <Paper style={paperStyle} zDepth={1}>
        <h2>Activities</h2>
        <Row>
          <Col sm={8}>
            <Pagination
              selectComponentClass={Select}
              onChange={this.handlePageChange}
              showQuickJumper={true}
              showSizeChanger={true}
              pageSizeOptions={['10','20','50']}
              pageSize={per_page}
              onShowSizeChange={this.handleShowSizeChange}
              current={page}
              total={count}
              locale={en_US}
            />
          </Col>
          <Col sm={4} className="text-right" style={{minHeight:61}}>
            <CircularProgress className={isLoading ? 'loading-spinner' : 'hidden'} size={36} />
            <RaisedButton href='#/activity/new' className='pull-right'
                          primary={true} label='New Activity'
            />
          </Col>
        </Row>
        <Filters columns={[{ label: 'Name', key: 'name', type: 'string' },{ label: 'Description', key: 'description', type: 'text' },{ label: 'Distance', key: 'distance', type: 'float' },{ label: 'Moving time', key: 'moving_time', type: 'integer' },{ label: 'Elapsed time', key: 'elapsed_time', type: 'integer' },{ label: 'Total elevation gain', key: 'total_elevation_gain', type: 'float' },{ label: 'Elev high', key: 'elev_high', type: 'float' },{ label: 'Elev low', key: 'elev_low', type: 'float' },{ label: 'Type', key: 'type', type: 'string' },{ label: 'Start date', key: 'start_date', type: 'datetime' },{ label: 'Start latitude', key: 'start_latitude', type: 'float' },{ label: 'Start longitude', key: 'start_longitude', type: 'float' },{ label: 'End latitude', key: 'end_latitude', type: 'float' },{ label: 'End longitude', key: 'end_longitude', type: 'float' },]} update={this.updateFilters} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='name'>Name</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='description'>Description</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='distance'>Distance</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='moving_time'>Moving time</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='elapsed_time'>Elapsed time</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='total_elevation_gain'>Total elevation gain</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='elev_high'>Elev high</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='elev_low'>Elev low</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='type'>Type</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='start_date'>Start date</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='start_latitude'>Start latitude</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='start_longitude'>Start longitude</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='end_latitude'>End latitude</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='end_longitude'>End longitude</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='photos'>Photos</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='user'>User</SortingTh></TableHeaderColumn>
              <TableHeaderColumn><SortingTh update={this.updateFilters} column='created_at'>Created At</SortingTh></TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              activities.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableRowColumn>{ item.name  }</TableRowColumn>
                    <TableRowColumn>{ item.description  }</TableRowColumn>
                    <TableRowColumn>{ item.distance  }</TableRowColumn>
                    <TableRowColumn>{ item.moving_time  }</TableRowColumn>
                    <TableRowColumn>{ item.elapsed_time  }</TableRowColumn>
                    <TableRowColumn>{ item.total_elevation_gain  }</TableRowColumn>
                    <TableRowColumn>{ item.elev_high  }</TableRowColumn>
                    <TableRowColumn>{ item.elev_low  }</TableRowColumn>
                    <TableRowColumn>{ item.type  }</TableRowColumn>
                    <TableRowColumn>{ item.start_date  }</TableRowColumn>
                    <TableRowColumn>{ item.start_latitude  }</TableRowColumn>
                    <TableRowColumn>{ item.start_longitude  }</TableRowColumn>
                    <TableRowColumn>{ item.end_latitude  }</TableRowColumn>
                    <TableRowColumn>{ item.end_longitude  }</TableRowColumn>
                    <TableRowColumn>{ item.photos  }</TableRowColumn>
                    <TableRowColumn>{ item.user  }</TableRowColumn>
                    <TableRowColumn>{ item.created_at  }</TableRowColumn>
                    <TableRowColumn className='text-right'>

                      <IconButton onTouchTap={() => location.hash = `#/activity/${item.id}`}><ActionVisibility color={palette.primary1Color} /></IconButton>
                      <IconButton onTouchTap={() => location.hash = `#/activity/${item.id}/edit`}><ImageEdit color={palette.accent1Color} /></IconButton>
                      <IconButton onTouchTap={this.prepareToDestroy.bind(this,item)}><ActionDelete color="#c62828" /></IconButton>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Dialog
          title="Are you sure?"
          actions={[
            <FlatButton onTouchTap={this.closeConfirm} label='Cancel'/>,
            <FlatButton secondary={true} onTouchTap={this.handleDelete} label='Confirm' />
          ]}
          modal={false}
          open={showConfirm}
          onRequestClose={this.closeConfirm}
        >
          You are going to remove activity.
        </Dialog>
        <Clearfix/>
      </Paper>
    )
  }
}

Activities.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default connect(state => state)(Activities)
