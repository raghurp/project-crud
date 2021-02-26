import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import PizzaSides from '../PizzaSides';
import AddSides from '../AddSides';
import EditSide from '../EditSide';

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('login') && localStorage.getItem('admin') ) ? <Component {...props} /> : <Redirect to="/"/>
    )} />
  ) 

class PizzaSidesRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                <Route path="/user/pizzasides/" component = {PizzaSides} />
                <Route path="/user/addsides/" component = {AddSides} />
                <Route path="/user/editsides/" component = {EditSide} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default PizzaSidesRouting;