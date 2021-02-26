import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import Menus from '../Menus';

export const RoleBasedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('login') && localStorage.getItem('customer') ) ? <Component {...props} /> : <Redirect to="/"/>
    )} />
  ) 

class MenuRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                <RoleBasedRoute path="/home/menu" component ={Menus } />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default MenuRouting;