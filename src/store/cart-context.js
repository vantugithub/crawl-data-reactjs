import React from "react";

const CartContext  = React.createContext(
{
    textSearchHashTag : "",
    changeTextSearchHashTag : (event) => {}
 }

);

export default CartContext;