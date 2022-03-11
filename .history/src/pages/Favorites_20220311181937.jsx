import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  constructor() {
    super()
    this.state = {
    favoriteSongs: [],
    loading: true,
    }
  }

  componentDidMount(){
    this.updateFavorites()
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
    const { loading, favoriteSongs} = this.state;
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
            onChange={ () => this.favoriteRemove(music) }
          />))}
      </div>
    );
  }
}
export default Favorites;
