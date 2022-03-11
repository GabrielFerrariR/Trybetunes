import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  async componentDidMount() {
    const { music } = this.props;
    const favorites = await getFavoriteSongs();
    const isFavorite = favorites.some((fav) => fav.trackId === music.trackId);
    this.setState({ isFavorite });
  }

  updateList= () => {
    
  }

  onFavorite = async (music) => {
    const { isFavorite } = this.state;
    if (isFavorite) {
      this.setState({
        loading: true,
        isFavorite: !isFavorite,
      });
      await removeSong(music);
      this.setState({ loading: false });
    } else {
      this.setState({
        loading: true,
        isFavorite: true,
      });
      await addSong(music);
      this.setState({ loading: false });
    }
  }

  render() {
    const { trackName, trackId, previewUrl, music } = this.props;
    const { loading, isFavorite } = this.state;
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
                onChange={ () => this.onFavorite(music, trackId) }
                checked={ isFavorite }
                onClick={ }
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
