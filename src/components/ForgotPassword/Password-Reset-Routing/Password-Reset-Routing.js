import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import Forgotpassword from '../Forgotpassword';



export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        (localStorage.getItem('login') && localStorage.getItem('admin') ) ? <Component {...props} /> : <Redirect to="/"/>
    )} />
  ) 

class PasswordResetRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                <Route path="/user/reset" component={Forgotpassword} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default PasswordResetRouting;