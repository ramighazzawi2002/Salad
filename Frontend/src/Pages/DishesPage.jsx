import React, { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "../Components/DishCard";
import CheckoutCard from "../Components/CheckoutCard";
import DishDetailsPopup from "../Components/DishDetailsPopup";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function DishesPage() {
  const { chefId } = useParams();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setChefId } = useCart();

  useEffect(() => {
    setChefId(chefId);
    axios
      .get(`http://localhost:3000/api/dishes/chef/${chefId}`)
      .then((response) => {
        setDishes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the dishes data!");
        setLoading(false);
      });
  }, [chefId, setChefId]);

  const openDetailsPopup = (dish) => {
    setSelectedDish(dish);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDish(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex">
      <div className="w-3/4 p-5 sm:p-10 md:p-16 overflow-y-auto h-screen">
        <div className="border-b mb-5 flex justify-between text-sm">
          <div className="text-green-600 flex items-center pb-2 pr-2 border-b-2 border-green-600 uppercase">
            Dishes
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <DishCard
                key={dish._id}
                dish={dish}
                openDetailsPopup={openDetailsPopup}
              />
            ))
          ) : (
            <p>No dishes found.</p>
          )}
        </div>
      </div>
      <div className="w-1/4">
        <CheckoutCard />
      </div>
      {isPopupOpen && (
        <DishDetailsPopup dish={selectedDish} onClose={closePopup} />
      )}
    </div>
  );
}

export default DishesPage;
