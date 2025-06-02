import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeInformation } from '../services/spoonacularApi';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const recipeData = await getRecipeInformation(parseInt(id));
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to load recipe details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleImageError = e => {
    e.target.src =
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
  };

  if (loading) {
    return (
      <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
        <div className='text-center py-12'>
          <div className='text-4xl mb-4'>⏳</div>
          <p className='text-gray-500 text-lg'>Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
        <div className='text-center py-12'>
          <div className='text-4xl mb-4'>😞</div>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Recipe Not Found
          </h1>
          <p className='text-gray-600 mb-8'>
            {error || "The recipe you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate('/recipes')}
            className='bg-[#2D3648] text-white px-6 py-3 rounded-lg hover:bg-[#1F2937] transition-colors'
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'ingredients', label: 'Ingredients', icon: '🛒' },
    { id: 'instructions', label: 'Instructions', icon: '👨‍🍳' },
    { id: 'nutrition', label: 'Nutrition', icon: '📊' },
  ];

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
        <Link to='/recipes' className='hover:text-gray-900'>
          Recipes
        </Link>
        <span>/</span>
        <span className='text-gray-900'>{recipe.title}</span>
      </nav>

      {/* Header Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        {/* Image */}
        <div className='relative'>
          <img
            src={recipe.image}
            alt={recipe.title}
            className='w-full h-80 lg:h-96 object-cover rounded-lg shadow-md'
            onError={handleImageError}
          />

          {/* Health Score Badge */}
          {recipe.healthScore > 0 && (
            <div className='absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md'>
              <span className='text-sm font-semibold text-green-600'>
                Health Score: {recipe.healthScore}
              </span>
            </div>
          )}
        </div>

        {/* Recipe Info */}
        <div>
          <h1 className='text-3xl lg:text-4xl space-grotesk-bold text-gray-900 mb-4'>
            {recipe.title}
          </h1>

          {/* Summary */}
          {recipe.summary && (
            <div
              className='text-gray-600 mb-6 leading-relaxed'
              dangerouslySetInnerHTML={{
                __html: recipe.summary.replace(/<[^>]*>/g, ''),
              }}
            />
          )}

          {/* Quick Stats */}
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <svg
                  className='w-5 h-5 text-gray-600'
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
                <span className='text-sm font-medium text-gray-600'>
                  Cook Time
                </span>
              </div>
              <span className='text-xl font-bold text-gray-900'>
                {recipe.readyInMinutes || 30} mins
              </span>
            </div>

            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <svg
                  className='w-5 h-5 text-gray-600'
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
                <span className='text-sm font-medium text-gray-600'>
                  Servings
                </span>
              </div>
              <span className='text-xl font-bold text-gray-900'>
                {recipe.servings || 4}
              </span>
            </div>

            {recipe.pricePerServing > 0 && (
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <svg
                    className='w-5 h-5 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                    />
                  </svg>
                  <span className='text-sm font-medium text-gray-600'>
                    Cost per Serving
                  </span>
                </div>
                <span className='text-xl font-bold text-gray-900'>
                  ${(recipe.pricePerServing / 100).toFixed(2)}
                </span>
              </div>
            )}

            {recipe.aggregateLikes > 0 && (
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <svg
                    className='w-5 h-5 text-red-500'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                  </svg>
                  <span className='text-sm font-medium text-gray-600'>
                    Likes
                  </span>
                </div>
                <span className='text-xl font-bold text-gray-900'>
                  {recipe.aggregateLikes}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className='space-y-3'>
            {/* Diet Tags */}
            {recipe.diets && recipe.diets.length > 0 && (
              <div>
                <span className='text-sm font-medium text-gray-600 block mb-2'>
                  Dietary:
                </span>
                <div className='flex flex-wrap gap-2'>
                  {recipe.diets.map((diet, index) => (
                    <span
                      key={index}
                      className='inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium'
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cuisine Tags */}
            {recipe.cuisines && recipe.cuisines.length > 0 && (
              <div>
                <span className='text-sm font-medium text-gray-600 block mb-2'>
                  Cuisine:
                </span>
                <div className='flex flex-wrap gap-2'>
                  {recipe.cuisines.map((cuisine, index) => (
                    <span
                      key={index}
                      className='inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium'
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dish Types */}
            {recipe.dishTypes && recipe.dishTypes.length > 0 && (
              <div>
                <span className='text-sm font-medium text-gray-600 block mb-2'>
                  Dish Type:
                </span>
                <div className='flex flex-wrap gap-2'>
                  {recipe.dishTypes.map((type, index) => (
                    <span
                      key={index}
                      className='inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium'
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='border-b border-gray-200 mb-8'>
        <nav className='flex space-x-8'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#2D3648] text-[#2D3648]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className='mr-2'>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mb-8'>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className='space-y-6'>
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                Recipe Overview
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <span className='font-medium text-gray-700'>Ready in:</span>
                    <span className='ml-2 text-gray-900'>
                      {recipe.readyInMinutes || 30} minutes
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-gray-700'>Servings:</span>
                    <span className='ml-2 text-gray-900'>
                      {recipe.servings || 4}
                    </span>
                  </div>
                  {recipe.creditsText && (
                    <div>
                      <span className='font-medium text-gray-700'>Source:</span>
                      <span className='ml-2 text-gray-900'>
                        {recipe.creditsText}
                      </span>
                    </div>
                  )}
                </div>
                <div className='space-y-4'>
                  {recipe.healthScore > 0 && (
                    <div>
                      <span className='font-medium text-gray-700'>
                        Health Score:
                      </span>
                      <span className='ml-2 text-gray-900'>
                        {recipe.healthScore}/100
                      </span>
                    </div>
                  )}
                  {recipe.spoonacularScore && (
                    <div>
                      <span className='font-medium text-gray-700'>
                        Popularity Score:
                      </span>
                      <span className='ml-2 text-gray-900'>
                        {Math.round(recipe.spoonacularScore)}/100
                      </span>
                    </div>
                  )}
                  {recipe.pricePerServing > 0 && (
                    <div>
                      <span className='font-medium text-gray-700'>
                        Cost per serving:
                      </span>
                      <span className='ml-2 text-gray-900'>
                        ${(recipe.pricePerServing / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === 'ingredients' && (
          <div>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Ingredients
            </h3>
            {recipe.extendedIngredients &&
            recipe.extendedIngredients.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'
                  >
                    <div className='flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-medium text-gray-600'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium text-gray-900'>
                        {ingredient.name}
                      </div>
                      <div className='text-sm text-gray-600'>
                        {ingredient.amount} {ingredient.unit}
                        {ingredient.original &&
                          ingredient.original !==
                            `${ingredient.amount} ${ingredient.unit} ${ingredient.name}` && (
                            <span className='ml-1'>
                              • {ingredient.original}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                <div className='text-2xl mb-2'>📝</div>
                <p>Ingredients list not available for this recipe.</p>
              </div>
            )}
          </div>
        )}

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Instructions
            </h3>
            {recipe.analyzedInstructions &&
            recipe.analyzedInstructions.length > 0 &&
            recipe.analyzedInstructions[0].steps ? (
              <div className='space-y-4'>
                {recipe.analyzedInstructions[0].steps.map((step, index) => (
                  <div
                    key={index}
                    className='flex space-x-4 p-4 bg-gray-50 rounded-lg'
                  >
                    <div className='flex-shrink-0 w-8 h-8 bg-[#2D3648] text-white rounded-full flex items-center justify-center text-sm font-bold'>
                      {step.number}
                    </div>
                    <div className='flex-1'>
                      <p className='text-gray-900'>{step.step}</p>
                      {step.ingredients && step.ingredients.length > 0 && (
                        <div className='mt-2'>
                          <span className='text-sm font-medium text-gray-600'>
                            Ingredients:{' '}
                          </span>
                          <span className='text-sm text-gray-600'>
                            {step.ingredients.map(ing => ing.name).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : recipe.instructions ? (
              <div className='prose max-w-none'>
                <div
                  className='text-gray-900 leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html: recipe.instructions.replace(/<[^>]*>/g, ''),
                  }}
                />
              </div>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                <div className='text-2xl mb-2'>👨‍🍳</div>
                <p>Instructions not available for this recipe.</p>
              </div>
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' && (
          <div>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>
              Nutrition Information
            </h3>
            {recipe.nutrition && recipe.nutrition.nutrients ? (
              <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
                  {recipe.nutrition.nutrients
                    .slice(0, 9)
                    .map((nutrient, index) => (
                      <div key={index} className='bg-gray-50 rounded-lg p-4'>
                        <div className='text-sm font-medium text-gray-600 mb-1'>
                          {nutrient.name}
                        </div>
                        <div className='text-lg font-bold text-gray-900'>
                          {nutrient.amount.toFixed(1)} {nutrient.unit}
                        </div>
                        {nutrient.percentOfDailyNeeds && (
                          <div className='text-xs text-gray-500'>
                            {nutrient.percentOfDailyNeeds.toFixed(0)}% Daily
                            Value
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {recipe.nutrition.properties && (
                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3'>
                      Properties
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {recipe.nutrition.properties.map((property, index) => (
                        <div
                          key={index}
                          className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'
                        >
                          <span className='font-medium text-gray-700'>
                            {property.name}
                          </span>
                          <span className='text-gray-900'>
                            {property.amount} {property.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                <div className='text-2xl mb-2'>📊</div>
                <p>Nutrition information not available for this recipe.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <button
          onClick={() => navigate('/recipes')}
          className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
        >
          ← Back to Recipes
        </button>

        {recipe.sourceUrl && (
          <a
            href={recipe.sourceUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='px-6 py-3 bg-[#2D3648] text-white rounded-lg hover:bg-[#1F2937] transition-colors text-center'
          >
            View Original Recipe →
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
