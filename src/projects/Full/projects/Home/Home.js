import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../../../services/PostData';
import HomeService from '../../../../services/api/home';

import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import './styles.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data:[],
      userFeed: '',
      redirectToReferrer: false,
      name:'',
      miToken:'',
      usuarios: [],
    };

    this.getUserFeed = this
      .getUserFeed
      .bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.deleteFeedAction = this.deleteFeedAction.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if(sessionStorage.getItem("userData")){
      this.cargarHome();
    }
  }

  cargarHome = () => {
    HomeService.getUsuarios((response) => {
      console.log(response);
      this.setState({
        usuarios: response,
      })
    });
  };


  componentWillMount() {
   if(sessionStorage.getItem("userData")){
    this.getUserFeed();
   }
   else{
    this.setState({redirectToReferrer: true});
   }
  }

  feedUpdate(e) {
    e.preventDefault();
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = { user_id: data.userData.user_id, token: data.userData.token, feed: this.state.userFeed };
    if (this.state.userFeed) {
      PostData('feedUpdate', postData).then((result) => {
        let responseJson = result;
        let K = [responseJson.feedData].concat(this.state.data);
        console.log(K);
       this.setState({data: K , userFeed:''});
      });
    }
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  deleteFeedAction(e){
    console.log("HI");
  let updateIndex=e.target.getAttribute('value');
  let feed_id=e.target.getAttribute('data');

  let data = JSON.parse(sessionStorage.getItem("userData"));

  let postData = { user_id: data.userData.user_id, token: data.userData.token, feed_id: feed_id };
  if (postData) {
    PostData('feedDelete', postData).then((result) => {
     this
     .state
     .data.splice(updateIndex,1);
    this.setState({data:this
      .state
      .data});
    });
  }
  }

  deleteFeed(e){


      confirmAlert({
        title: '',
        message: 'Are you sure?',
        childrenElement: () => '',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        onConfirm: () => this.deleteFeedAction(e),
        onCancel: () => '',
      })




  }

  getUserFeed() {

    let data = JSON.parse(sessionStorage.getItem("userData"));
    this.setState({name:data[0].name});

    //let postData = { user_id: data.userData.user_id, token: data.userData.token};

    /*if (data) {
      PostData('feed', postData).then((result) => {
        let responseJson = result;
        this.setState({data: responseJson.feedData});
        console.log(this.state);
      });
    }*/

  }

  onChange(e){
    this.setState({userFeed:e.target.value});
   }
   logout(){
     sessionStorage.setItem("userData",'');
     sessionStorage.setItem("Token",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
   }


  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    const usuarios = this.state.usuarios.map((usuario) => {
      return(
        <tr>
          <td>
            { usuario.name }
          </td>
          <td>
            { usuario.email }
          </td>
          <td>
            <div >
              <a
                href='javascript:void(0)'
                onClick={
                  (e) => this.handleEditarCampoCanal(usuario)
                }
              >
                Editar
              </a>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/">REACT JS</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about"></a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="/">{this.state.name}</a></li>
                <li class="active"><a href="./" onClick={this.logout}>SALIR <span class="sr-only">(current)</span></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container">
          <div class="jumbotron">
            <h1>BIENVENIDO A REACT JS - AUTOR YERSON</h1>
            <p></p>
            <p>
              <a class="btn btn-lg btn-primary"  role="button">Reliza tu trabajo de manera facil &raquo;</a>
            </p>
            <div>
              <div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th width='30%'>
                          Nombre
                        </th>
                        <th width='30%'>
                          E-MAIL
                        </th>
                        <th width='25%'>

                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      { usuarios }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
