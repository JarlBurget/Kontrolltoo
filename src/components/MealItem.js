import React, { useContext } from 'react';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const handleAddToCart = () => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      description: meal.description,
      image: meal.image,
    });
  };

  return (
    <li className="meal-item">
      <article>
        <img src={require(`../assets/${meal.image}`)} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
