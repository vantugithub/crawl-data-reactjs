import {Fragment} from 'react';
import mealsImage from '../../assets/ita_wine.png'
import classes from './Header.module.css';

const Header =  props => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>Crawler</h1>
                <button type='button' className="btn btn-danger" onClick={props.onShowCart}>Analysis</button>
            </header>
            
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="" />
            </div>
        </Fragment>
    );
}   

export default Header;