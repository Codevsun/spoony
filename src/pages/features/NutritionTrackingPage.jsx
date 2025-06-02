import { useState, useEffect } from 'react';
import {
  findRecipesByNutrients,
  calculateNutritionalGaps,
} from '../../services/spoonacularApi';

const NutritionTrackingPage = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67,
  });

  const [smartRecipes, setSmartRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
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

  const [todaysMeals] = useState([
    {
      id: 1,
      name: 'Avocado Toast',
      type: 'breakfast',
      calories: 320,
      protein: 12,
      carbs: 35,
      fat: 18,
      fiber: 8,
      sugar: 3,
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      type: 'lunch',
      calories: 450,
      protein: 35,
      carbs: 15,
      fat: 28,
      fiber: 6,
      sugar: 8,
    },
    {
      id: 3,
      name: 'Greek Yogurt with Berries',
      type: 'snack',
      calories: 180,
      protein: 15,
      carbs: 25,
      fat: 3,
      fiber: 4,
      sugar: 18,
    },
  ]);

  const calculateTotals = () => {
    return todaysMeals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat,
        fiber: totals.fiber + meal.fiber,
        sugar: totals.sugar + meal.sugar,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
  };

  const totals = calculateTotals();

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  // Load smart recipes based on nutritional gaps
  const loadSmartRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const { nutritionParams } = calculateNutritionalGaps(dailyGoals, totals);

      if (Object.keys(nutritionParams).length > 0) {
        const recipes = await findRecipesByNutrients(nutritionParams);
        setSmartRecipes(recipes.slice(0, 6)); // Limit to 6 recipes
      } else {
        // If no specific gaps, show general healthy recipes
        const generalParams = {
          minProtein: 10,
          maxCalories: 600,
          minFat: 5,
        };
        const recipes = await findRecipesByNutrients(generalParams);
        setSmartRecipes(recipes.slice(0, 6));
      }
    } catch (error) {
      console.error('Error loading smart recipes:', error);
      setSmartRecipes([]);
    } finally {
      setLoadingRecipes(false);
    }
  };

  // Search recipes with custom nutrition parameters
  const searchCustomNutrition = async () => {
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
    } finally {
      setLoadingRecipes(false);
    }
  };

  const handleCustomSearchChange = (field, value) => {
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
  };

  // Load smart recipes when component mounts or totals change
  useEffect(() => {
    loadSmartRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          📊 Nutrition Tracking
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Monitor your daily nutrition intake, set personalized goals, and get
          smart recipe recommendations tailored to your nutritional needs.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Daily Overview */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Date Selector */}
          <div className='bg-white rounded-lg border p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold text-gray-900'>
                Daily Overview
              </h2>
              <input
                type='date'
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
              />
            </div>

            {/* Macros Progress */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div className='relative w-20 h-20 mx-auto mb-2'>
                  <svg
                    className='w-20 h-20 transform -rotate-90'
                    viewBox='0 0 36 36'
                  >
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#eee'
                      strokeWidth='3'
                    />
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#3b82f6'
                      strokeWidth='3'
                      strokeDasharray={`${getProgressPercentage(totals.calories, dailyGoals.calories)}, 100`}
                    />
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-xs font-medium'>
                      {Math.round(
                        getProgressPercentage(
                          totals.calories,
                          dailyGoals.calories
                        )
                      )}
                      %
                    </span>
                  </div>
                </div>
                <p className='text-sm font-medium text-gray-900'>Calories</p>
                <p className='text-xs text-gray-600'>
                  {totals.calories} / {dailyGoals.calories}
                </p>
              </div>

              <div className='text-center'>
                <div className='relative w-20 h-20 mx-auto mb-2'>
                  <svg
                    className='w-20 h-20 transform -rotate-90'
                    viewBox='0 0 36 36'
                  >
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#eee'
                      strokeWidth='3'
                    />
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#10b981'
                      strokeWidth='3'
                      strokeDasharray={`${getProgressPercentage(totals.protein, dailyGoals.protein)}, 100`}
                    />
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-xs font-medium'>
                      {Math.round(
                        getProgressPercentage(
                          totals.protein,
                          dailyGoals.protein
                        )
                      )}
                      %
                    </span>
                  </div>
                </div>
                <p className='text-sm font-medium text-gray-900'>Protein</p>
                <p className='text-xs text-gray-600'>
                  {totals.protein}g / {dailyGoals.protein}g
                </p>
              </div>

              <div className='text-center'>
                <div className='relative w-20 h-20 mx-auto mb-2'>
                  <svg
                    className='w-20 h-20 transform -rotate-90'
                    viewBox='0 0 36 36'
                  >
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#eee'
                      strokeWidth='3'
                    />
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#f59e0b'
                      strokeWidth='3'
                      strokeDasharray={`${getProgressPercentage(totals.carbs, dailyGoals.carbs)}, 100`}
                    />
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-xs font-medium'>
                      {Math.round(
                        getProgressPercentage(totals.carbs, dailyGoals.carbs)
                      )}
                      %
                    </span>
                  </div>
                </div>
                <p className='text-sm font-medium text-gray-900'>Carbs</p>
                <p className='text-xs text-gray-600'>
                  {totals.carbs}g / {dailyGoals.carbs}g
                </p>
              </div>

              <div className='text-center'>
                <div className='relative w-20 h-20 mx-auto mb-2'>
                  <svg
                    className='w-20 h-20 transform -rotate-90'
                    viewBox='0 0 36 36'
                  >
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#eee'
                      strokeWidth='3'
                    />
                    <path
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#ef4444'
                      strokeWidth='3'
                      strokeDasharray={`${getProgressPercentage(totals.fat, dailyGoals.fat)}, 100`}
                    />
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-xs font-medium'>
                      {Math.round(
                        getProgressPercentage(totals.fat, dailyGoals.fat)
                      )}
                      %
                    </span>
                  </div>
                </div>
                <p className='text-sm font-medium text-gray-900'>Fat</p>
                <p className='text-xs text-gray-600'>
                  {totals.fat}g / {dailyGoals.fat}g
                </p>
              </div>
            </div>

            {/* Nutritional Gaps */}
            <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
              <h3 className='font-medium text-gray-900 mb-2'>
                🎯 Remaining for Today
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                <div>
                  <span className='text-gray-600'>Calories:</span>
                  <span className='ml-1 font-medium'>
                    {Math.max(0, dailyGoals.calories - totals.calories)}
                  </span>
                </div>
                <div>
                  <span className='text-gray-600'>Protein:</span>
                  <span className='ml-1 font-medium'>
                    {Math.max(0, dailyGoals.protein - totals.protein)}g
                  </span>
                </div>
                <div>
                  <span className='text-gray-600'>Carbs:</span>
                  <span className='ml-1 font-medium'>
                    {Math.max(0, dailyGoals.carbs - totals.carbs)}g
                  </span>
                </div>
                <div>
                  <span className='text-gray-600'>Fat:</span>
                  <span className='ml-1 font-medium'>
                    {Math.max(0, dailyGoals.fat - totals.fat)}g
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Meals */}
          <div className='bg-white rounded-lg border p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-bold text-gray-900'>Today's Meals</h3>
              <button className='bg-[#2D3648] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1F2937] transition-colors'>
                Add Meal
              </button>
            </div>

            <div className='space-y-3'>
              {todaysMeals.map(meal => (
                <div
                  key={meal.id}
                  className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'
                >
                  <div>
                    <p className='font-medium text-gray-900'>{meal.name}</p>
                    <p className='text-sm text-gray-600 capitalize'>
                      {meal.type}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-gray-900'>
                      {meal.calories} cal
                    </p>
                    <p className='text-xs text-gray-600'>
                      P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {todaysMeals.length === 0 && (
              <div className='text-center py-8 text-gray-500'>
                <p>No meals logged for today.</p>
                <p className='text-sm'>Start by adding your first meal!</p>
              </div>
            )}
          </div>

          {/* Additional Nutrients */}
          <div className='bg-white rounded-lg border p-6'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Additional Nutrients
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-gray-700'>Fiber</p>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-green-500 h-2 rounded-full'
                      style={{
                        width: `${Math.min((totals.fiber / 25) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span className='text-sm text-gray-600'>
                    {totals.fiber}g / 25g
                  </span>
                </div>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-700'>Sugar</p>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-orange-500 h-2 rounded-full'
                      style={{
                        width: `${Math.min((totals.sugar / 50) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span className='text-sm text-gray-600'>
                    {totals.sugar}g / 50g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Goals Settings */}
          <div className='bg-white rounded-lg border p-6'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Daily Goals
            </h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Calories
                </label>
                <input
                  type='number'
                  value={dailyGoals.calories}
                  onChange={e =>
                    setDailyGoals({
                      ...dailyGoals,
                      calories: parseInt(e.target.value),
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Protein (g)
                </label>
                <input
                  type='number'
                  value={dailyGoals.protein}
                  onChange={e =>
                    setDailyGoals({
                      ...dailyGoals,
                      protein: parseInt(e.target.value),
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Carbs (g)
                </label>
                <input
                  type='number'
                  value={dailyGoals.carbs}
                  onChange={e =>
                    setDailyGoals({
                      ...dailyGoals,
                      carbs: parseInt(e.target.value),
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Fat (g)
                </label>
                <input
                  type='number'
                  value={dailyGoals.fat}
                  onChange={e =>
                    setDailyGoals({
                      ...dailyGoals,
                      fat: parseInt(e.target.value),
                    })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <button
                onClick={loadSmartRecipes}
                className='w-full bg-[#2D3648] text-white py-2 rounded text-sm hover:bg-[#1F2937] transition-colors'
              >
                Update Recipe Suggestions
              </button>
            </div>
          </div>

          {/* Custom Nutrition Search */}
          <div className='bg-white rounded-lg border p-6'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              🔍 Custom Nutrition Search
            </h3>
            <div className='space-y-3'>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='number'
                  placeholder='Min Calories'
                  value={customNutritionSearch.minCalories}
                  onChange={e =>
                    handleCustomSearchChange('minCalories', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
                <input
                  type='number'
                  placeholder='Max Calories'
                  value={customNutritionSearch.maxCalories}
                  onChange={e =>
                    handleCustomSearchChange('maxCalories', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='number'
                  placeholder='Min Protein (g)'
                  value={customNutritionSearch.minProtein}
                  onChange={e =>
                    handleCustomSearchChange('minProtein', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
                <input
                  type='number'
                  placeholder='Max Protein (g)'
                  value={customNutritionSearch.maxProtein}
                  onChange={e =>
                    handleCustomSearchChange('maxProtein', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='number'
                  placeholder='Min Carbs (g)'
                  value={customNutritionSearch.minCarbs}
                  onChange={e =>
                    handleCustomSearchChange('minCarbs', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
                <input
                  type='number'
                  placeholder='Max Carbs (g)'
                  value={customNutritionSearch.maxCarbs}
                  onChange={e =>
                    handleCustomSearchChange('maxCarbs', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <input
                  type='number'
                  placeholder='Min Fat (g)'
                  value={customNutritionSearch.minFat}
                  onChange={e =>
                    handleCustomSearchChange('minFat', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
                <input
                  type='number'
                  placeholder='Max Fat (g)'
                  value={customNutritionSearch.maxFat}
                  onChange={e =>
                    handleCustomSearchChange('maxFat', e.target.value)
                  }
                  className='px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#2D3648] focus:border-transparent'
                />
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={searchCustomNutrition}
                  className='flex-1 bg-[#2D3648] text-white py-2 rounded text-xs hover:bg-[#1F2937] transition-colors'
                >
                  Search
                </button>
                <button
                  onClick={clearCustomSearch}
                  className='px-3 py-2 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50 transition-colors'
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Smart Recipe Recommendations */}
          <div className='bg-white rounded-lg border p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-bold text-gray-900'>
                🧠 Smart Recommendations
              </h3>
              {loadingRecipes && (
                <div className='text-sm text-gray-500'>Loading...</div>
              )}
            </div>

            {!loadingRecipes && smartRecipes.length === 0 && (
              <div className='text-center py-4 text-gray-500'>
                <p className='text-sm'>
                  No recipes found. Try adjusting your search criteria or check
                  your API key.
                </p>
              </div>
            )}

            <div className='space-y-3'>
              {smartRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className='border rounded-lg p-3 hover:shadow-md transition-shadow'
                >
                  <div className='flex gap-3'>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className='w-16 h-16 object-cover rounded-lg'
                    />
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-900 text-sm line-clamp-2'>
                        {recipe.title}
                      </h4>
                      <p className='text-xs text-gray-600 mb-2'>
                        {recipe.calories} cal | {recipe.protein}g protein |{' '}
                        {recipe.carbs}g carbs | {recipe.fat}g fat
                      </p>
                      <div className='flex items-center justify-between'>
                        <div className='flex gap-2 text-xs'>
                          {recipe.readyInMinutes && (
                            <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                              {recipe.readyInMinutes}min
                            </span>
                          )}
                          {recipe.servings && (
                            <span className='bg-green-100 text-green-700 px-2 py-1 rounded'>
                              {recipe.servings} servings
                            </span>
                          )}
                        </div>
                        <button className='text-xs bg-[#2D3648] text-white px-2 py-1 rounded hover:bg-[#1F2937] transition-colors'>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className='bg-[#d8ecde] rounded-lg p-6'>
            <h3 className='font-medium text-gray-900 mb-3'>
              💡 Nutrition Tips
            </h3>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Aim for 25-35g of fiber daily</li>
              <li>• Include protein in every meal</li>
              <li>• Stay hydrated with 8+ glasses of water</li>
              <li>• Balance your macronutrients throughout the day</li>
              <li>• Use our smart recommendations to fill nutritional gaps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTrackingPage;
