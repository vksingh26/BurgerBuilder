import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css'
const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h2>Hope it tastes well !!!</h2>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
            btnType="Danger" 
            clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button
            btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;