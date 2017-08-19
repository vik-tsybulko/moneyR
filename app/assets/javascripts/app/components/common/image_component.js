import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import DropZone from 'react-dropzone';

export default class ImagesComponent extends Component {
  state = {
    file: { url: '' }
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value && value.id) {
      this.setState({
        file: value
      })
    }
  }

  updateParent() {
    const { update } = this.props;
    const { file } = this.state;
    update(file);
  }

  handleDrop = files => {
    this.setState({
      file: files[0]
    }, this.updateParent)
  };

  render() {
    const { file } = this.state;

    return(
      <div>
        <Col xs={6} md={3}>
          <DropZone onDrop={this.handleDrop} className='image-preview-dropzone'>
            <figure className='image-preview' style={{backgroundImage: `url(${file.preview || file.url})`, height:146, borderRadius:8}}>
            </figure>
          </DropZone>
        </Col>
      </div>
    )
  }
}
