import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Allplants from './Plants/Allplants'
import { Login } from './auth/Login.jsx'
import { Register } from './auth/Register.jsx'
import jwt_decode from 'jwt-decode'
import {Switch , Route, Redirect} from 'react-router-dom'
import { Alert } from "react-bootstrap";

export default class App extends Component {
  state = {
    user : null , 
    isLogin : false
  }
  
  componentDidMount (){
    this.userLogin()
  }
  
  
  //Login jwt decoding 
  userLogin = () =>{
    if (localStorage.token){
      let token = localStorage.token
      let user = jwt_decode(token , process.env.SECRET).user
      this.setState({
        user : user , 
        isLogin:true
      })
      }else {
        this.setState({
          user : null , 
          isLogin:false
        })
      }
  
  }
  render() {
    return (
      <div>
         <Switch>
         <Route path= '/login' render ={ (props) => <Login  {...props} userLogin = {this.userLogin}/>} />
         <Route path= '/register' component ={Register} />  
        <Allplants/>
        </Switch>
      </div>
    )
  }
}

export default App;
