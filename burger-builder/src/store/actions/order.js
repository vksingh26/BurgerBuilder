import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseOrderSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseOrderFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => { //this method will called once we click the order button
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response =>{
                console.log(response);
                dispatch(purchaseOrderSuccess(response.data.name, orderData));
            })
            .catch(error => {
                console.log(error);
                dispatch(purchaseOrderFail(error));
            })
    }
}

export const purchaseInIt = () => {
    return {
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart);
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrder = [];
                for(let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrder));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
            })
    }
}