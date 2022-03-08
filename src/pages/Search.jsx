import React, { Component } from 'react';
import Header from '../components/Header';
import SearchResult from '../components/SearchResult';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchButtonDisabled: true,
      loading: false,
      btnClicked: false,
      artistAlbuns: '',
      artistName: '',
    };
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateName());
  }

  onBtnClick = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      btnClicked: true,
      artistName: '',
    });
    const artistObj = await searchAlbumsAPI(searchInput);
    if (artistObj.length > 0) {
      this.setState({
        loading: false,
        artistAlbuns: artistObj,
        artistName: searchInput,
        searchInput: '',
      });
    }
    this.setState({ loading: false });
  }

  validateName() {
    const { searchInput } = this.state;
    const minNameLgth = 2;
    this.setState({
      isSearchButtonDisabled: searchInput.length < minNameLgth,
    });
  }

  render() {
    const { searchInput, isSearchButtonDisabled, loading, btnClicked,
      artistAlbuns, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-bar">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="searchInput"
            value={ searchInput }
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.onBtnClick }
          >
            Pesquisar
          </button>
        </div>
        <div className="searchResults">
          { btnClicked && (
            <SearchResult
              loading={ loading }
              artistName={ artistName }
              artistAlbuns={ artistAlbuns }
            />) }
        </div>
      </div>
    );
  }
}
export default Search;
