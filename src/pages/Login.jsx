import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isSubmitButtonDisabled: true,
      loading: false,
      validUser: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validateName = this.validateName.bind(this);
  }

  onInputChange({ target: { name, value } }, callback) {
    this.setState({
      [name]: value,
    }, () => callback());
  }

  onSubmit = async () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ validUser: true });
  }

  validateName() {
    const { userName } = this.state;
    const minNameLgth = 3;
    this.setState({
      isSubmitButtonDisabled: userName.length < minNameLgth,
    });
  }

  render() {
    const { userName, isSubmitButtonDisabled, loading, validUser } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading />
          : <>
            <input
              type="text"
              name="userName"
              data-testid="login-name-input"
              value={ userName }
              onChange={ (e) => this.onInputChange(e, this.validateName) }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isSubmitButtonDisabled }
              onClick={ this.onSubmit }
            >
              Entrar
            </button>
            </> }
        { validUser && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
