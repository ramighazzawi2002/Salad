import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you use react-router-dom
import Button from "@mui/material/Button";

function ChefCard({ chef }) {
  return (
    <div className="chef-card">
      <div className="rounded-lg">
        <img
          className="w-full h-48 object-cover rounded-lg"
          src={chef.chefDisplayPicture}
          alt={`${chef.name}'s display`}
        />
      </div>
      <div className="font-semibold text-l py-">{chef.name}</div>
      <Link to={`/dishes/${chef._id}`}>
        <Button
          // onClick={handleViewProfile}
          variant="contained"
          sx={{
            backgroundColor: "#008033",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          View Profile
        </Button>
      </Link>
    </div>
  );
}

export default ChefCard;
