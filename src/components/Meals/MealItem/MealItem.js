import classes from './MealItem.module.css';
import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {

  const cartCtx = useContext(CartContext);


  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name : props.name,
      amount: amount,
      price : props.price
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>user: {props.username}</h3>
        <div className={classes.description}>Caption: {props.caption}</div>
        <div className={classes.price}>Code caption: {props.codeCaption}</div>
      </div>
      <div>
        {/* <MealItemForm onAddToCart = {addToCartHandler} /> */}
      </div>
    </li>
  );
};

export default MealItem;