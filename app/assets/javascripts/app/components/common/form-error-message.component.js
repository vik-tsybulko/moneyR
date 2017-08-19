import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class FormErrorMessage extends Component {

  render() {
    let { errors } = this.props;
    if(!errors){
      errors = [];
    }

    return(
      <div className={`form-error-message ${ errors.length > 0 ? 'active' : ''}`}>
        <span className="form-error-message-text">{ errors.join('. ')}</span>
      </div>
    )
  }
}

FormErrorMessage.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};
