import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function DishDetailsPopup({ dish, onClose, addToCart }) {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <Card>
          {dish.photos && dish.photos.length > 0 && (
            <CardMedia
              component="img"
              height="300"
              image={dish.photos[0]}
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
            <button
              onClick={() => {
                addToCart(dish);
                onClose();
              }}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="mt-2 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
            >
              Close
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DishDetailsPopup;
