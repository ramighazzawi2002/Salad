
// import useRecipes from '../Hooks/useRecipes';
// import RecipeCard from '../Components/RecipeCard';

// const CatalogPage = () => {
//   const { recipes, loading, error } = useRecipes();

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching recipes: {error.message}</p>;

//   return (
//     <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
//       <div className="border-b mb-5 flex justify-between text-sm">
//         <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
//           {/* أيقونة عنوان الكتالوج */}
//           Recipes Catalog
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {recipes.map((recipe) => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CatalogPage;
// src/Pages/CatalogPage.js
// import { useState } from 'react';
// import useRecipes from '../Hooks/useRecipes';
// import useCategories from '../Hooks/useCategories';
// import RecipeCard from '../Components/RecipeCard';

// const CatalogPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const { recipes, loading: recipesLoading, error: recipesError } = useRecipes(selectedCategory);
//   const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

//   if (recipesLoading || categoriesLoading) return <p>Loading...</p>;
//   if (recipesError || categoriesError) return <p>Error: {recipesError?.message || categoriesError?.message}</p>;

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   return (
//     <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
//       <div className="border-b mb-5 flex justify-between text-sm">
//         <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
//           {/* أيقونة عنوان الكتالوج */}
//           Recipes Catalog
//         </div>
//       </div>
//       <div className="mb-5">
//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="border p-2 rounded"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {recipes.map((recipe) => (
//           <RecipeCard key={recipe._id} recipe={recipe} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CatalogPage;
// src/Pages/CatalogPage.js
import { useState } from 'react';
import useRecipes from '../Hooks/useRecipes';
import useCategories from '../Hooks/useCategories';
import RecipeCard from '../Components/RecipeCard';

const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // الاحتفاظ بالفئة المختارة
  const { recipes, loading: recipesLoading, error: recipesError } = useRecipes(selectedCategory); // تمرير الفئة المختارة إلى useRecipes
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  if (recipesLoading || categoriesLoading) return <p>Loading...</p>;
  if (recipesError || categoriesError) return <p>Error: {recipesError?.message || categoriesError?.message}</p>;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // تحديث الفئة المختارة عند التغيير
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
          Recipes Catalog
        </div>
      </div>
      <div className="mb-5">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
