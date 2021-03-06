import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isSaveButtonDisabled: true,
      redirectToProfile: false,
      description: '',
      email: '',
      image: '',
      name: '',
    };
  }

  async componentDidMount() {
    await this.userInfo();
    this.validation();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  }

  validation = () => {
    const { description, email, image, name } = this.state;
    const isFilled = description && email && image && name;
    const isValidEmail = /@(.*)\.com/.test(email);
    if (isFilled && isValidEmail) this.setState({ isSaveButtonDisabled: false });
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

  onSaveButtonClick = async () => {
    const { description, email, image, name } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ redirectToProfile: true });
  }

  render() {
    const { loading, description, email, image, name,
      isSaveButtonDisabled, redirectToProfile } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <Loading />}
        {!loading && (
          <form className="profile-form">
            <div style={ { display: 'flex', alignItems: 'flex-end' } }>
              <img src={ image } alt="Profile" />
              <input
                type="text"
                data-testid="edit-input-image"
                name="image"
                className="pic-input"
                placeholder="Insira um link"
                value={ image }
                onChange={ this.onInputChange }
              />
            </div>
            <h1>Nome</h1>
            <p>Fique ?? vontade para usar seu nome social</p>
            <input
              type="text"
              data-testid="edit-input-name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
            <h1>E-mail</h1>
            <p>Escolha um e-mail que consulte frequentemente</p>
            <input
              type="email"
              data-testid="edit-input-email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
            <h1>Descri????o</h1>
            <textarea
              type="text"
              name="description"
              data-testid="edit-input-description"
              placeholder="Sobre mim"
              value={ description }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isSaveButtonDisabled }
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>
          </form>)}
        { redirectToProfile && <Redirect to="/profile" />}
      </div>
    );
  }
}
export default ProfileEdit;
