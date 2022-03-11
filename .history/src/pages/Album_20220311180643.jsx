import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

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
    this.setState({
      musics: album.slice(1),
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
    });
    this.updateFavorites();
  }

  updateFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorite,
    }, this.setState({
      loading: false,
    }));
  }

  onFavorite = async (music) => {
    const { favoriteSongs } = this.state;
    this.setState({
      loading: true,
    });
    const isFavorite
    if (favoriteSongs.some((fav) => fav.trackId === music.trackId)) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.updateFavorites();
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
            isFavorited={ favoriteSongs.some((fav) => fav.trackId === music.trackId) }
            onChange={ () => this.onFavorite(music) }
          />))}
      </div>
    );
  }
}
export default Album;
Album.propTypes = {
  pathname: PropTypes.string,
}.isRequired;
