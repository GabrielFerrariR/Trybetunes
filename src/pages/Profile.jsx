import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.userInfo();
  }

  userInfo = async () => {
    const { description, email, image, name } = await getUser();
    this.setState({
      description,
      email,
      image,
      name,
    }, this.setState({ loading: false }));
  }

  render() {
    const { loading, description, email, image, name } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        { !loading && (
          <section className="profile-container">
            <div
              style={ { display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between' } }
            >
              <img src={ image } alt="Profile" data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <h2>Nome</h2>
            <p>{name}</p>
            <h2>Email</h2>
            <p>{email}</p>
            <h2>Descrição</h2>
            <p>{description}</p>
          </section>) }
      </div>
    );
  }
}
export default Profile;
