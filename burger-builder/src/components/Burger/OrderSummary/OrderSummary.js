import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentDidUpdate() {
        console.log('[OrderSummary] willUpdate');
        
    }
    ingredientsSummary = Object.keys(this.props.ingredients)
    .map(igkey => {
        return (
                <li key={igkey}>
                    <span style={{textTransform: "capitalize"}}>{igkey}: {this.props.ingredients[igkey]}</span>
                </li>
            );
    });
    render(){
        return(
            <Aux>
                <h3>Your Order!!!</h3>
                <p>Your delicious burger contains following ingredients: </p>
                <ul>
                    {this.ingredientsSummary}
                </ul>
                <p><b>Total Price: {this.props.price.toFixed(2)}</b></p>
                <p>Continue to checkout?</p>
                <Button
                    btnType="Danger" 
                    clicked={this.props.orderCancelled}>CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={this.props.orderContinued}>CONTINUE</Button>
            </Aux>
        )
    }
} 

export default OrderSummary;