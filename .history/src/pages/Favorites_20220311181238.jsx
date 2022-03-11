import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  componentDidMount(){}
  
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
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
export default Favorites;
