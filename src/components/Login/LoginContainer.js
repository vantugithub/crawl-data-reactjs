import FormLogin from './FormLogin';
import FormRegister from "./FormRegister";
import classes from './MealsSummary.module.css';
import React, {Fragment, useState} from "react";
const LoginContainer = (props) => {
  const [isLogin, setIsLogin] = useState(true);

 
  return (

    <Fragment >
      <section className={classes.summary}>
      <h2>Instagram Smart Crawler</h2>
 
      {isLogin ? <FormLogin setIsLogin = {setIsLogin}/> :<FormRegister setIsLogin = {setIsLogin}/>}
        
        
      </section>
     

    </Fragment>
    
  );
};

export default LoginContainer;