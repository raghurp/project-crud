import './App.css';
import React, { Component, Fragment } from 'react';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import User from './components/Layout/User';

import Topbar from './components/Customer/Home/Topbar';
import SignUp from './components/Sign-Up/SignUp';
import ManagePizzaRouting from './components/ManagePizza/Manage-Pizza-Routing/Manage-Pizza-Routing';
import BeveragesRouting from './components/ManagePizza/Beverages/Bevarages-Roting/Beverages-Routing';
import PizzaSidesRouting from './components/ManagePizza/PizzaSides/Pizza-Sides-Routing/Pizza-Sides-Routing';
import MenuRouting from './components/Customer/Menus/Menu-Routing/Menu-Routing';
import EmployeeRouting from './components/Employee/Employee-Routing/Employee-Routing';
import UploadPizzaRouting from './components/UploadPizza/Upload-Pizza-Routing/Upload-Pizza-Routing';
import MyProfileRouting from './components/MyProfile/My-Profile-Routing/My-Profile-Routing';
import PasswordResetRouting from './components/ForgotPassword/Password-Reset-Routing/Password-Reset-Routing';
import TroubleLogin from './components/Trouble-Login/TroubleLogin';
import GridRouting from './components/grid-component/grid-routing/GridRouting';
import DynamicTable from './dynamic-components/Grid/DynamicTable';


export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      (localStorage.getItem('login') && localStorage.getItem('admin') ) ? <Component {...props} /> : <Redirect to="/"/>
  )} />
) 

export const RoleBasedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      (localStorage.getItem('login') && localStorage.getItem('customer') ) ? <Component {...props} /> : <Redirect to="/"/>
  )} />
) 
class App extends Component { 
  render() {
    return ( 
      <div >
        <Router>
        <Route path="/" exact component={Login} /> 
        <Route path="/signup" exact component={SignUp} />
        <Route path="/troublelogin" exact component={TroubleLogin} /> 
        <Route path="/dynamic" exact component={DynamicTable} />     
          <Fragment > 
          <PrivateRoute path="/user" component ={User} />
          <RoleBasedRoute path="/home" component ={Topbar} />
          </Fragment>
          
          
          <PrivateRoute>
          <GridRouting />
          <PasswordResetRouting /> 
          <ManagePizzaRouting />
          <EmployeeRouting />
          <BeveragesRouting />
          <PizzaSidesRouting />          
          <UploadPizzaRouting />
          <MyProfileRouting />         
          </PrivateRoute>

          <MenuRouting />
        </Router>
      
      </div>

    );
  }
}

export default App;
