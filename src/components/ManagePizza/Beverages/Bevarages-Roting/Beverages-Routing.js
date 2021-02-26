import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import Beverage from '../Beverage';
import AddBeverage from '../AddBeverage';
import EditBeverage from '../EditBeverage';


export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('login') && localStorage.getItem('admin') ) ? <Component {...props} /> : <Redirect to="/"/>
    )} />
  ) 

class BeveragesRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                <Route path="/user/beverage/" component = {Beverage} />
                <Route path="/user/addbeverage/" component = {AddBeverage} />
                <Route path="/user/editbeverage/" component = {EditBeverage} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default BeveragesRouting;