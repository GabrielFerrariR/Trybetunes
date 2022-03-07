import React, { Component } from 'react';
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
        { loading ? <Loading /> : (
          <p data-testid="header-user-name">
            { userInfo.name }
            {' '}
          </p>
        )}
      </header>
    );
  }
}

export default Header;
