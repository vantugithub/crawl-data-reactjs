import React, { useReducer, useState } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items : [],
    totalAmount : 0,
    textSearchHashTag : ""
};

const cartReducer  = (state,action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    
    if (action.type === 'REMOVE') {
        const updatedItems = state.item
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const [textSearchHashTag,setTextSearchHashTag] = useState("");

    const addItemToContextHandler = (item) =>{
        dispatchCartAction({
            type: 'ADD',
            item : item
        })
    };

    const removeItemToContextHandler = (id) =>{
        dispatchCartAction({
            type: 'REMOVE',
            id:id
        })
    };

    const changeTextSearchHashTagFunc = (event) => {
        setTextSearchHashTag(event.target[0].value);
        console.log(event.target[0].value);
    }

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToContextHandler,
        removeItem : removeItemToContextHandler,
        changeTextSearchHashTag : changeTextSearchHashTagFunc,
        textSearchHashTag : textSearchHashTag
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;