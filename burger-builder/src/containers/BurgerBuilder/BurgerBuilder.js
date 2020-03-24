import React, { Component } from "react";
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loading from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHanlding/withErrorHandler'
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updateOrderPlaceableState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0
    }

    orderHandler = () => {
        this.setState({ordering: true});
    }

    orderCancelHandler = () => {
        this.setState({ordering: false});
    }

    orderContinuedHandler = () => {
        this.props.onInItPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Loading />

        if(this.props.ings) {
            burger = (
                <Aux>
                <h1>Build My Burger <span role="img" aria-label="Delicious">&#128523;</span><span role="img" aria-label="Love">&#128525;</span></h1>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngedientsAdded}
                        ingredientRemoved={this.props.onIngedientsRemoved}
                        disabled={disabledInfo} 
                        price={this.props.price}
                        isOrderPlaceable={this.updateOrderPlaceableState(this.props.ings)}
                        ordered={this.orderHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                orderCancelled={this.orderCancelHandler}
                orderContinued={this.orderContinuedHandler}
                price={this.props.price}/>
        }
        

        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, //here burgerBuilder is nothig but reducer, as we have combined multiple reducers
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngedientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngedientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInItPurchase: () => dispatch(actions.purchaseInIt())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));