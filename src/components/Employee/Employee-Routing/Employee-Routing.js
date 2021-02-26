import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import ViewEmployee from '../View-Employee';
import AddEmployee from '../Add-Employee';
import EditEmployee from '../Edit-Employee';


class EmployeeRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                <Route path="/user/employee" component = {ViewEmployee} />
                <Route path="/user/addemployee" component = {AddEmployee} />
                <Route path="/user/editemployee/:id" component = {EditEmployee} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default EmployeeRouting;