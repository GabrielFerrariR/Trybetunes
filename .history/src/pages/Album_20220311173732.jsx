import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
      favoriteSongs: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/')[2];
    const album = await getMusics(id);
    const favorite = await getFavoriteSongs();
    this.setState({
      musics: album.slice(1),
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      favoriteSongs: favorite,
    });
  }

  onFavorite = async (music) => {
    const { isFavorited } = this.state;
    if (isFavorited) {
      this.setState({
        loading: true,
        isFavorited: !isFavorited,
      });
      await removeSong(music);
      this.setState({ loading: false });
    } else {
      this.setState({
        loading: true,
        isFavorited: true,
      });
      await addSong(music);
      this.setState({ loading: false });
    }
  }

  render() {
    const { musics, artistName, albumName, favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ albumName }</p>
        {loading ? <Loading /> : musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
            favoriteSongs={ favoriteSongs }
            onChange={ this.onFavorite }
          />))}
      </div>
    );
  }
}
export default Album;
Album.propTypes = {
  pathname: PropTypes.string,
}.isRequired;
