import React, { Component } from 'react';
import Textarea from './components/Textarea';
import List from './components/List';
import { readFile, readDir, appendFile, unlink } from './general';


export default class App extends Component {
  constructor() {
    super();

    this.loaded = false;
    this.state = {
      text: '',
      files: [],
      active: null
    }
  }

  componentWillMount() {
    this.loadList();
  }

  loadList(active = this.state.active) {
    readDir('/notes', (data) => {
      this.loaded = true;

      this.setState({
        files: data,
        active
      });
    });
  }

  createNote() {
    const name = 'A wonderful new note ' + (this.state.files.length + 1);
    const rawName = name.split(' ').join('-') + '.txt';

    appendFile(`/notes/${rawName}`, () => {
      this.loadList();
      this.loadNote(`${rawName}`);
    });
  }

  deleteNote(fileName) {
    if (!confirm('Are you sure you want to delete note?')) {
      return;
    }

    unlink(`/notes/${fileName}`, () => {
      this.loadList(null);
    });
  }

  loadNote(name) {
    if (name === null) {
      this.setState({
        text: '',
        active: null,
      });
      return;
    }

    readFile(`/notes/${name}`, (data) => {
      this.setState({
        text: data,
        active: name
      });
    });
  }

  render() {
    if (!this.loaded) return null;
    const isReadonly = !this.state.files.length;

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-small">
            <List
              files={this.state.files}
              loadNote={this.loadNote.bind(this)}
              createNote={this.createNote.bind(this)}
              deleteNote={this.deleteNote.bind(this)}
              active={this.state.active}
              loadList={this.loadList.bind(this)}
            />
          </div>
          <div className="col-big">
            <Textarea
              isReadonly={isReadonly}
              data={this.state.text}
              active={this.state.active}
            />
          </div>
        </div>
      </div>
    )
  }
}
