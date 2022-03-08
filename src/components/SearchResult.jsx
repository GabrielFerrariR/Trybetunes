import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class SearchResult extends Component {
  render() {
    const { loading, artistName, artistAlbuns } = this.props;
    return (
      <>
        { loading && <Loading /> }
        { artistName ? (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              { artistName }
            </p>
            {artistAlbuns.map(({ collectionId, collectionName }) => (
              <Link
                key={ collectionId }
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                { collectionName }
              </Link>
            ))}
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
