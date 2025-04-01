import { useState, useEffect } from "react";
import MealItem from "./MealItem";

const Meals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/meals")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched meals:", data);
                setMeals(data); 
            })
            .catch((error) => console.error("Error fetching meals:", error));
    }, []);

    return (
        <ul id="meals">
            {}
            {meals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
};

export default Meals;
