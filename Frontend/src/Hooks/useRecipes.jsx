import { useEffect, useState } from "react";
import axios from "axios";

// const useRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:3000/api/recipes/getAll')
//       .then(response => {
//         setRecipes(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   return { recipes, loading, error };
// };

// export default useRecipes;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useRecipes = (category) => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/api/recipes/getAll', {
//           params: { category } // ارسال الفئة كمعامل
//         });
//         setRecipes(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, [category]); // تحديث عند تغيير الفئة

//   return { recipes, loading, error };
// };

// export default useRecipes;
// src/Hooks/useRecipes.js

const useRecipes = category => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/recipes/getfillter",
          {
            params: { category }, // Sending the category as a filter parameter
          }
        );
        setRecipes(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes(); // Call the async function to fetch recipes
  }, [category]); // Effect will run when 'category' changes

  return { recipes, loading, error };
};

export default useRecipes;
