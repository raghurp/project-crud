import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
import AddSize from '../AddSize';
import AddCrust from '../AddCrust';
import AddVegToppings from '../AddVegToppings';
import AddNonVegToppings from '../AddNonVegToppings';

import EditCrust from '../EditCrust';
import EditSize from '../EditSize';
import EditNonVegToppings from '../EditNonVegToppings';
import EditVegToppings from '../EditVegToppings';

import PizzaSize from '../PizzaSize';
import PizzaCrust from '../PizzaCrust';
import VegToppings from '../VegToppings';
import NonVegToppings from '../NonVegToppings';


class ManagePizzaRouting extends Component {
    render() {
        return (
            <div>
                <Router>
                <Fragment>
                    <Route path="/user/addsize/" component = {AddSize} /> 
                    <Route path="/user/addcrust/" component = {AddCrust} />
                    <Route path="/user/addvegtoppings/" component = {AddVegToppings} />
                    <Route path="/user/addnonvegtoppings/" component = {AddNonVegToppings} />

                    <Route path="/user/editcrust/" component = {EditCrust} />
                    <Route path="/user/editsize/" component = {EditSize} />
                    <Route path="/user/editnonvegtoppings/" component = {EditNonVegToppings} />
                    <Route path="/user/editvegtoppings/" component = {EditVegToppings} />

                    <Route path="/user/pizzasize/" component = {PizzaSize} />
                    <Route path="/user/pizzacrust/" component = {PizzaCrust} />
                    <Route path="/user/vegToppings/" component = {VegToppings} /> 
                    <Route path="/user/nonvegToppings/" component = {NonVegToppings} />
                </Fragment>
                </Router>
            </div>
        );
    }
}

export default ManagePizzaRouting;