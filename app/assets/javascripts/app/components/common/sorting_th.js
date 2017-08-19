import React, { Component } from 'react';

export default class SortingTh extends Component {
  state = {};

  updateParent() {
    const { update } = this.props;
    const { sort_column, sort_type } = this.state;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      update([{sort_column,sort_type}]);
    }, 500)
  }

  updateState = (sort_column,sort_type) => {
    this.setState({ sort_column, sort_type }, this.updateParent)
  };

  render() {
    const { sort_column, sort_type } = this.state;
    const { column } = this.props;
    return(
      <div className='th-sort'>
        <i className={ sort_column != column ? "fa fa-sort" : "hidden"}
           onClick={e => this.updateState(column,'asc')}></i>
        <i className={ sort_column == column && sort_type == 'asc' ? "fa fa-sort-asc" : "hidden" }
           onClick={e => this.updateState(column,'desc')}></i>
        <i className={ sort_column == column && sort_type == 'desc' ? "fa fa-sort-desc" : "hidden"}
           onClick={e => this.updateState(null,null)}></i>
        { this.props.children }
      </div>
    )
  }
}
