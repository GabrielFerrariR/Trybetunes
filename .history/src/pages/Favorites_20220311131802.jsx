import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    this.favUpdate();
  }

  favUpdate = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { onClick } = this.props;
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
            onclick={ onClick}
          />
        ))}
      </div>
    );
  }
}
export default Favorites;