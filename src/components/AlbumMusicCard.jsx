import React, { Component } from 'react';
import PropTypes from 'prop-types';
import heart from '../bi_heart.svg';
import heartFill from '../bi_heart-fill.svg';

class AlbumMusicCard extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { trackName, trackId, previewUrl,
      onChange, isFavorited } = this.props;
    return (
      <div className="music-card">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <img
            className="fav-icon"
            src={ isFavorited ? heartFill : heart }
            alt="Favorite icon"
          />
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            name={ trackId }
            style={ { visibility: 'hidden' } }
            onChange={ onChange }
            checked={ isFavorited }
          />
        </label>
      </div>
    );
  }
}

export default AlbumMusicCard;
AlbumMusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
