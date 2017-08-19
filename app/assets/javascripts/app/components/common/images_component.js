import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import DropZone from 'react-dropzone';
import http from '../../services/http';

export default class ImagesComponent extends Component {
  state = {
    files: []
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value instanceof Array) {
      this.setState({
        files: value
      })
    }
  }

  updateParent() {
    const { update } = this.props;
    const { files } = this.state;
    update(files);
  }

  handleDrop = files => {
    this.setState({
      files: [...this.state.files, ...files]
    }, this.updateParent)
  };

  handleRemove = file => {
    const { files } = this.state;
    let index = files.indexOf(file);
    if (file.id) {
      http.delete({url:`/attachments/${file.id}`})
    }
    this.setState({
      files: files.filter(item => item != file)
    }, this.updateParent)
  };

  render() {
    const { files } = this.state;

    return(
      <div>
        {
          files.map((file,i) => {
            return (
              <Col xs={6} md={3} key={i}>
                <figure className='image-preview' style={{backgroundImage: `url(${file.preview || file.url})`}}>
                  <span className="remove-image" onClick={ () => this.handleRemove(file) }>&times;</span>
                </figure>
              </Col>
            )
          })
        }
        <Col xs={6} md={3}>
          <DropZone onDrop={this.handleDrop} className='image-preview-dropzone' />
        </Col>
      </div>
    )
  }
}
