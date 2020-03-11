import React from 'react';
import Aux from '../../../hoc/Auxiliary';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igkey => {
        return (
                <li key={igkey}>
                    <span style={{textTransform: "capitalize"}}>{igkey}: {props.ingredients[igkey]}</span>
                </li>
            );
    });
    return (
        <Aux>
            <h3>Your Order!!!</h3>
            <p>Your delicious burger contains following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><b>Total Price: {props.price.toFixed(2)}</b></p>
            <p>Continue to checkout?</p>
            <Button 
                btnType="Danger" 
                clicked={props.orderCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.orderContinued}>CONTINUE</Button>
        </Aux>
        );
}

export default orderSummary;