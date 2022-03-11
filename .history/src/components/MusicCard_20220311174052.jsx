import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      // loading: false,
      // isFavorited: false,
    };
  }
  // Contribuição de João Ferraz

  async componentDidMount() {
    // const { music } = this.props;
    // const favorites = await getFavoriteSongs();
    // const isFavorited = favorites.some((fav) => fav.trackId === music.trackId);
    // this.setState({ isFavorited });
  }

  // onFavorite = async (music) => {
  //   const { isFavorited } = this.state;
  //   if (isFavorited) {
  //     this.setState({
  //       loading: true,
  //       isFavorited: !isFavorited,
  //     });
  //     await removeSong(music);
  //     this.setState({ loading: false });
  //   } else {
  //     this.setState({
  //       loading: true,
  //       isFavorited: true,
  //     });
  //     await addSong(music);
  //     this.setState({ loading: false });
  //   }
  // }

  render() {
    const { trackName, trackId, previewUrl, onChange } = this.props;
    const { loading, isFavorited } = this.state;
    return (
      <div>
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
                onChange={ onChange }
                checked={ isFavorited }
              />
            </label>
      </div>
    );
  }
}

export default MusicCard;
MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
