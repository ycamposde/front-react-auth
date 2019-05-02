import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import './styles.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.email && this.state.password) {
      PostData('/login', this.state).then((response) => {
        let tokenJson = response;
        if (tokenJson) {
          sessionStorage.setItem('Token',JSON.stringify(tokenJson));
          //this.setState({redirectToReferrer: true});
          this.auth();
        }
      });
    }
  }

  auth() {

    if (this.state.email && this.state.password) {
      PostData('/auth', this.state).then((result) => {
        let responseJson = result;
        if (responseJson) {
          sessionStorage.setItem('userData',JSON.stringify(responseJson));
          this.setState({redirectToReferrer: true});
        }
      });
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/'}/>)
    }
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/'}/>)
    }
    return (
       <div class="contenedor-login" style={{background: 'linear-gradient(45deg, #00dbde, #fc00ff)'}}>
         <div class="container-contact100">
       		<div class="wrap-contact100">
       				<span class="contact100-form-title">
       					INICIAR SESSIÓN
       				</span>

       				<div class="wrap-input100 validate-input">
       					<span class="label-input100">Correo Eléctronico</span>
       					<input class="input100" type="text" name="email" placeholder="ejemplo@gmail.com" onChange={this.onChange}></input>
       					<span class="focus-input100"></span>
       				</div>

       				<div class="wrap-input100 validate-input">
       					<span class="label-input100">Contraseña</span>
       					<input class="input100" type="password" name="password" placeholder="*********" onChange={this.onChange}></input>
       					<span class="focus-input100"></span>
       				</div>

       				<div class="container-contact100-form-btn">
       					<div class="wrap-contact100-form-btn">
       						<div class="contact100-form-bgbtn"></div>
       						<button class="contact100-form-btn" onClick={this.login}>
       							<span>
       								ENVIAR
       								<i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
       							</span>
       						</button>
       					</div>
       				</div>
              <div class="container-contact100-form-btn">
       					<div class="wrap-contact100-form-btn">
       						<a href="/register">¿No tengo una cuenta?</a>
       					</div>
       				</div>
       		</div>
       	</div>
      </div>
    );
  }
}

export default Login;
