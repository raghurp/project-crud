import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import GridComponent from '../GridComponent.js'



export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('login') && localStorage.getItem('admin') ) ? <Component {...props} /> : <Redirect to="/"/>
    )} />
  ) 

class GridRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                    <Route path="/user/create/grid" component={GridComponent} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default GridRouting;