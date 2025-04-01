import { useEffect } from "react";

const Meals = () => {
    useEffect(() => {
        fetch("http://localhost:3001/meals")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched meals:", data); // Kuvab andmed konsoolis
            })
            .catch((error) => console.error("Error fetching meals:", error));
    }, []);
};

export default Meals;
