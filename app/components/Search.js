import React, { Component } from 'react';


export default class Search extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <form className="search-bar">
        <input className="search" type="text" placeholder="Пошук..." />
        <button className="search-submit" type="submit" />
      </form>
    );
  }
}
