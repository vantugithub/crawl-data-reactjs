import React,{useState} from "react";
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals.js';
import CartProvider from "./store/CartProvider";
import Analysis from "./components/Analysis/Analysis.js";
import LoginContainer from "./components/Login/LoginContainer";
function App() {

  const [SearchIsShown,setCartIsShown]  = useState(false);

  const showCartHandler = () => {
    if (SearchIsShown==false) {
      setCartIsShown(true);
    }
    else {
      setCartIsShown(false);
    }
  };
  
  const hideCartHandler = () => {
    setCartIsShown(false);
  }
  
  return (
    <CartProvider>
      <Header onShowCart = {showCartHandler} ></Header>
      
      <main>
        <LoginContainer />
        {/* {!SearchIsShown && <Meals></Meals>} */}
        {SearchIsShown && <Analysis></Analysis>}
      </main>
    </CartProvider>
  );
}

export default App;
