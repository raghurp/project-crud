import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import MyProfile from '../MyProfile';



export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('login') && localStorage.getItem('admin') ) ? <Component {...props} /> : <Redirect to="/"/>
    )} />
  ) 

class MyProfileRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                <Route path="/user/profile" component={MyProfile} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default MyProfileRouting;