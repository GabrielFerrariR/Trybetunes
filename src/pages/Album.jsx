import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumMusicCard from '../components/AlbumMusicCard';
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
      albumThumb: album[0].artworkUrl100,
    });
    this.updateFavorites();
  }

  updateFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorite,
      loading: false,
    });
  }

  onFavorite = async (music) => {
    const { favoriteSongs } = this.state;
    this.setState({
      loading: true,
    });
    const isFavorite = favoriteSongs.some((fav) => fav.trackId === music.trackId);
    if (isFavorite) await removeSong(music);
    if (!isFavorite) await addSong(music);
    this.updateFavorites();
  }

  render() {
    const { musics, artistName, albumName,
      favoriteSongs, loading, albumThumb } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="page-album">
          <section className="album-info">
            <img src={ albumThumb } alt="Album thumbnail" />
            <h1 data-testid="album-name">{ albumName }</h1>
            <p data-testid="artist-name">{ artistName }</p>
          </section>
          <section style={ { marginTop: '139px' } }>
            {loading ? <Loading /> : musics.map((music) => (
              <AlbumMusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
                isFavorited={ favoriteSongs.some((fav) => fav.trackId === music.trackId) }
                onChange={ () => this.onFavorite(music) }
              />))}
          </section>
        </div>
      </div>
    );
  }
}
export default Album;
Album.propTypes = {
  pathname: PropTypes.string,
}.isRequired;
