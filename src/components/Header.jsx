import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const user = await getUser();
    this.setState({
      userInfo: user,
      loading: false,
    });
  }

  render() {
    const { userInfo, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search"> Busca </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritas </Link>
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
        { loading ? <Loading /> : (
          <div data-testid="header-user-name">
            { userInfo.name }
            {' '}
          </div>
        )}
      </header>
    );
  }
}

export default Header;
