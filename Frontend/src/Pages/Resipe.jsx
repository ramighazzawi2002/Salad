// import { motion } from 'framer-motion';
// import '../CssPages/RecipeDetailsPage.css';

// const RecipeDetailsPage = ({ recipe }) => {
//   return (
//     <div className="recipe-detail-page">
//       {/* Hero Section */}
//       {/* <div className="hero-section relative">
//         <motion.video
//           src={recipe.videoTutorialUrl}
//           autoPlay
//           loop
//           muted
//           className="w-full h-auto object-cover"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         />
//         <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
//           <h1 className="text-4xl font-bold">{recipe.title}</h1>
//           <p className="mt-4 text-lg">{recipe.description}</p>
//         </div>
//       </div> */}

//       {/* Main Content Section */}
//       <div className="content-section mt-8 mx-auto px-4 max-w-7xl">
//         {/* Ingredients */}
//         <div className="ingredients-section mb-8">
//           <h2 className="text-2xl font-bold">Ingredients</h2>
//           <div className="ingredients-grid mt-4 grid grid-cols-2 gap-4">
//             {recipe.ingredients.map((ingredient, index) => (
//               <motion.div
//                 key={index}
//                 className="ingredient-card p-4 bg-white shadow-lg hover:shadow-xl rounded-lg transition-shadow"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h3 className="font-medium">{ingredient.name}</h3>
//                 <p>{ingredient.quantity} {ingredient.unit}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Cooking Instructions */}
//         <div className="instructions-section mb-8">
//           <h2 className="text-2xl font-bold">Instructions</h2>
//           <div className="instructions-steps mt-4">
//             {recipe.instructions.map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="instruction-step mb-4 p-4 bg-white shadow-lg rounded-lg"
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h3 className="font-medium">Step {index + 1}</h3>
//                 <p>{step}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Nutrition Facts */}
//         <div className="nutrition-section mb-8">
//           <h2 className="text-2xl font-bold">Nutrition Facts</h2>
//           <div className="nutrition-grid mt-4 grid grid-cols-2 gap-4">
//             {Object.entries(recipe.nutrition).map(([key, value]) => (
//               <div key={key} className="nutrition-item p-4 bg-white shadow-lg rounded-lg">
//                 <h3 className="font-medium">{key}</h3>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Ratings & Reviews */}
//         <div className="ratings-reviews-section mb-8">
//           <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
//           {/* Here you can add a rating component and review form */}
//         </div>

//         {/* Wishlist Button */}
//         <div className="wishlist-button mb-8">
//           <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>

//       {/* Scroll Pop-Up Section */}
//       <div className="scroll-popup fixed bottom-0 w-full bg-white shadow-lg p-4 flex items-center justify-between">
//         <p>Related Recipes</p>
//         {/* Add scrollable related recipes or additional content */}
//       </div>
//     </div>
//   );
// };

