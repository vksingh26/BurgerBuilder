import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 3.5,
    bacon: 2.3
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientsName]
            };
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientsName]
            };
            default:
                return state;
    }
}

export default reducer;