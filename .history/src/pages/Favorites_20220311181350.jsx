import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  constructor(){
    super()
    favoriteSongs: [],
    loading: true,
  }

  componentDidMount(){

  }
  
  updateFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorite,
    }, this.setState({
      loading: false,
    }));
  }

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
