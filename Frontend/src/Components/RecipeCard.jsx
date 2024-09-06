import { Link } from "react-router-dom"; // تأكد من أنك تستخدم React Router

const RecipeCard = ({ recipe }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <div className="relative">
        <img className="w-full" src={recipe.photos[0]} alt={recipe.title} />
        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
          <Link
            to={`/recipe/${recipe._id}`} // رابط إلى صفحة التفاصيل باستخدام معرف الوصفة
            className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            Cook
          </Link>
        </div>
      </div>
      <div className="px-6 py-4 mb-auto">
        {recipe.title}
        <p className="text-gray-500 text-sm">{recipe.description}</p>
      </div>
      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          {/* أيقونة وقت التحضير */}
          Prep Time: {recipe.cookingTime}min
        </span>
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          {/* أيقونة نوع المطبخ */}
          Cuisine: {recipe.cuisineType}
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;
