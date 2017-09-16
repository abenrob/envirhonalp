import React, {PureComponent} from 'react';

const ICON = `M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: '#FFF',
  strokeWidth: '2px',
};

export default class ProjectPin extends PureComponent {

  render() {
    const { size, onClick } = this.props;

    return (
      <svg height={ size } viewBox={`0 0 ${ size + 5 } ${ size + 5 }`}
        style={{ ...pinStyle, transform: `translate(${-(size) / 2}px,${-(size )/ 2}px)` }}
        onClick={ onClick } >
        <circle cx={`${(size + 5) / 2}`} cy={`${(size + 5) / 2}`} r={`${size / 2}`} />
      </svg>
    );
  }
}
