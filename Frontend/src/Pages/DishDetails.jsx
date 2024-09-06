import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function DishDetails() {
  const { dishId } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching dish with ID:", dishId); // Log dishId
    axios
      .get(`http://localhost:3000/api/dishes/${dishId}`)
      .then((response) => {
        setDish(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching dish details:",
          error.response || error.message || error
        );
        setError("There was an error fetching the dish details!");
        setLoading(false);
      });
  }, [dishId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!dish) {
    return <p>No dish found.</p>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto" }}>
      {dish.photos && dish.photos.length > 0 && (
        <CardMedia
          component="img"
          height="300"
          image={dish.photos[0]} // Display the first photo
          alt={dish.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {dish.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${dish.price.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "1rem" }}
        >
          Description: {dish.description}
        </Typography>
        {dish.nutrition && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "1rem" }}
          >
            Nutrition:
            <ul>
              <li>Calories: {dish.nutrition.calories}</li>
              <li>Protein: {dish.nutrition.protein}</li>
              <li>Total Fats: {dish.nutrition.totalFats}</li>
              <li>Carbs: {dish.nutrition.carbs}</li>
            </ul>
          </Typography>
        )}
        {dish.availableQuantity && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "1rem" }}
          >
            Available Quantity: {dish.availableQuantity}
          </Typography>
        )}
        {dish.dietaryRestrictions && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "1rem" }}
          >
            Dietary Restrictions: {dish.dietaryRestrictions.join(", ")}
          </Typography>
        )}
        {dish.cuisineType && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "1rem" }}
          >
            Cuisine Type: {dish.cuisineType}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default DishDetails;
