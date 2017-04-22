import React, { Component } from 'react';
import { rename } from '../general';


export default class List extends Component {

  saveItemName(input, rawName) {
    const newName = input.value.split(' ').join('-') + '.txt';

    rename(`/notes/${rawName}`, `/notes/${newName}`, this.props.loadList);
    input.setAttribute('readonly', true);
    input.removeEventListener('blur', this.saveItemName.bind(this, input));
    // input.removeEventListener('keyup', (e) => {
    //   if (e.which === 13) {
    //     this.saveItemName(input, rawName);
    //   }
    // });
  }

  handleRename(input, rawName) {
    input.removeAttribute('readonly');
    input.focus();

    input.addEventListener('blur', this.saveItemName.bind(this, input, rawName));
    // input.addEventListener('keyup', (e) => {
    //   if (e.which === 13) {
    //     this.saveItemName(input, rawName);
    //   }
    // });
  }

  renderList() {
    return this.props.files.map((rawName, i) => {
      const name = rawName.replace('.txt', '').split('-').join(' ');
      let isActive = false;
      let inputRef;

      if (i === 0 && this.props.active === null) {
        isActive = true;
        this.props.loadNote(rawName);
      } else if (this.props.active === rawName) {
        isActive = true;
      }

      return (
        <li
          key={`key-${name}`}
          className={isActive ? 'active' : ''}
          onClick={() => { this.props.loadNote(rawName); }}
        >
          <input
            type="text"
            className="note"
            defaultValue={name}
            readOnly
            ref={(ref) => { inputRef = ref; }}
          />
          <button
            className="rename-note"
            onClick={(e) => {
              e.stopPropagation();
              this.handleRename(inputRef, rawName);
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.props.deleteNote(rawName)
            }}
            className="delete-note"
          />
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="notes">
        {this.renderList()}
        <button
          onClick={this.props.createNote}
          className="add-note"
        />
      </ul>
    );
  }
}
