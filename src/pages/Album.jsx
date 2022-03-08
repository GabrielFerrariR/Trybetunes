import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
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
    console.log(album);
  }

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ albumName }</p>
        {musics.map(({ trackName, previewUrl }) => (
          <MusicCard
            key={ trackName }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />))}
      </div>
    );
  }
}
export default Album;
Album.propTypes = {
  pathname: PropTypes.string,
}.isRequired;
