import React, { Component } from "react";

import Aux from '../../hoc/Auxiliary/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loading from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHanlding/withErrorHandler'
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 3.5,
    bacon: 2.3
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        orderPlaceable:false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-builder-369b1.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        })
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

    orderCancelHandler = () => {
        this.setState({ordering: false});
    }

    orderContinuedHandler = () => {
        //alert('Continue!!!');
        this.setState({loading: true});
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            email: 'test@test.com',
            customer: {
                street: 'Electronic City',
                zipCode: '560100',
                country: 'India'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', orders)
            .then(response =>{
                console.log(response);
                this.setState({loading: false, ordering: false});
            })
            .catch(errors => {
                console.log(errors);
                this.setState({loading: false, ordering: false});
            })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Loading />

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientsHandler}
                        ingredientRemoved={this.removeIngredientsHandler}
                        disabled={disabledInfo} 
                        price={this.state.totalPrice}
                        isOrderPlaceable={this.state.orderPlaceable}
                        ordered={this.orderHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                orderCancelled={this.orderCancelHandler}
                orderContinued={this.orderContinuedHandler}
                price={this.state.totalPrice}/>
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

export default withErrorHandler(BurgerBuilder, axios);