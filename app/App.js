import React, { Component } from 'react';
import Textarea from './components/Textarea';
import List from './components/List';
import { readFile, readDir } from './general';


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
    readDir('/notes', (data) => {
      this.loaded = true;

      this.setState({
        files: data
      });
    });
  }

  loadActiveNote(name) {
    readFile(`/notes/${name}`, (data) => {
      this.setState({
        text: data,
        active: name
      });
    });
  }

  render() {
    if (!this.loaded) return null;

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-small">
            <List
              files={this.state.files}
              loadActiveNote={this.loadActiveNote.bind(this)}
              active={this.state.active}
            />
          </div>
          <div className="col-big">
            <Textarea
              data={this.state.text}
              active={this.state.active}
            />
          </div>
        </div>
      </div>
    )
  }
}