// export default RecipeDetailsPage;
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RecipeDetailsPage = () => {
//   const { recipeId } = useParams(); // الحصول على recipeId من الـ URL
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(`/api/recipes/${recipeId}`); // استعلام الوصفة باستخدام المعرف
//         setRecipe(response.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [recipeId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!recipe) {
//     return <p>Recipe not found.</p>;
//   }

//   return (
//     <div>
//       <h1>{recipe.title}</h1>
//       <p>{recipe.description}</p>
//       {recipe.videoTutorialUrl ? (
//         <video src={recipe.videoTutorialUrl} controls />
//       ) : (
//         <p>No video available</p>
//       )}
//       <h2>Ingredients</h2>
//       <ul>
//         {recipe.ingredients.map((ingredient, index) => (
//           <li key={index}>
//             {ingredient.name}: {ingredient.quantity} {ingredient.unit}
//           </li>
//         ))}
//       </ul>
//       <h2>Instructions</h2>
//       <ol>
//         {recipe.instructions.map((step, index) => (
//           <li key={index}>{step}</li>
//         ))}
//       </ol>
//       <p>Cooking Time: {recipe.cookingTime} minutes</p>
//       <h3>Nutrition</h3>
//       <ul>
//         <li>Calories: {recipe.nutrition.calories}</li>
//         <li>Protein: {recipe.nutrition.protein}</li>
//         <li>Total Fats: {recipe.nutrition.TotalFats}</li>
//         <li>Carbs: {recipe.nutrition.carbs}</li>
//       </ul>
//       <p>Servings: {recipe.servings}</p>
//       {recipe.photos && recipe.photos.length > 0 && (
//         <div>
//           <h3>Photos</h3>
//           {recipe.photos.map((photo, index) => (
//             <img key={index} src={photo} alt={`Recipe Step ${index + 1}`} width="200" />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetailsPage;
// import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RecipeDetailsPage = () => {
//   const { recipeId } = useParams(); // الحصول على recipeId من الـ URL
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(`/api/recipe/get/${recipeId}`); // استعلام الوصفة باستخدام المعرف
//         setRecipe(response.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [recipeId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!recipe) {
//     return <p>Recipe not found.</p>;
//   }

//   return (
//     <div>
//       <h1>{recipe.title}</h1>
//       <p>{recipe.description}</p>
//       {recipe.videoTutorialUrl ? (
//         <video src={recipe.videoTutorialUrl} controls />
//       ) : (
//         <p>No video available</p>
//       )}

//       <h2>Ingredients</h2>
//       <ul>
//         {/* تحقق من وجود recipe.ingredients قبل استخدام map */}
//         {recipe.ingredients && recipe.ingredients.length > 0 ? (
//           recipe.ingredients.map((ingredient, index) => (
//             <li key={index}>
//               {ingredient.name}: {ingredient.quantity} {ingredient.unit}
//             </li>
//           ))
//         ) : (
//           <p>No ingredients available.</p>
//         )}
//       </ul>

//       <h2>Instructions</h2>
//       <ol>
//         {/* تحقق من وجود recipe.instructions قبل استخدام map */}
//         {recipe.instructions && recipe.instructions.length > 0 ? (
//           recipe.instructions.map((step, index) => (
//             <li key={index}>{step}</li>
//           ))
//         ) : (
//           <p>No instructions available.</p>
//         )}
//       </ol>

//       <p>Cooking Time: {recipe.cookingTime} minutes</p>

//       <h3>Nutrition</h3>
//       <ul>
//         {/* تحقق من وجود recipe.nutrition قبل عرض المعلومات الغذائية */}
//         {recipe.nutrition ? (
//           <>
//             <li>Calories: {recipe.nutrition.calories}</li>
//             <li>Protein: {recipe.nutrition.protein}</li>
//             <li>Total Fats: {recipe.nutrition.TotalFats}</li>
//             <li>Carbs: {recipe.nutrition.carbs}</li>
//           </>
//         ) : (
//           <p>No nutrition information available.</p>
//         )}
//       </ul>

//       <p>Servings: {recipe.servings}</p>

//       {recipe.photos && recipe.photos.length > 0 && (
//         <div>
//           <h3>Photos</h3>
//           {recipe.photos.map((photo, index) => (
//             <img key={index} src={photo} alt={`Recipe Step ${index + 1}`} width="200" />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetailsPage;
//////////////////////////////////////////////////////////////////////////////////////////////
// import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RecipeDetailsPage = () => {
//   const { recipeId } = useParams();
//   console.log('Recipe ID:', recipeId);
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/recipe/get/${recipeId}`);
//         setRecipe(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [recipeId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!recipe) return <div>No recipe data available.</div>;

//   return (
//     <div>
//       <h1>{recipe.title}</h1>
//       <p>{recipe.description}</p>

//       <h2>Ingredients</h2>
//       {recipe.ingredients && recipe.ingredients.length > 0 ? (
//         <ul>
//           {recipe.ingredients.map((ingredient, index) => (
//             <li key={index}>{`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No ingredients available.</p>
//       )}

//       <h2>Instructions</h2>
//       {recipe.instructions && recipe.instructions.length > 0 ? (
//         <ol>
//           {recipe.instructions.map((instruction, index) => (
//             <li key={index}>{instruction}</li>
//           ))}
//         </ol>
//       ) : (
//         <p>No instructions available.</p>
//       )}

//       <h2>Cooking Time</h2>
//       <p>{recipe.cookingTime ? `${recipe.cookingTime} minutes` : 'Cooking time not available.'}</p>

//       <h2>Nutrition</h2>
//       {recipe.nutrition ? (
//         <ul>
//           <li>Calories: {recipe.nutrition.calories || 'N/A'}</li>
//           <li>Protein: {recipe.nutrition.protein || 'N/A'}</li>
//           <li>Total Fats: {recipe.nutrition.totalFats || 'N/A'}</li>
//           <li>Carbs: {recipe.nutrition.carbs || 'N/A'}</li>
//         </ul>
//       ) : (
//         <p>No nutrition information available.</p>
//       )}

//       <h2>Servings</h2>
//       <p>{recipe.servings || 'Servings information not available.'}</p>

//       <h2>Video Tutorial</h2>
//       {recipe.videoTutorialUrl ? (
//         <video controls>
//           <source src={recipe.videoTutorialUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <p>No video available.</p>
//       )}
//     </div>
//   );
// };

// export default RecipeDetailsPage;
//////////////////////////////////////////////////////////////
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RecipeDetailsPage = () => {
//   const { recipeId } = useParams();
//   console.log('Recipe ID:', recipeId);

//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (recipeId) {  // تأكد من أن recipeId موجود
//       const fetchRecipe = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/api/recipe/get/${recipeId}`);
//           setRecipe(response.data);
//         } catch (err) {
//           setError(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchRecipe();
//     } else {
//       setError(new Error('Recipe ID is missing'));
//       setLoading(false);
//     }
//   }, [recipeId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!recipe) return <div>No recipe data available.</div>;

//   return (
//     <div>
//       <h1>{recipe.title}</h1>
//       <p>{recipe.description}</p>

//       <h2>Ingredients</h2>
//       {recipe.ingredients && recipe.ingredients.length > 0 ? (
//         <ul>
//           {recipe.ingredients.map((ingredient, index) => (
//             <li key={index}>{`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No ingredients available.</p>
//       )}

// <h2>Instructions</h2>
// {recipe.instructions && recipe.instructions.length > 0 ? (
//   <ol>
//     {recipe.instructions.map((instruction, index) => (
//       <li key={index}>
//         <p>{instruction.stepText}</p>
//         {instruction.stepImage && (
//           <img
//             src={instruction.stepImage}
//             alt={`Step ${index + 1}`}
//             style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
//           />
//         )}
//       </li>
//     ))}
//   </ol>
// ) : (
//   <p>No instructions available.</p>
// )}

//       <h2>Cooking Time</h2>
//       <p>{recipe.cookingTime ? `${recipe.cookingTime} minutes` : 'Cooking time not available.'}</p>

//       <h2>Nutrition</h2>
//       {recipe.nutrition ? (
//         <ul>
//           <li>Calories: {recipe.nutrition.calories || 'N/A'}</li>
//           <li>Protein: {recipe.nutrition.protein || 'N/A'}</li>
//           <li>Total Fats: {recipe.nutrition.totalFats || 'N/A'}</li>
//           <li>Carbs: {recipe.nutrition.carbs || 'N/A'}</li>
//         </ul>
//       ) : (
//         <p>No nutrition information available.</p>
//       )}

//       <h2>Servings</h2>
//       <p>{recipe.servings || 'Servings information not available.'}</p>

//       <h2>Video Tutorial</h2>
//       {recipe.videoTutorialUrl ? (
//         <video controls>
//           <source src={recipe.videoTutorialUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <p>No video available.</p>
//       )}
//     </div>
//   );
// };

// export default RecipeDetailsPage;
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const RecipeDetailsPage = () => {
//   const { recipeId } = useParams();
//   console.log('Recipe ID:', recipeId);

//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isVideoSticky, setIsVideoSticky] = useState(false); // للتحكم في وضع الفيديو الثابت

//   useEffect(() => {
//     if (recipeId) {  // تأكد من أن recipeId موجود
//       const fetchRecipe = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/api/recipe/get/${recipeId}`);
//           setRecipe(response.data);
//         } catch (err) {
//           setError(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchRecipe();
//     } else {
//       setError(new Error('Recipe ID is missing'));
//       setLoading(false);
//     }

//     const handleScroll = () => {
//       if (window.scrollY > 300) {  // عندما يتم التمرير للأسفل بمقدار 300px
//         setIsVideoSticky(true);
//       } else {
//         setIsVideoSticky(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [recipeId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!recipe) return <div>No recipe data available.</div>;

//   return (
//     <div className="recipe-details-container">
//       <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
//       <p className="text-lg mb-4">{recipe.description}</p>

//       <div className="video-section mb-8">
//         {recipe.videoTutorialUrl ? (
//           <div className="flex justify-center">
//             <video
//               width={640}
//               height={360}
//               controls
//               className="rounded-lg shadow-lg w-full"
//             >
//               <source src={recipe.videoTutorialUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ) : (
//           <p>No video available.</p>
//         )}
//       </div>

//       <h2 className="text-2xl font-semibold mb-4 ">Ingredients</h2>
//       {recipe.ingredients && recipe.ingredients.length > 0 ? (
//         <ul className="list-disc ml-6 mb-8">
//           {recipe.ingredients.map((ingredient, index) => (
//             <li key={index} className="text-lg">
//               {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No ingredients available.</p>
//       )}

//       <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
//       {recipe.instructions && recipe.instructions.length > 0 ? (
//         <ol className="list-decimal ml-6 mb-8">
//           {recipe.instructions.map((instruction, index) => (
//             <li key={index} className="mb-6">
//               <p className="text-lg">{instruction.stepText}</p>
//               {instruction.stepImage && (
//                 <img
//                   src={instruction.stepImage}
//                   alt={`Step ${index + 1}`}
//                   className="rounded-lg shadow-lg mt-4"
//                   style={{ maxWidth: '100%', height: 'auto' }}
//                 />
//               )}
//             </li>
//           ))}
//         </ol>
//       ) : (
//         <p>No instructions available.</p>
//       )}

//       <h2 className="text-2xl font-semibold mb-4">Final Dish</h2>
//       {recipe.photos && recipe.photos.length > 0 && (
//         <div className="flex justify-center">
//           <img
//             src={recipe.photos[0]}
//             alt="Final Dish"
//             className="rounded-lg shadow-lg mt-4 transition-transform transform hover:scale-105"
//             style={{ maxWidth: '100%', height: 'auto' }}
//           />
//         </div>
//       )}

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Cooking Time</h2>
//         <p className="text-lg">{recipe.cookingTime ? `${recipe.cookingTime} minutes` : 'Cooking time not available.'}</p>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Nutrition</h2>
//         {recipe.nutrition ? (
//           <ul className="list-disc ml-6">
//             <li>Calories: {recipe.nutrition.calories || 'N/A'}</li>
//             <li>Protein: {recipe.nutrition.protein || 'N/A'}</li>
//             <li>Total Fats: {recipe.nutrition.totalFats || 'N/A'}</li>
//             <li>Carbs: {recipe.nutrition.carbs || 'N/A'}</li>
//           </ul>
//         ) : (
//           <p>No nutrition information available.</p>
//         )}
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Servings</h2>
//         <p className="text-lg">{recipe.servings || 'Servings information not available.'}</p>
//       </div>

//       {/* فيديو ثابت يظهر عند التمرير للأسفل */}
//       {isVideoSticky && recipe.videoTutorialUrl && (
//         <div className="fixed bottom-4 right-4 w-64 shadow-lg rounded-lg overflow-hidden">
//           <video
//             controls
//             className="w-full h-auto"
//           >
//             <source src={recipe.videoTutorialUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetailsPage;
// export default RecipeDetailsPage;
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../Components/ReviewForm";
import ReviewsList from "../Components/ReviewsList";

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  console.log("Recipe ID:", recipeId);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoSticky, setIsVideoSticky] = useState(false);

  // Fetch the recipe details when the component mounts
  useEffect(() => {
    if (recipeId) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/recipes/get/${recipeId}`
          );
          setRecipe(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    } else {
      setError(new Error("Recipe ID is missing"));
      setLoading(false);
    }

    const handleScroll = () => {
      setIsVideoSticky(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [recipeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!recipe) return <div>No recipe data available.</div>;

  return (
    <div className="recipe-details-container mx-4">
      <h1 className="text-4xl font-bold mt-32 mb-4 ml-24">{recipe.title}</h1>
      <p className="text-lg mb-6 ml-24">{recipe.description}</p>
      {/* Video Section */}
      <div className="video-section mb-8">
        {recipe.videoTutorialUrl ? (
          <div className="flex ml-24">
            <video
              width={800} // الحجم المعدل للفيديو
              height={400} // الارتفاع المعدل للفيديو
              controls
              className="rounded-lg shadow-lg"
            >
              <source src={recipe.videoTutorialUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p>No video available.</p>
        )}
      </div>
      {/* Ingredients Section */}
      <h2 className="text-2xl font-semibold mb-4 ml-24">Ingredients</h2>
      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <ul className="list-disc ml-24 mb-8 ">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-lg ml-24">
              {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available.</p>
      )}
      {/* Instructions Section */}
      <h2 className="text-2xl font-semibold mb-4 ml-24">Instructions</h2>
      {recipe.instructions && recipe.instructions.length > 0 ? (
        <ol className="list-decimal ml-24 mb-8">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="mb-6 ml-24">
              <p className="text-lg">{instruction.stepText}</p>
              {instruction.stepImage && (
                <img
                  src={instruction.stepImage}
                  alt={`Step ${index + 1}`}
                  className="rounded-lg shadow-lg mt-4 ml-24"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p>No instructions available.</p>
      )}
      {/* Final Dish Section */}
      <h2 className="text-2xl font-semibold mb-4 ml-24">Final Dish</h2>
      {recipe.photos && recipe.photos.length > 0 && (
        <div className="flex justify-center">
          <img
            src={recipe.photos[0]}
            alt="Final Dish"
            className="rounded-lg shadow-lg mt-4 transition-transform transform hover:scale-105"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
      {/* Additional Recipe Information */}
      <div className="mt-8 ml-24">
        <h2 className="text-2xl font-semibold">Cooking Time</h2>
        <p className="text-lg">
          {recipe.cookingTime
            ? `${recipe.cookingTime} minutes`
            : "Cooking time not available."}
        </p>
      </div>
      <div className="mt-8 ml-24">
        <h2 className="text-2xl font-semibold">Nutrition</h2>
        {recipe.nutrition ? (
          <ul className="list-disc ml-6">
            <li>Calories: {recipe.nutrition.calories || "N/A"}</li>
            <li>Protein: {recipe.nutrition.protein || "N/A"}</li>
            <li>Total Fats: {recipe.nutrition.totalFats || "N/A"}</li>
            <li>Carbs: {recipe.nutrition.carbs || "N/A"}</li>
          </ul>
        ) : (
          <p>No nutrition information available.</p>
        )}
      </div>
      <div className="mt-8 ml-24">
        <h2 className="text-2xl font-semibold">Servings</h2>
        <p className="text-lg">
          {recipe.servings || "Servings information not available."}
        </p>
      </div>
      {/* Review Form */}
      <div className="mt-8 ml-24">
        <h2 className="text-2xl font-semibold">Add Your Review</h2>
        <ReviewForm recipeId={recipeId} />
      </div>
      {/* Reviews List */}
      <div className="mt-8 ml-24">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <ReviewsList recipeId={recipeId} />
      </div>
      {isVideoSticky && recipe.videoTutorialUrl && (
        <div className="fixed bottom-4 right-4 w-80 shadow-lg rounded-lg overflow-hidden">
          <video controls className="w-[55rem] h-[20rem]">
            <source src={recipe.videoTutorialUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
