import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Clearfix } from 'react-bootstrap';
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
import SortingTh from '../../common/sorting_th';
import Filters from '../../common/filters_component';
import { paperStyle } from '../../common/styles';
import { all, destroy } from '../../../services/admin';

class Admins extends Component {
  state = {
    filters: {
      page: 1,
      per_page: 10
    },
    admins: [],
    count: 0,
    showConfirm: false
  };

  componentWillMount() {
    this._retrieveAdmins();
  }

  _retrieveAdmins = () => {
    const { filters } = this.state;
    all(filters).success(res => {
      this.setState({
        admins: res.admins,
        count: res.count
      })
    })
  };

  handlePageChange = (page) => {
    this.setState({filters: {...this.state.filters, page}}, this._retrieveAdmins);
  };

  handleShowSizeChange = (_,per_page) => {
    this.setState({filters: {...this.state.filters, page: 1, per_page}}, this._retrieveAdmins);
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
    }, this._retrieveAdmins)
  };

  closeConfirm = () => {
    this.setState({ showConfirm: false })
  };

  handleDelete = () => {
    const { selectedRecord } = this.state;
    destroy(selectedRecord.id).success(res => {
      this._retrieveAdmins();
      this.closeConfirm();
    });
  };

  render() {
    const { isLoading } = this.props.app.main;
    const { admins, showConfirm, count } = this.state;
    const { page, per_page } = this.state.filters;
    const { palette } = this.context.muiTheme;

    return (
        <Paper style={paperStyle} zDepth={1}>
          <h2>Admins</h2>
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
              <RaisedButton href='#/admin/new' className='pull-right'
                            primary={true} label='New Admins'
              />
            </Col>
          </Row>
          <Filters columns={[
            { label: 'Email',   key: 'email',   type: 'string' },
          ]} update={this.updateFilters} />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='email'>Email</SortingTh></TableHeaderColumn>
                <TableHeaderColumn><SortingTh update={this.updateFilters} column='created_at'>Created At</SortingTh></TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>

              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                admins.map(item => {
                  return (
                      <TableRow key={item.id}>
                        <TableRowColumn>{ item.email  }</TableRowColumn>
                        <TableRowColumn>{ item.created_at  }</TableRowColumn>
                        <TableRowColumn className='text-right'>
                          <IconButton onTouchTap={() => location.hash = `#/admin/${item.id}/edit`}><ImageEdit color={palette.accent1Color} /></IconButton>
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
            You are going to remove admins.
          </Dialog>
          <Clearfix/>
        </Paper>
    )
  }
}

Admins.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default connect(state => state)(Admins)