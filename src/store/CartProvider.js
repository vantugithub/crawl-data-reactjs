import React, { useReducer, useState } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    textSearchHashTag : ""
};

const CartProvider = (props) => {

    const [textSearchHashTag,setTextSearchHashTag] = useState("");

    const changeTextSearchHashTagFunc = (event) => {
        setTextSearchHashTag(event.target[0].value);
        console.log(event.target[0].value);
    }

    const cartContext = {
        changeTextSearchHashTag : changeTextSearchHashTagFunc,
        textSearchHashTag : textSearchHashTag
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;