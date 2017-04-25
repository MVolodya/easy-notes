import React, { Component } from 'react';
import Countable from 'countable';


export default class Info extends Component {
  constructor(props) {
    super(props);

    this.opened = false;

    this.state = {
      characters: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0
    }
  }

  componentDidMount() {
    const node = document.querySelector('.textarea');
    this.count(node);

    node.addEventListener('textareaUpdated', () => {
      this.count(node);
    });
  }

  count(node) {
    Countable.once(node, (e) => {
      this.setState({
        characters: e.characters,
        words: e.words,
        sentences: e.sentences,
        paragraphs: e.paragraphs
      });
    });
  }

  wordEnd(number, words) {
    let ending, i;
    number = number % 100;
    if (number>=11 && number<=19) {
        ending=words[2];
    }
    else {
        i = number % 10;
        switch (i) {
          case (1): ending = words[0]; break;
          case (2):
          case (3):
          case (4): ending = words[1]; break;
          default: ending = words[2];
        }
    }
    return ending;
  }

  toggleInfo() {
    if (this.opened) {
      this.opened = false;
      this.infoBar.classList.remove('open');
      return;
    }

    this.opened = true;
    this.infoBar.classList.add('open');
  }

  render() {
    return (
      <div ref={(ref) => { this.infoBar = ref; }} className="info-wrapper">
        <button className="info-trigger" onClick={this.toggleInfo.bind(this)} />
        <div className="info-bar">
          <div className="box">
            <span className="value">{this.state.characters}</span>
            <span className="title">{this.wordEnd(this.state.characters, ['Буква', 'Букви', 'Букв'])}</span>
          </div>
          <div className="box">
            <span className="value">{this.state.words}</span>
            <span className="title">{this.wordEnd(this.state.words, ['Слово', 'Слова', 'Слів'])}</span>
          </div>
          <div className="box">
            <span className="value">{this.state.sentences}</span>
            <span className="title">{this.wordEnd(this.state.sentences, ['Речення', 'Речення', 'Речень'])}</span>
          </div>
          <div className="box">
            <span className="value">{this.state.paragraphs}</span>
            <span className="title">{this.wordEnd(this.state.paragraphs, ['Параграф', 'Параграфи', 'Параграфів'])}</span>
          </div>
        </div>
      </div>
    );
  }
}
