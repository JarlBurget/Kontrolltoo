import React, { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import logo from '../assets/logo.jpg';

const Header = () => {
  const cartCtx = useContext(CartContext);
  
  const numberOfCartItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const handleCartClick = () => {
    console.log('Cart clicked!');
    console.log('Items in cart:', cartCtx.items);
    console.log('Total quantity:', numberOfCartItems);
    
    cartCtx.items.forEach(item => {
      console.log(`${item.name}: ${item.quantity} x $${item.price}`);
    });
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>React Food Order App</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleCartClick}>
          Cart ({numberOfCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;