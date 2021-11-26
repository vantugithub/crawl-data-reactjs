import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

const FormSearchForIns = (props) => {
    
    return (

    <form onSubmit = {props.onSearchHashTag} >
        <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search Hashtag On Instagram" aria-label="Search"
            aria-describedby="search-addon" />
        </div>
    </form>
    );
}

export default FormSearchForIns;