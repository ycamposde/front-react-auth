import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import HomeService from '../../services/api/home';
import {Redirect} from 'react-router-dom';
import './styles.css';

class Register extends Component {

state = {
  nombres: this.props.nombres || '',
  email: this.props.email || '',
  password: this.props.password || '',
  confir_password: this.props.confir_password || '',
  exito: false,
  validators: {
    nombres: {
      rules: [
        {
          test: (value) => value.trim().length > 0,
          message: 'El campo es obligatorio.'
        },
        {
          test: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_.\-\, ]*$/,
          message: 'El campo debe contener carecteres alfanuméricos.'
        }
      ],
      errors: [],
      valid: false,
      state: ''
    },
    email: {
      rules: [
        {
          test: (value) => value.trim().length > 0,
          message: 'El campo es obligatorio.'
        },
        {
          test: (value) => value.trim().length <= 255,
          message: 'El campo debe de tener un máximo de 255 caracteres.'
        },
        {
          test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'El valor de este campo no es válido.'
        }
      ],
      errors: [],
      valid: false,
      state: ''
    },
    password: {
      rules: [
        {
          test: (value) => value.trim().length > 0,
          message: 'El campo es obligatorio.'
        },
        {
          test: (value) => value.trim().length >= 6,
          message: 'La contraseña debe de tener mas de 6 carácteres'
        }
      ],
      errors: [],
      valid: false,
      state: ''
    },
    confir_password: {
      rules: [
        {
          test: (value) => value.trim() === this.state.password,
          message: 'Las contraseñas no coinciden.'
        },
        {
          test: (value) => value.trim().length >= 6,
          message: 'La contraseña debe de tener mas de 6 carácteres'
        }
      ],
      errors: [],
      valid: true,
      state: ''
    }
  }
};

componentWillMount() {

}

handleSave = () => {
  this.uploadValidators('nombres', this.state.nombres);
  this.uploadValidators('email', this.state.email);
  this.uploadValidators('password', this.state.password);
  this.uploadValidators('confir_password', this.state.confir_password);

  const valid = this.isFormValid();
  if (valid) {
  HomeService.createUsuario({nombres : this.state.nombres,email : this.state.email, password : this.state.password}, (response) => {
    if (response) {
      let usuarios = this.state.usuarios.slice();
      this.setState({
        exito: true
      })
    }
  });
  }
};

handleChangeNombre = (e, fieldName) => {
    this.setState({
      nombres: e.target.value
    });
    this.uploadValidators(fieldName, e.target.value);
};

handleChangeEmail = (e, fieldName) => {
  this.setState({
    email: e.target.value
  });
  this.uploadValidators(fieldName, e.target.value);
};

handleChangePassword = (e, fieldName) => {
  this.setState({
    password: e.target.value
  });
  this.uploadValidators(fieldName, e.target.value);
};

handleChangeConfirPassword = (e, fieldName) => {
  this.setState({
    confir_password: e.target.value
  });
  this.uploadValidators(fieldName, e.target.value);
};






uploadValidators(fieldName, value) {
  const validators = Object.assign({}, this.state.validators);

  validators[fieldName].errors = [];
  validators[fieldName].state = value;
  validators[fieldName].valid = true;
  validators[fieldName].rules.forEach((rule) => {
    if (rule.test instanceof RegExp) {
      if(!rule.test.test(value)) {
        validators[fieldName].errors.push(rule.message);
        validators[fieldName].valid = false;
      }
    } else if (typeof rule.test === 'function') {
      if(!rule.test(value)) {
        validators[fieldName].errors.push(rule.message);
        validators[fieldName].valid = false;
      }
    }
  });

  this.setState({
    validators
  });
}

mostrarErroresValidacion = (fieldName) => {
  const validator = this.state.validators[fieldName];
  const result = '';

  if (validator && !validator.valid && validator.errors.length > 0) {
    const errors = validator.errors
    .map((info, index) =>
    <li
      key={index}
    >
      {info}
    </li>);

    return (
      <ul
        className='errors'
      >
        { errors }
      </ul>
    );
  }

  return result;
};

isFormValid = () => {
  let status = true;
  Object.keys(this.state.validators).forEach((field) => {
    if (!this.state.validators[field].valid) {
      status = false;
    }
  });
  return status;
};

exito = () => {

  if (this.state.exito) {
    return (
      <div class="alert alert-success" role="alert">
       Se registro con  exito!
      </div>
    );
  }
}

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/'}/>)
    }


    return (
      <div class="contenedor-login" style={{background: 'linear-gradient(45deg, #00dbde, #fc00ff)'}}>
        <div class="container-contact100">
         <div class="wrap-contact100">
             <span class="contact100-form-title">
               CREA TU CUENTA
             </span>

             <div class="wrap-input100 validate-input">
               <span class="label-input100">Nombre Completo</span>
               <input class="input100" type="text" value={ this.state.nombres } placeholder="ejemplo - juan" onChange={ (e) => this.handleChangeNombre(e, 'nombres') }></input>
               <span class="focus-input100"></span>
             </div>
             { this.mostrarErroresValidacion('nombres') }
             <div class="wrap-input100 validate-input">
               <span class="label-input100">Correo Eléctronico</span>
               <input class="input100" type="text" value={ this.state.email } placeholder="ejemplo@gmail.com" onChange={ (e) => this.handleChangeEmail(e, 'email') }></input>
               <span class="focus-input100"></span>
             </div>
             { this.mostrarErroresValidacion('email') }
             <div class="wrap-input100 validate-input">
               <span class="label-input100">Contraseña</span>
               <input class="input100" type="password" value={ this.state.password } placeholder="*********" onChange={ (e) => this.handleChangePassword(e, 'password') }></input>
               <span class="focus-input100"></span>
             </div>
             { this.mostrarErroresValidacion('password') }
             <div class="wrap-input100 validate-input">
               <span class="label-input100">Confirma tu contraseña</span>
               <input class="input100" type="password" value={ this.state.confir_password } placeholder="*********" onChange={ (e) => this.handleChangeConfirPassword(e, 'confir_password') }></input>
               <span class="focus-input100"></span>
             </div>
             { this.mostrarErroresValidacion('confir_password') }
             <div class="container-contact100-form-btn">
               <div class="wrap-contact100-form-btn">
                 <div class="contact100-form-bgbtn"></div>
                 <button class="contact100-form-btn" onClick={this.handleSave}>
                   <span>
                     REGISTRAR
                     <i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                   </span>
                 </button>
               </div>
             </div>
             <br></br>

             <div class="container-contact100-form-btn">
               <div class="wrap-contact100-form-btn">
                 <a href="/login">¿Tengo mi cuenta?</a>
               </div>
             </div>
         </div>
       </div>
     </div>
    );
  }
}

export default Register;
