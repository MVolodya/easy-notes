import React, { Component } from 'react';


export default class List extends Component {
  constructor(props) {
    super(props);


  }

  renderList() {
    return this.props.files.map((rawName, i) => {
      const name = rawName.replace('.txt', '');
      let isActive = false;

      if (i === 0 && this.props.active === null) {
        isActive = true;
        this.props.loadActiveNote(rawName);
      } else if (this.props.active === rawName) {
        isActive = true;
      }

      return (
        <li
          key={`key-${name}`}
          className={isActive ? 'active' : ''}
          onClick={() => { this.props.loadActiveNote(rawName); }}
        >
          {name}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="notes">
        {this.renderList()}
      </ul>
    );
  }
}
