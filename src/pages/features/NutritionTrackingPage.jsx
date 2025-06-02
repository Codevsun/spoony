import { useState } from 'react';
import { findRecipesByNutrients } from '../../services/spoonacularApi';

const NutritionTrackingPage = () => {
  const [smartRecipes, setSmartRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [loadingRecipeDetails, setLoadingRecipeDetails] = useState(false);
  const [customNutritionSearch, setCustomNutritionSearch] = useState({
    minCalories: '',
    maxCalories: '',
    minProtein: '',
    maxProtein: '',
    minCarbs: '',
    maxCarbs: '',
    minFat: '',
    maxFat: '',
  });

  // Search recipes with custom nutrition parameters
  const searchCustomNutrition = async () => {
    if (!validateSearchCriteria()) return;

    setLoadingRecipes(true);
    try {
      const params = {};
      Object.entries(customNutritionSearch).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          params[key] = parseFloat(value);
        }
      });

      if (Object.keys(params).length > 0) {
        const recipes = await findRecipesByNutrients(params);
        setSmartRecipes(recipes);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      // Show error toast/notification here
    } finally {
      setLoadingRecipes(false);
    }
  };

  const validateSearchCriteria = () => {
    // Validate min/max pairs
    const pairs = [
      ['minCalories', 'maxCalories'],
      ['minProtein', 'maxProtein'],
      ['minCarbs', 'maxCarbs'],
      ['minFat', 'maxFat'],
    ];

    for (const [min, max] of pairs) {
      const minVal = parseFloat(customNutritionSearch[min]);
      const maxVal = parseFloat(customNutritionSearch[max]);

      if (minVal && maxVal && minVal > maxVal) {
        alert(
          `Minimum ${min.replace('min', '')} cannot be greater than maximum`
        );
        return false;
      }
    }

    // Ensure at least one criteria is set
    const hasValue = Object.values(customNutritionSearch).some(
      val => val !== ''
    );
    if (!hasValue) {
      alert('Please set at least one search criteria');
      return false;
    }

    return true;
  };

  const handleCustomSearchChange = (field, value) => {
    // Only allow positive numbers
    if (value && value < 0) return;

    setCustomNutritionSearch(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearCustomSearch = () => {
    setCustomNutritionSearch({
      minCalories: '',
      maxCalories: '',
      minProtein: '',
      maxProtein: '',
      minCarbs: '',
      maxCarbs: '',
      minFat: '',
      maxFat: '',
    });
    setSmartRecipes([]);
  };

  // Handle recipe view
  const handleViewRecipe = async recipe => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
    setLoadingRecipeDetails(true);

    try {
      // Simulate fetching detailed recipe information
      // In a real app, you would fetch from your API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add mock detailed information to the recipe
      const detailedRecipe = {
        ...recipe,
        ingredients: [
          '2 cups fresh spinach leaves',
          '1 large ripe avocado, sliced',
          '1/2 cup cherry tomatoes, halved',
          '1/4 cup red onion, thinly sliced',
          '2 tablespoons olive oil',
          '1 tablespoon balsamic vinegar',
          'Salt and pepper to taste',
          '1/4 cup feta cheese, crumbled',
        ],
        instructions: [
          'Wash and dry the spinach leaves thoroughly.',
          'In a large bowl, combine spinach, cherry tomatoes, and red onion.',
          'In a small bowl, whisk together olive oil and balsamic vinegar.',
          'Add sliced avocado to the salad just before serving.',
          'Drizzle with dressing and season with salt and pepper.',
          'Top with crumbled feta cheese and serve immediately.',
        ],
        nutritionFacts: {
          calories: recipe.calories || 250,
          protein: recipe.protein || 8,
          carbs: recipe.carbs || 15,
          fat: recipe.fat || 20,
          fiber: 8,
          sugar: 6,
          sodium: 180,
          cholesterol: 15,
        },
        tags: ['Vegetarian', 'Gluten-Free', 'Low-Carb', 'Heart-Healthy'],
      };

      setSelectedRecipe(detailedRecipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoadingRecipeDetails(false);
    }
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipe(null);
  };

  // Recipe Detail Modal Component
  const RecipeModal = () => {
    if (!showRecipeModal || !selectedRecipe) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
          {/* Modal Header */}
          <div className='sticky top-0 bg-white border-b p-6 flex justify-between items-start'>
            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                {selectedRecipe.title}
              </h2>
              <div className='flex gap-2'>
                {selectedRecipe.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={closeRecipeModal}
              className='text-gray-400 hover:text-gray-600 text-2xl ml-4'
            >
              ×
            </button>
          </div>

          {loadingRecipeDetails ? (
            <div className='p-12 text-center'>
              <div className='inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#2D3648] border-t-transparent'></div>
              <p className='mt-4 text-gray-600'>Loading recipe details...</p>
            </div>
          ) : (
            <div className='p-6'>
              {/* Recipe Image and Basic Info */}
              <div className='grid md:grid-cols-2 gap-6 mb-6'>
                <div>
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className='w-full h-64 object-cover rounded-lg'
                  />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-4'>Recipe Info</h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Prep Time:</span>
                      <span className='font-medium'>
                        {selectedRecipe.readyInMinutes || 30} minutes
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Servings:</span>
                      <span className='font-medium'>
                        {selectedRecipe.servings || 2}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Difficulty:</span>
                      <span className='font-medium'>Easy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nutrition Facts */}
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-4'>
                  Nutrition Facts (per serving)
                </h3>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-blue-600'>
                        {selectedRecipe.nutritionFacts?.calories}
                      </div>
                      <div className='text-sm text-gray-600'>Calories</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-green-600'>
                        {selectedRecipe.nutritionFacts?.protein}g
                      </div>
                      <div className='text-sm text-gray-600'>Protein</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-orange-600'>
                        {selectedRecipe.nutritionFacts?.carbs}g
                      </div>
                      <div className='text-sm text-gray-600'>Carbs</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-red-600'>
                        {selectedRecipe.nutritionFacts?.fat}g
                      </div>
                      <div className='text-sm text-gray-600'>Fat</div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t'>
                    <div className='text-center'>
                      <div className='font-medium'>
                        {selectedRecipe.nutritionFacts?.fiber}g
                      </div>
                      <div className='text-xs text-gray-600'>Fiber</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-medium'>
                        {selectedRecipe.nutritionFacts?.sugar}g
                      </div>
                      <div className='text-xs text-gray-600'>Sugar</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-medium'>
                        {selectedRecipe.nutritionFacts?.sodium}mg
                      </div>
                      <div className='text-xs text-gray-600'>Sodium</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-medium'>
                        {selectedRecipe.nutritionFacts?.cholesterol}mg
                      </div>
                      <div className='text-xs text-gray-600'>Cholesterol</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients and Instructions */}
              <div className='grid md:grid-cols-2 gap-6'>
                {/* Ingredients */}
                <div>
                  <h3 className='text-lg font-semibold mb-4'>Ingredients</h3>
                  <ul className='space-y-2'>
                    {selectedRecipe.ingredients?.map((ingredient, index) => (
                      <li key={index} className='flex items-start gap-2'>
                        <span className='text-[#2D3648] mt-1'>•</span>
                        <span className='text-gray-700'>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className='text-lg font-semibold mb-4'>Instructions</h3>
                  <ol className='space-y-3'>
                    {selectedRecipe.instructions?.map((instruction, index) => (
                      <li key={index} className='flex gap-3'>
                        <span className='bg-[#2D3648] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5'>
                          {index + 1}
                        </span>
                        <span className='text-gray-700'>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='mt-8 flex gap-4 justify-center'>
                <button className='bg-[#2D3648] text-white px-6 py-3 rounded-lg hover:bg-[#1F2937] transition-colors'>
                  Save Recipe
                </button>
                <button className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors'>
                  Add to Meal Plan
                </button>
                <button className='border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  Share Recipe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          🔍 Custom Nutrition Search
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Search for recipes based on specific nutritional criteria. Set your
          desired ranges for calories, protein, carbs, and fat to find recipes
          that match your needs.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Custom Nutrition Search */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg border p-6 sticky top-24'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Search Criteria
            </h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Calories
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Min'
                      value={customNutritionSearch.minCalories}
                      onChange={e =>
                        handleCustomSearchChange('minCalories', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>kcal</span>
                    </div>
                  </div>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Max'
                      value={customNutritionSearch.maxCalories}
                      onChange={e =>
                        handleCustomSearchChange('maxCalories', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>kcal</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Protein
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Min'
                      value={customNutritionSearch.minProtein}
                      onChange={e =>
                        handleCustomSearchChange('minProtein', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>g</span>
                    </div>
                  </div>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Max'
                      value={customNutritionSearch.maxProtein}
                      onChange={e =>
                        handleCustomSearchChange('maxProtein', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>g</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Carbs
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Min'
                      value={customNutritionSearch.minCarbs}
                      onChange={e =>
                        handleCustomSearchChange('minCarbs', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>g</span>
                    </div>
                  </div>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Max'
                      value={customNutritionSearch.maxCarbs}
                      onChange={e =>
                        handleCustomSearchChange('maxCarbs', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>g</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Fat
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Min'
                      value={customNutritionSearch.minFat}
                      onChange={e =>
                        handleCustomSearchChange('minFat', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>g</span>
                    </div>
                  </div>
                  <div className='relative'>
                    <input
                      type='number'
                      placeholder='Max'
                      value={customNutritionSearch.maxFat}
                      onChange={e =>
                        handleCustomSearchChange('maxFat', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                      min='0'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span className='text-gray-400 text-xs'>g</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex gap-2 pt-4'>
                <button
                  onClick={searchCustomNutrition}
                  disabled={loadingRecipes}
                  className='flex-1 bg-[#2D3648] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#1F2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loadingRecipes ? (
                    <div className='flex items-center justify-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    'Search Recipes'
                  )}
                </button>
                <button
                  onClick={clearCustomSearch}
                  className='px-4 py-3 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-lg border p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-bold text-gray-900'>
                Search Results
              </h3>
              {smartRecipes.length > 0 && (
                <span className='text-sm text-gray-500'>
                  {smartRecipes.length} recipe
                  {smartRecipes.length !== 1 ? 's' : ''} found
                </span>
              )}
            </div>

            {loadingRecipes && (
              <div className='text-center py-12'>
                <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2D3648] border-t-transparent'></div>
                <p className='mt-4 text-gray-600'>
                  Finding the perfect recipes for you...
                </p>
              </div>
            )}

            {!loadingRecipes && smartRecipes.length === 0 && (
              <div className='text-center py-12 text-gray-500'>
                <div className='text-6xl mb-4'>🥗</div>
                <p className='text-lg font-medium mb-2'>
                  Ready to discover recipes?
                </p>
                <p className='text-sm max-w-md mx-auto'>
                  Set your nutritional preferences in the search panel and click
                  "Search Recipes" to find dishes that match your needs.
                </p>
              </div>
            )}

            <div className='grid grid-cols-1 gap-4'>
              {smartRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className='border rounded-lg p-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1'
                >
                  <div className='flex gap-4'>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className='w-24 h-24 object-cover rounded-lg flex-shrink-0'
                      loading='lazy'
                    />
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-gray-900 text-base line-clamp-2 mb-2 hover:text-[#2D3648] cursor-pointer'>
                        {recipe.title}
                      </h4>

                      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mb-4'>
                        <div className='bg-gray-50 p-2 rounded'>
                          <div className='text-xs text-gray-500'>Calories</div>
                          <div className='font-medium'>
                            {recipe.calories || 'N/A'}
                          </div>
                        </div>
                        <div className='bg-gray-50 p-2 rounded'>
                          <div className='text-xs text-gray-500'>Protein</div>
                          <div className='font-medium'>
                            {recipe.protein || 'N/A'}g
                          </div>
                        </div>
                        <div className='bg-gray-50 p-2 rounded'>
                          <div className='text-xs text-gray-500'>Carbs</div>
                          <div className='font-medium'>
                            {recipe.carbs || 'N/A'}g
                          </div>
                        </div>
                        <div className='bg-gray-50 p-2 rounded'>
                          <div className='text-xs text-gray-500'>Fat</div>
                          <div className='font-medium'>
                            {recipe.fat || 'N/A'}g
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                          {recipe.readyInMinutes && (
                            <span className='bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium'>
                              ⏱️ {recipe.readyInMinutes}min
                            </span>
                          )}
                          {recipe.servings && (
                            <span className='bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-medium'>
                              👥 {recipe.servings} servings
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleViewRecipe(recipe)}
                          className='text-sm bg-[#2D3648] text-white px-4 py-2 rounded-lg hover:bg-[#1F2937] transition-all duration-200 transform hover:scale-105'
                        >
                          View Recipe →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <RecipeModal />
    </div>
  );
};

export default NutritionTrackingPage;
