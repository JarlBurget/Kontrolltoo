import Button from '../components/UI/Button';

const MealItem = (props) => {
    const number = props.meal.price; 

    const formattedNumber = new Intl.NumberFormat("de-DE", { 
        style: "currency", 
        currency: "EUR" 
    }).format(number);

    const handleAddToCart = () => {
        console.log(`${props.meal.name} added to cart!`);
    };

    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${props.meal.image}`)} alt={props.meal.name} />
                <div>
                    <h3>{props.meal.name}</h3>
                    <p className="meal-item-price">{formattedNumber}</p> {}
                    <p className="meal-item-description">{props.meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}

export default MealItem;
