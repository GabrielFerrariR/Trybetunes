import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isSearchButtonDisabled: true,
    };
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateName());
  }

  validateName() {
    const { artistName } = this.state;
    const minNameLgth = 2;
    this.setState({
      isSearchButtonDisabled: artistName.length < minNameLgth,
    });
  }

  render() {
    const { artistName, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-bar">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="artistName"
            value={ artistName }
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
export default Search;
