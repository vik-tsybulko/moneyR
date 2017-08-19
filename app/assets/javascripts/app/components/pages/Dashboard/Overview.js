import React, { Component } from 'react';
import { Paper, Chip } from 'material-ui';
import { paperStyle } from '../../common/styles';

class Blank extends Component {
  state = {
    chipData: [
      'Ruby on Rails',
      'Bootstrap',
      'Material UI',
      'ReactJS',
      'Redux',
      'React Router',
      'Browserify',
      'Babelify'
    ],
    style: {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    }
  };

  render() {
    const { chipData, style } = this.state;
    return (
      <Paper style={paperStyle} zDepth={1}>
        <h2>Overview <small>following technologies was used to create this app:</small></h2>
        <div style={style.wrapper}>
          {
            chipData.map(item => <Chip key={item} style={style.chip}>{item}</Chip>)
          }
        </div>
      </Paper>


    );
  }

}

export default Blank;
