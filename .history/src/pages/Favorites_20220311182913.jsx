import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: true,
      isFavorite: true,
    };
  }

  componentDidMount() {
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

  favoriteRemove = async (music) => {
    this.setState({ loading: true });
    await removeSong(music);
    this.updateFavorites();
  }

  render() {
    const { loading, favoriteSongs, isFavorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
            isFavorite={ isFavorite }
            onChange={ () => this.favoriteRemove(music) }
          />))}
      </div>
    );
  }
}
export default Favorites;
