import React, { useEffect, useState } from "react";
import axios from "axios";
import ChefCard from "../Components/ChefCard";

function Chefs() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/chefs")
      .then((response) => {
        setChefs(response.data.chefs);
      })
      .catch((error) => {
        console.error("There was an error fetching the chefs data!", error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Chefs Page</h1>
      <div className="grid grid-cols-4 gap-6">
        {chefs.length > 0 ? (
          chefs.map((chef) => <ChefCard key={chef._id} chef={chef} />)
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Chefs;
