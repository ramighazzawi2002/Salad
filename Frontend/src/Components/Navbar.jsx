import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Check for the token in cookies
    console.log(token);
    setIsLoggedIn(!!token); // Set login status based on whether token exists
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token cookie
    Cookies.remove("user_id"); // Remove the user_id cookie
    setIsLoggedIn(false); // Update login status
    navigate("/"); // Redirect to homepage after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu state
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          MyWebsite
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <nav
          className={`lg:flex items-center ${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:w-auto`}
        >
          <ul className="lg:flex lg:space-x-6">
            <li>
              <Link
                to="/"
                className="block px-3 py-2 text-black hover:text-green-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/catalogRecipe"
                className="block px-3 py-2 text-black hover:text-green-600"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/chefs"
                className="block px-3 py-2 text-black hover:text-green-600"
              >
                Our Chefs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block px-3 py-2 text-black hover:text-green-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block px-3 py-2 text-black hover:text-green-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block px-3 py-2 text-black hover:text-green-600"
              >
                Contact
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-black hover:text-green-600"
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleLogout}
              className="mt-4 lg:mt-0 lg:ml-6 bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-red-600 transition-colors duration-200"
            >
              Log out
            </motion.button>
          ) : (
            <Link
              to="/signup"
              className="mt-4 lg:mt-0 lg:ml-6 bg-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-green-700 transition-colors duration-200"
            >
              Sign up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
