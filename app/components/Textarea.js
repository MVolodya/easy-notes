import React, { Component } from 'react';


export default class Textarea extends Component {
  constructor(props) {
    super(props);


    this.state = {
      text: this.props.active.text
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // TODO: fix this shit
    if (nextProps.active === null || this.props.active === null) {
      this.setState({
        text: ''
      });

      return;
    }

    if (this.props.active.id !== nextProps.active.id) {
      this.setState({
        text: nextProps.active.text
      });
      this.area.focus();
    }
  }

  componentDidUpdate() {
    this.area.dispatchEvent(new CustomEvent('textareaUpdated'));
  }

  handleChange(e) {
    const text = e.target.value;

    this.setState({ text });

    const active = this.props.active;
    const newActive = Object.assign({}, this.props.active, { text });

    localStorage[active.id] = JSON.stringify(newActive);
  }

  render() {
    return (
      <textarea
        className="textarea"
        readOnly={this.props.isReadonly}
        value={this.state.text || ''}
        onChange={this.handleChange}
        ref={(ref) => { this.area = ref; }}
      />
    )
  }
}
