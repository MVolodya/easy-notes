import React, { Component } from 'react';
import { writeFile } from '../general';


export default class Textarea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.data
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        text: nextProps.data
      });
      this.area.focus();
    }
  }

  handleChange(e) {
    writeFile(`/notes/${this.props.active}`, e.target.value);
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <textarea
        className="textarea"
        readOnly={this.props.isReadonly}
        value={this.state.text}
        onChange={this.handleChange}
        ref={(ref) => { this.area = ref; }}
      />
    )
  }
}
