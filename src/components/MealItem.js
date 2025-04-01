import React, { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  
  const handleAddToCart = () => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      price: props.meal.price,
      description: props.meal.description,
      image: props.meal.image
    });
  };

  return (
    <li className="meal-item">
      <article>
        <img
          src={require(`../assets/${props.meal.image}`)}
          alt={props.meal.name}
        />
        <div>
          <h3>{props.meal.name}</h3>
          <p className="meal-item-price">{props.meal.price}</p>
          <p className="meal-item-description">{props.meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;