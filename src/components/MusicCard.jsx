import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorited: false,
    };
  }

  onFavorite = async (music) => {
    this.setState({
      loading: true,
      isFavorited: true,
    });
    await addSong(music);
    this.setState({ loading: false });
  }

  render() {
    const { trackName, trackId, previewUrl, music } = this.props;
    const { loading, isFavorited } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                name="favorite"
                onChange={ () => this.onFavorite(music) }
                checked={ isFavorited }
              />
            </label>
          </>) }
      </div>
    );
  }
}

export default MusicCard;
MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
