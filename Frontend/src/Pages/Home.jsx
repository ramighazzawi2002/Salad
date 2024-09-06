import React from "react";
import Salad1 from "../imgs/Group 18.png";
import bg from "../imgs/bg.jpeg";
import Button from "@mui/material/Button";
import NavBar from "../Components/Navbar";

function Home() {
  return (
    <div>
      <HeroSection />
      <Features />
      <AboutUsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 align-middle p-4 sm:p-8 md:p-12 rounded-3xl items-center ">
      <div className=" flex flex-col gap-12 ">
        <div className="flex flex-col gap-6">
          <div className="text-6xl font-bold ">
            Enjoy Healthy Life & <br />
            Testy Food.
          </div>
          <div className="text-xl text-slate-700">
            Discover more than{" "}
            <span className="text-green-700">1000 recipes</span> in your hand
            with the best recipe. Help you to find the easiest way to cook.
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#008033",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Expolre Recipes
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#008033",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Order Dish
          </Button>
        </div>
      </div>
      <div className="">
        <img src={Salad1} alt="My Image" className="h-full" />
      </div>
    </div>
  );
}

function Features() {
  const featuresData = {
    features: [
      {
        title: "Nutrition Facts",
        description:
          "Get detailed nutritional information for every recipe and dish, helping you make informed, healthy choices with ease.",
      },
      {
        title: "Multi-Cuisine Variety",
        description:
          "Explore a wide range of recipes and dishes from different cuisines around the world, bringing global flavors to your table.",
      },
      {
        title: "Recipes & Ready-Made Dishes",
        description:
          "Whether you prefer cooking at home or ordering in, enjoy a variety of recipes and freshly prepared salads and dishes.",
      },
      {
        title: "Visual Recipe Guides",
        description:
          "Cook with confidence using our step-by-step videos and images that guide you through each recipe with ease.",
      },
    ],
  };
  return (
    <section className="py-24 bg-gray-100 text-center">
      <h2 className="text-2xl font-semibold mb-8">Our Features</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {featuresData.features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-full max-w-xs"
          >
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutUsSection() {
  return (
    <div className="relative ">
      <img
        src={bg}
        alt="Pasta salad with tomatoes and herbs"
        className="w-full h-96 object-cover"
      />
      <div className="absolute top-4 left-4 bg-white text-green-700 py-1 px-3 rounded-full text-sm font-semibold">
        50+ Quick Food Recipes That Easy To Do!
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md mx-4 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
          <p className="text-sm mb-6 text-center">
            Our recipes are the heart and soul of our culinary community, and
            they reflect our commitment to providing you with memorable and
            delightful dining experiences.
          </p>
          <div className="text-center">
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
