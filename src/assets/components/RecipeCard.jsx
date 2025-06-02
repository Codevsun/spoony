import { useNavigate } from 'react-router-dom';

const RecipeCard = ({
  recipe,
  onClick,
  showCompatibility = false,
  showPrice = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    } else {
      navigate('/recipes');
    }
  };

  const handleImageError = e => {
    e.target.src =
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
  };

  // Normalize recipe data from different API sources
  const normalizedRecipe = {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes || recipe.cookingMinutes || 30,
    servings: recipe.servings || 4,
    healthScore: recipe.healthScore || recipe.spoonacularScore || 0,
    aggregateLikes: recipe.aggregateLikes || recipe.likes || 0,
    dishTypes: recipe.dishTypes || [],
    cuisines: recipe.cuisines || [],
    diets: recipe.diets || [],
    pricePerServing: recipe.pricePerServing || 0,
    usedIngredients: recipe.usedIngredients || [],
    missedIngredients: recipe.missedIngredients || [],
    compatibility: recipe.compatibility || 0,
  };

  return (
    <div
      className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer border border-gray-200'
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className='relative h-40 overflow-hidden'>
        <img
          src={normalizedRecipe.image}
          alt={normalizedRecipe.title}
          className='w-full h-full object-cover'
          onError={handleImageError}
        />

        {/* Health Score Badge - Top Right */}
        {normalizedRecipe.healthScore > 0 && (
          <div className='absolute top-3 right-3 bg-white rounded-md px-2 py-1 shadow-sm'>
            <span className='text-sm font-semibold text-green-600'>
              Health: {normalizedRecipe.healthScore}
            </span>
          </div>
        )}

        {/* Compatibility Badge - Top Left */}
        {showCompatibility && normalizedRecipe.compatibility > 0 && (
          <div className='absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md'>
            <span className='text-sm font-semibold'>
              {normalizedRecipe.compatibility}% match
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='p-4'>
        {/* Title */}
        <h3 className='text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight'>
          {normalizedRecipe.title}
        </h3>

        {/* Metadata Row */}
        <div className='flex items-center gap-4 text-sm text-gray-600 mb-3'>
          <span className='flex items-center gap-1'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            {normalizedRecipe.readyInMinutes} mins
          </span>
          <span className='flex items-center gap-1'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            {normalizedRecipe.servings} servings
          </span>
          {normalizedRecipe.aggregateLikes > 0 && (
            <span className='flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
              </svg>
              {normalizedRecipe.aggregateLikes}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-1 mb-3'>
          {/* Diet tags */}
          {normalizedRecipe.diets.slice(0, 2).map((diet, index) => (
            <span
              key={`diet-${index}`}
              className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium'
            >
              {diet}
            </span>
          ))}

          {/* Cuisine tags */}
          {normalizedRecipe.cuisines.slice(0, 1).map((cuisine, index) => (
            <span
              key={`cuisine-${index}`}
              className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium'
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Ingredient Match Info */}
        {showCompatibility &&
          (normalizedRecipe.usedIngredients?.length > 0 ||
            normalizedRecipe.missedIngredients?.length > 0) && (
            <div className='text-sm mb-3'>
              {normalizedRecipe.usedIngredients?.length > 0 && (
                <div className='text-green-700 mb-1'>
                  ✓ Uses {normalizedRecipe.usedIngredients.length} of your
                  ingredients
                </div>
              )}
              {normalizedRecipe.missedIngredients?.length > 0 && (
                <div className='text-orange-600'>
                  Need {normalizedRecipe.missedIngredients.length} more
                  ingredients
                </div>
              )}
            </div>
          )}

        {/* Bottom Row */}
        <div className='flex items-center justify-between'>
          {/* Price */}
          {showPrice && normalizedRecipe.pricePerServing > 0 ? (
            <span className='text-sm font-semibold text-gray-900'>
              ${(normalizedRecipe.pricePerServing / 100).toFixed(2)}/serving
            </span>
          ) : (
            <div></div>
          )}

          {/* View Recipe Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              handleClick();
            }}
            className='bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors'
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
