import React, { Component } from 'react';
import Textarea from './components/Textarea';
import List from './components/List';
import Search from './components/Search';
import Speech from './components/Speech';
import Info from './components/Info';
import { readFile, readDir, appendFile, SHEMA } from './general';


export default class App extends Component {
  constructor() {
    super();

    const data = this.getData();

    this.state = {
      active: data ? data[Object.keys(data)[0]] : SHEMA,
      data
    }
  }

  loadList(active = this.state.active) {
    this.setState({
      data: this.getData(),
      active
    });
  }

  getData() {
    let data = {};

    if (!localStorage.length) return null;

    for (let key in localStorage) {
      data[key] = JSON.parse(localStorage[key]);
    }

    return data;
  }

  createNote() {
    const id = Date.now();
    const name = 'A wonderful new note';
    const date = new Date();

    localStorage[id] = JSON.stringify(Object.assign({}, SHEMA, {
      id,
      name,
      date
    }));

    this.loadList();
  }

  deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete note?')) {
      return;
    }

    delete localStorage[noteId];
    this.loadList();
    this.loadNote(null);
  }

  loadNote(noteId) {
    if (noteId === null) {
      this.setState({
        active: null,
      });
      return;
    }

    this.loadList();

    this.setState({
      active: this.state.data[noteId]
    });
  }

  render() {
    const isReadonly = !this.state.data || !this.state.active;

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-small">
            <Search />
            <List
              data={this.state.data}
              loadNote={this.loadNote.bind(this)}
              createNote={this.createNote.bind(this)}
              deleteNote={this.deleteNote.bind(this)}
              active={this.state.active}
              loadList={this.loadList.bind(this)}
            />
          </div>
          <div className="col-big">
            <Textarea
              data={this.state.data}
              isReadonly={isReadonly}
              active={this.state.active}
            />
            <Info />
          </div>
        </div>
      </div>
    )
  }
}
