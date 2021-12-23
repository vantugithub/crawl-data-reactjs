import React, { Fragment, useContext, useState } from "react";
import SearchHashTag from "./SearchHashTag"
import MealsSummary from "./MealsSumary";
import AvailableMeals from "./AvailableMeals";
import CartContext from "../../store/cart-context";


const Meals = (props) => {

    const ctx = React.useContext(CartContext);

    const onSearchHashTag = (event) => {
        event.preventDefault();
        ctx.changeTextSearchHashTag(event);
    }

    return(
        <Fragment>

        <MealsSummary onSearchHashTag = {onSearchHashTag}></MealsSummary>
        {ctx.textSearchHashTag.length > 2 && <SearchHashTag></SearchHashTag>}
        {ctx.textSearchHashTag.length < 2 && <AvailableMeals></AvailableMeals> }
        </Fragment>
    )
}

export default Meals;