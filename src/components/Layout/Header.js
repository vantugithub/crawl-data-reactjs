import {Fragment} from 'react';
import mealsImage from '../../assets/ita_wine.png'
import classes from './Header.module.css';
import HeaderCardButton from './HeaderCartButton';

const Header =  props => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>Crawler</h1>
                {/* <HeaderCardButton onshowCart = { props.onShowCart}/> */}

            </header>
            
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="" />
            </div>
        </Fragment>
    );
}   

export default Header;