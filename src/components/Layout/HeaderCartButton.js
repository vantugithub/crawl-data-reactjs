import CartIcon from '../Cart/CartIcon';
import classes  from './HeaderCartButton.module.css';
import React , {useContext} from 'react';
import CartContext from '../../store/cart-context';



const HeaderCardButton = props => {

    const cartCtx = useContext(CartContext);

    const numberOfCarttItems = cartCtx.items.reduce((curNumber,item) => {
         return curNumber + item.amount;
     },0);

    return(
        <button onClick={props.onshowCart} className={classes.button}>
            <span className= {classes.icon}>

            <CartIcon></CartIcon>

            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCarttItems}</span>
        </button>
    )
}

export default HeaderCardButton;