import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../Trybetunes.png';

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
        <div className="header-title">
          <img src={ logo } alt="Trybe-tunes" />
          { loading ? <Loading /> : (
            <div data-testid="header-user-name">
              { userInfo.name }
              {' '}
            </div>
          )}
        </div>
        <nav className="header-nav">
          <Link
            data-testid="link-to-search"
            className="nav-option"
            to="/search"
          >
            Pesquisa
          </Link>
          <Link
            data-testid="link-to-favorites"
            className="nav-option"
            to="/favorites"
          >
            Favoritas
          </Link>
          <Link
            data-testid="link-to-profile"
            className="nav-option"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
