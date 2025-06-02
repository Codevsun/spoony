import { useState } from 'react';
import { findRecipesByIngredients } from '../../services/spoonacularApi';
import RecipeCard from '../../components/RecipeCard';

const IngredientMatchPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const commonIngredients = [
    'chicken',
    'beef',
    'pork',
    'fish',
    'eggs',
    'milk',
    'cheese',
    'butter',
    'onion',
    'garlic',
    'tomato',
    'potato',
    'carrot',
    'broccoli',
    'spinach',
    'rice',
    'pasta',
    'bread',
    'flour',
    'sugar',
    'salt',
    'pepper',
    'olive oil',
  ];

  const handleAddIngredient = ingredient => {
    if (!selectedIngredients.includes(ingredient)) {
      const newSelected = [...selectedIngredients, ingredient];
      setSelectedIngredients(newSelected);
      if (newSelected.length >= 2) {
        // Only search when we have at least 2 ingredients
        searchRecipesByIngredients(newSelected);
      }
    }
  };

  const handleRemoveIngredient = ingredient => {
    const newSelected = selectedIngredients.filter(item => item !== ingredient);
    setSelectedIngredients(newSelected);
    if (newSelected.length >= 2) {
      searchRecipesByIngredients(newSelected);
    } else {
      setMatchedRecipes([]);
    }
  };

  const handleInputKeyPress = e => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleAddIngredient(inputValue.trim().toLowerCase());
      setInputValue('');
    }
  };

  const searchRecipesByIngredients = async ingredients => {
    setLoadingRecipes(true);
    try {
      const recipes = await findRecipesByIngredients(ingredients, 12);

      // Process recipes to add match information
      const processedRecipes = recipes.map(recipe => {
        const usedIngredients = recipe.usedIngredients || [];
        const missedIngredients = recipe.missedIngredients || [];
        const totalIngredients =
          usedIngredients.length + missedIngredients.length;

        return {
          ...recipe,
          matchCount: usedIngredients.length,
          totalIngredients: totalIngredients,
          matchPercentage:
            totalIngredients > 0
              ? Math.round((usedIngredients.length / totalIngredients) * 100)
              : 0,
          usedIngredientNames: usedIngredients.map(ing => ing.name),
          missedIngredientNames: missedIngredients.map(ing => ing.name),
        };
      });

      // Sort by match count and then by match percentage
      const sortedRecipes = processedRecipes.sort((a, b) => {
        if (a.matchCount !== b.matchCount) {
          return b.matchCount - a.matchCount;
        }
        return b.matchPercentage - a.matchPercentage;
      });

      setMatchedRecipes(sortedRecipes);
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error);
      setMatchedRecipes([]);
    } finally {
      setLoadingRecipes(false);
    }
  };

  const getMatchPercentage = recipe => {
    return recipe.matchPercentage || 0;
  };

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          🔍 Smart Ingredient Match
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Enter the ingredients you have at home, and we'll find the perfect
          recipes that make the most of what you've got. Reduce waste and
          discover new dishes powered by real recipe data!
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Ingredient Selection */}
        <div className='space-y-6'>
          <div>
            <h2 className='text-2xl space-grotesk-bold text-gray-900 mb-4'>
              Your Ingredients
            </h2>

            {/* Custom Input */}
            <div className='mb-4'>
              <input
                type='text'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleInputKeyPress}
                placeholder='Type an ingredient and press Enter...'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
              />
            </div>

            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className='mb-6'>
                <h3 className='text-sm font-medium text-gray-700 mb-3'>
                  Selected Ingredients:
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {selectedIngredients.map(ingredient => (
                    <span
                      key={ingredient}
                      className='inline-flex items-center gap-2 bg-[#2D3648] text-white px-3 py-1 rounded-full text-sm'
                    >
                      {ingredient}
                      <button
                        onClick={() => handleRemoveIngredient(ingredient)}
                        className='hover:bg-white hover:text-[#2D3648] rounded-full w-4 h-4 flex items-center justify-center text-xs transition-colors'
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedIngredients([]);
                    setMatchedRecipes([]);
                  }}
                  className='mt-3 text-sm text-gray-500 hover:text-gray-700 underline'
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Common Ingredients */}
            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>
                Common Ingredients:
              </h3>
              <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                {commonIngredients.map(ingredient => (
                  <button
                    key={ingredient}
                    onClick={() => handleAddIngredient(ingredient)}
                    disabled={selectedIngredients.includes(ingredient)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      selectedIngredients.includes(ingredient)
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-[#FFE3E3] hover:border-[#2D3648]'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className='bg-[#d8ecde] rounded-lg p-6'>
            <h3 className='font-medium text-gray-900 mb-3'>💡 Pro Tips</h3>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Add your main protein first for better matches</li>
              <li>• Include basic seasonings like salt, pepper, and garlic</li>
              <li>• Need at least 2 ingredients to see recipe suggestions</li>
              <li>
                • The more ingredients you add, the more specific your matches
              </li>
              <li>
                • Don't forget about pantry staples like rice, pasta, or bread
              </li>
            </ul>
          </div>
        </div>

        {/* Recipe Results */}
        <div>
          <h2 className='text-2xl space-grotesk-bold text-gray-900 mb-4'>
            Recipe Matches
            {matchedRecipes.length > 0 && (
              <span className='text-lg font-normal text-gray-600 ml-2'>
                ({matchedRecipes.length} found)
              </span>
            )}
            {loadingRecipes && (
              <span className='text-lg font-normal text-gray-600 ml-2'>
                (Loading...)
              </span>
            )}
          </h2>

          {selectedIngredients.length === 0 ? (
            <div className='text-center py-12 bg-gray-50 rounded-lg'>
              <div className='text-4xl mb-4'>🥘</div>
              <p className='text-gray-500'>
                Start adding ingredients to see recipe matches!
              </p>
            </div>
          ) : selectedIngredients.length < 2 ? (
            <div className='text-center py-12 bg-gray-50 rounded-lg'>
              <div className='text-4xl mb-4'>🔍</div>
              <p className='text-gray-500 mb-2'>
                Add at least 2 ingredients to see recipe suggestions.
              </p>
              <p className='text-sm text-gray-400'>
                The more ingredients you add, the better the matches!
              </p>
            </div>
          ) : loadingRecipes ? (
            <div className='text-center py-12 bg-gray-50 rounded-lg'>
              <div className='text-4xl mb-4'>⏳</div>
              <p className='text-gray-500'>
                Searching for recipes with your ingredients...
              </p>
            </div>
          ) : matchedRecipes.length === 0 ? (
            <div className='text-center py-12 bg-gray-50 rounded-lg'>
              <div className='text-4xl mb-4'>🔍</div>
              <p className='text-gray-500 mb-2'>
                No recipes found with your current ingredients.
              </p>
              <p className='text-sm text-gray-400'>
                Try adding more common ingredients or check our full recipe
                library.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {matchedRecipes.map(recipe => {
                // Add compatibility percentage and ingredient info to recipe object
                const enhancedRecipe = {
                  ...recipe,
                  compatibility: getMatchPercentage(recipe),
                  usedIngredients: recipe.usedIngredients || [],
                  missedIngredients: recipe.missedIngredients || [],
                };

                return (
                  <RecipeCard
                    key={recipe.id}
                    recipe={enhancedRecipe}
                    showCompatibility={true}
                    showPrice={false}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientMatchPage;
