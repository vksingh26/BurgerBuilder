import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            email: 'test@test.com',
            customer: {
                street: 'Electronic City',
                postalCode: '560100',
                country: 'India'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', orders)
            .then(response =>{
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(errors => {
                console.log(errors);
                this.setState({loading: false});
            })
    }

    render() {
       let form = (
            <form>
                <input className="input" type="text" name="name" placeholder="Your Name" />
                <input className="input" type="email" name="email" placeholder="Your Email" />
                <input className="input" type="text" name="street" placeholder="Street" />
                <input className="input" type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className="ContactData">
                <h4>Enter Your Contact Info!!!</h4>
                {form}
            </div>
        )
    }
};

export default ContactData;