import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class SearchResult extends Component {
  render() {
    const { loading, artName, artistAlbuns } = this.props;
    return (
      <>
        { loading && <Loading /> }
        { artName ? (
          <>
            <p className="result-name">
              Resultado de álbuns de
              {' '}
              { artName }
              {':'}
            </p>
            <section className="search-card-container">
              {artistAlbuns
                .map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
                  <Link
                    key={ collectionId }
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <div className="album-card">
                      <div className="bliu">
                        <img src={ artworkUrl100 } alt={ collectionName } />
                      </div>
                      <h2>{ artistName }</h2>
                      <p>{ collectionName }</p>
                    </div>
                  </Link>
                ))}
            </section>
          </>
        ) : <p>Nenhum álbum foi encontrado</p> }
      </>
    );
  }
}
export default SearchResult;
SearchResult.propTypes = {
  loading: PropTypes.bool,
  artistName: PropTypes.string,
  artistAlbuns: PropTypes.array,
}.isRequired;
