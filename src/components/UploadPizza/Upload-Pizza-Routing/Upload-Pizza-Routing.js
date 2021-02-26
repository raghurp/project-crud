import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import EditUpload from '../EditUpload';
import UploadPizza from '../UploadPizza';
import ViewCatalog from '../ViewCatalog';

class UploadPizzaRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                    <Route path="/user/editpizza/:id" component = {EditUpload} />
                    <Route path="/user/upload/" component = {UploadPizza} />
                    <Route path="/user/viewcatalog/" component = {ViewCatalog} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default UploadPizzaRouting;