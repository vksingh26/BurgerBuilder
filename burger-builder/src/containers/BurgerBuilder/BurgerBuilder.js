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
import * as actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends Component {

    state = {
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://burger-builder-369b1.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // })
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
    // addIngredientsHandler = (ingType) => {
    //     const oldCount = this.state.ingredients[ingType];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[ingType] = updatedCount;
    //     const ingredientsAmountAdded = INGREDIENT_PRICES[ingType];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + ingredientsAmountAdded;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updateOrderPlaceableState(updatedIngredients);
    // }

    // removeIngredientsHandler = (ingType) => {
    //     const oldCount = this.state.ingredients[ingType];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[ingType] = updatedCount;
    //     const ingredientsAmountReduced = INGREDIENT_PRICES[ingType];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - ingredientsAmountReduced;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updateOrderPlaceableState(updatedIngredients);
    // }

    orderHandler = () => {
        this.setState({ordering: true});
    }

    orderCancelHandler = () => {
        this.setState({ordering: false});
    }

    orderContinuedHandler = () => {
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
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Loading />

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
        if(this.state.loading) {
            orderSummary = <Loading />
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngedientsAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientsName: ingName}),
        onIngedientsRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientsName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));