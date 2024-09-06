import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RecipeDetailsPage from "./Pages/Resipe";
import CatalogPage from "./Pages/CatalogRecipePage";
import Signup from "./Pages/SignUp/SignUp";
import Login from "./Pages/LogIn/LogIn";
import Chefs from "./Pages/Chefs";
import DishesPage from "./Pages/DishesPage";
import DishDetails from "./Pages/DishDetails";
import Dashboard from "./Pages/Dashboard/adminDashboard";

//abdalla
import DishCreationForm from "./Pages/chef/a/creatDishes";
import RecipeFormCreat from "./Pages/chef/a/creatRecipe";
import RecipesList from "./Pages/chef/a/RecipesList";
import EditRecipe from "./Pages/chef/a/EditRecipe";
import DishList from "./Pages/chef/a/DishList";
import EditDishForm from "./Pages/chef/a/EditDishForm";
import UserProfile from "./Pages/Profile/UserProfile";
import ChefRequestForm from "./Pages/ChefRequest/ChefRequestForm";
import Navbar from "./Components/Navbar";

// context
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalogRecipe" element={<CatalogPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dishesCreat" element={<DishCreationForm />} />
            <Route path="/creatRecipe" element={<RecipeFormCreat />} />
            <Route path="/recipeLists" element={<RecipesList />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/dishList" element={<DishList />} />
            <Route path="/edit-dish/:id" element={<EditDishForm />} />
            <Route path="/chefs" element={<Chefs />} />
            <Route path="/dishes/:chefId" element={<DishesPage />} />
            <Route path="Dish-details/:dishId" element={<DishDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chef-request" element={<ChefRequestForm />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
