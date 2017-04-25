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
    const data = this.props.data;
    if (!data) return;

    const notes = [];

    for (let key in data) {
      const note = data[key];
      let isActive = false;
      let inputRef;

      if (this.props.active !== null && this.props.active.id === note.id) {
        isActive = true;
      }

      notes.push(
        <li
          key={`key-${note.id}`}
          className={isActive ? 'active' : ''}
          onClick={() => { this.props.loadNote(note.id); }}
        >
          <span className="date">
            {new Date(note.date).toLocaleDateString('en-GB').split('/').join('-')}
          </span>
          <input
            type="text"
            className="note"
            defaultValue={note.name}
            readOnly
            ref={(ref) => { inputRef = ref; }}
          />
          <button
            className="rename-note"
            onClick={(e) => {
              e.stopPropagation();
              this.handleRename(inputRef, note.id);
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.props.deleteNote(note.id)
            }}
            className="delete-note"
          />
        </li>
      )
    }

    return notes;
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
