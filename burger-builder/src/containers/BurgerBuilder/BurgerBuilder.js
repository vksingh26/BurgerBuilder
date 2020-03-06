import React, { Component } from "react";

import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 3.5,
    bacon: 2.3
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
             salad: 0,
             bacon: 0,
             cheese: 0,
             meat: 0,
        },
        totalPrice: 4,
        orderPlaceable:false,
        ordering: false
    }

    updateOrderPlaceableState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({orderPlaceable: sum > 0})
    }
    addIngredientsHandler = (ingType) => {
        const oldCount = this.state.ingredients[ingType];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingType] = updatedCount;
        const ingredientsAmountAdded = INGREDIENT_PRICES[ingType];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ingredientsAmountAdded;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateOrderPlaceableState(updatedIngredients);
    }

    removeIngredientsHandler = (ingType) => {
        const oldCount = this.state.ingredients[ingType];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ingType] = updatedCount;
        const ingredientsAmountReduced = INGREDIENT_PRICES[ingType];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - ingredientsAmountReduced;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateOrderPlaceableState(updatedIngredients);
    }

    orderHandler = () => {
        this.setState({ordering: true});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <Modal show={this.state.ordering}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    isOrderPlaceable={this.state.orderPlaceable}
                    ordered={this.orderHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;