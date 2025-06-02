const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

// Fallback sample data for when API is not available
const SAMPLE_RECIPES = [
  {
    id: 1,
    title: 'Classic Beef Lasagna',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400',
    readyInMinutes: 90,
    servings: 8,
    healthScore: 72,
    aggregateLikes: 234,
    dishTypes: ['dinner', 'main course'],
    cuisines: ['Italian'],
    diets: [],
    pricePerServing: 295,
    summary: 'Rich, hearty lasagna with layers of beef, cheese, and pasta.',
  },
  {
    id: 2,
    title: 'Avocado Toast Deluxe',
    image: 'https://images.unsplash.com/photo-1541519177645-c2c8d6bdc31b?w=400',
    readyInMinutes: 10,
    servings: 2,
    healthScore: 89,
    aggregateLikes: 89,
    dishTypes: ['breakfast'],
    cuisines: ['American'],
    diets: ['vegetarian'],
    pricePerServing: 175,
    summary: 'Perfectly ripe avocado on artisan bread with premium toppings.',
  },
  {
    id: 3,
    title: 'Grilled Salmon Teriyaki',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    readyInMinutes: 30,
    servings: 4,
    healthScore: 85,
    aggregateLikes: 167,
    dishTypes: ['dinner', 'main course'],
    cuisines: ['Japanese'],
    diets: ['gluten free'],
    pricePerServing: 420,
    summary: 'Perfectly grilled salmon with homemade teriyaki glaze.',
  },
  {
    id: 4,
    title: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    readyInMinutes: 20,
    servings: 2,
    healthScore: 92,
    aggregateLikes: 203,
    dishTypes: ['lunch', 'main course'],
    cuisines: ['Mediterranean'],
    diets: ['vegetarian', 'vegan'],
    pricePerServing: 225,
    summary:
      'Fresh, healthy bowl with quinoa, vegetables, and Mediterranean flavors.',
  },
  {
    id: 5,
    title: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    readyInMinutes: 25,
    servings: 24,
    healthScore: 45,
    aggregateLikes: 456,
    dishTypes: ['dessert'],
    cuisines: ['American'],
    diets: [],
    pricePerServing: 85,
    summary: 'Soft, chewy cookies with the perfect chocolate-to-cookie ratio.',
  },
  {
    id: 6,
    title: 'Caesar Salad',
    image: 'https://images.unsplash.com/photo-1512852939750-1305098529bf?w=400',
    readyInMinutes: 15,
    servings: 4,
    healthScore: 78,
    aggregateLikes: 123,
    dishTypes: ['lunch', 'side dish'],
    cuisines: ['American'],
    diets: ['vegetarian'],
    pricePerServing: 165,
    summary: 'Fresh, crispy salad with homemade dressing.',
  },
];

// Helper function to check if API key is valid
const hasValidAPIKey = () => {
  const isValid =
    SPOONACULAR_API_KEY &&
    SPOONACULAR_API_KEY.length > 10 &&
    SPOONACULAR_API_KEY !== 'your-api-key-here';
  console.log('API Key Check:', {
    key: SPOONACULAR_API_KEY?.substring(0, 8) + '...',
    length: SPOONACULAR_API_KEY?.length,
    isValid,
  });
  return isValid;
};

// Helper function to return sample data with a delay to simulate API call
const getSampleData = (count = 6) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const shuffled = [...SAMPLE_RECIPES].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, count));
    }, 500);
  });
};

// Find recipes by nutritional content
export const findRecipesByNutrients = async nutritionParams => {
  if (!hasValidAPIKey()) {
    console.log('Using sample data - API key not configured');
    return await getSampleData();
  }

  try {
    const queryParams = new URLSearchParams();

    // Add each nutrition parameter to the query string
    Object.entries(nutritionParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    // Add default parameters
    queryParams.append('number', '12'); // Number of recipes to return
    queryParams.append('addRecipeInformation', 'true');
    queryParams.append('addRecipeNutrition', 'true');

    const response = await fetch(
      `${BASE_URL}/recipes/findByNutrients?${queryParams}&apiKey=${SPOONACULAR_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes by nutrients:', error);
    console.log('Falling back to sample data');
    return await getSampleData();
  }
};

// Get detailed recipe information
export const getRecipeInformation = async recipeId => {
  if (!hasValidAPIKey()) {
    console.log('Using sample data - API key not configured');
    return SAMPLE_RECIPES.find(r => r.id === recipeId) || SAMPLE_RECIPES[0];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe information:', error);
    return SAMPLE_RECIPES[0];
  }
};

// Search recipes by ingredients
export const findRecipesByIngredients = async (ingredients, number = 12) => {
  if (!hasValidAPIKey()) {
    console.log('Using sample data - API key not configured');
    const sampleData = await getSampleData(number);
    // Add ingredient match simulation
    return sampleData.map(recipe => ({
      ...recipe,
      usedIngredients: [{ name: 'sample ingredient' }],
      missedIngredients: [{ name: 'missing ingredient' }],
    }));
  }

  try {
    const ingredientString = Array.isArray(ingredients)
      ? ingredients.join(',')
      : ingredients;

    const response = await fetch(
      `${BASE_URL}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredientString)}&number=${number}&apiKey=${SPOONACULAR_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    const sampleData = await getSampleData(number);
    return sampleData.map(recipe => ({
      ...recipe,
      usedIngredients: [{ name: 'sample ingredient' }],
      missedIngredients: [{ name: 'missing ingredient' }],
    }));
  }
};

// Complex recipe search with multiple filters
export const searchRecipes = async searchParams => {
  if (!hasValidAPIKey()) {
    console.log('Using sample data - API key not configured');
    return await getSampleData(searchParams.number || 12);
  }

  try {
    const queryParams = new URLSearchParams();

    // Add each search parameter to the query string
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    // Add default parameters
    queryParams.append('addRecipeInformation', 'true');
    queryParams.append('fillIngredients', 'true');
    queryParams.append('addRecipeNutrition', 'true');

    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?${queryParams}&apiKey=${SPOONACULAR_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return await getSampleData(searchParams.number || 12);
  }
};

// Get random recipes
export const getRandomRecipes = async (number = 6, tags = '') => {
  console.log('getRandomRecipes called with:', { number, tags });

  if (!hasValidAPIKey()) {
    console.log('Using sample data - API key not valid');
    return await getSampleData(number);
  }

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('number', number.toString());
    if (tags) queryParams.append('tags', tags);

    const url = `${BASE_URL}/recipes/random?${queryParams}&apiKey=${SPOONACULAR_API_KEY}`;
    console.log(
      'Making API call to:',
      url.replace(SPOONACULAR_API_KEY, 'API_KEY_HIDDEN')
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response status:', response.status);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data.recipes || data;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    console.log('Falling back to sample data');
    return await getSampleData(number);
  }
};

// Get popular/trending recipes
export const getPopularRecipes = async (number = 12) => {
  try {
    const searchParams = {
      number: number,
      sort: 'popularity',
      sortDirection: 'desc',
    };

    return await searchRecipes(searchParams);
  } catch (error) {
    console.error('Error fetching popular recipes:', error);
    return await getSampleData(number);
  }
};

// Search recipes by category/meal type
export const getRecipesByCategory = async (category, number = 12) => {
  try {
    const searchParams = {
      number: number,
      type: category, // breakfast, lunch, dinner, dessert, etc.
    };

    return await searchRecipes(searchParams);
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return await getSampleData(number);
  }
};

// Advanced recipe search for RecipeLibraryPage
export const advancedRecipeSearch = async ({
  query = '',
  cuisine = '',
  diet = '',
  intolerances = '',
  type = '',
  minReadyTime = '',
  maxReadyTime = '',
  sort = 'popularity',
  number = 12,
  offset = 0,
}) => {
  try {
    const searchParams = {
      query,
      number,
      offset,
      sort,
    };

    // Add optional parameters
    if (cuisine) searchParams.cuisine = cuisine;
    if (diet) searchParams.diet = diet;
    if (intolerances) searchParams.intolerances = intolerances;
    if (type) searchParams.type = type;
    if (minReadyTime) searchParams.minReadyTime = minReadyTime;
    if (maxReadyTime) searchParams.maxReadyTime = maxReadyTime;

    return await searchRecipes(searchParams);
  } catch (error) {
    console.error('Error in advanced recipe search:', error);
    return await getSampleData(number);
  }
};

// Helper function to calculate nutritional needs based on goals and current intake
export const calculateNutritionalGaps = (goals, currentIntake) => {
  const remaining = {
    calories: Math.max(0, goals.calories - currentIntake.calories),
    protein: Math.max(0, goals.protein - currentIntake.protein),
    carbs: Math.max(0, goals.carbs - currentIntake.carbs),
    fat: Math.max(0, goals.fat - currentIntake.fat),
  };

  // Create API parameters for finding recipes that fit remaining needs
  // Use ranges to allow some flexibility
  const nutritionParams = {};

  if (remaining.calories > 100) {
    nutritionParams.minCalories = Math.max(50, remaining.calories * 0.3);
    nutritionParams.maxCalories = Math.min(800, remaining.calories * 1.2);
  }

  if (remaining.protein > 5) {
    nutritionParams.minProtein = Math.max(1, remaining.protein * 0.3);
    nutritionParams.maxProtein = Math.min(100, remaining.protein * 1.5);
  }

  if (remaining.carbs > 10) {
    nutritionParams.minCarbs = Math.max(1, remaining.carbs * 0.2);
    nutritionParams.maxCarbs = Math.min(100, remaining.carbs * 1.3);
  }

  if (remaining.fat > 5) {
    nutritionParams.minFat = Math.max(1, remaining.fat * 0.2);
    nutritionParams.maxFat = Math.min(50, remaining.fat * 1.5);
  }

  return { remaining, nutritionParams };
};

// Helper function to format recipe data consistently
export const formatRecipeData = recipe => ({
  id: recipe.id,
  title: recipe.title,
  image: recipe.image,
  readyInMinutes: recipe.readyInMinutes || recipe.cookingMinutes || 30,
  servings: recipe.servings || 4,
  healthScore: recipe.healthScore || 0,
  spoonacularScore: recipe.spoonacularScore || 0,
  pricePerServing: recipe.pricePerServing || 0,
  summary: recipe.summary || '',
  cuisines: recipe.cuisines || [],
  dishTypes: recipe.dishTypes || [],
  diets: recipe.diets || [],
  occasions: recipe.occasions || [],
  nutrition: recipe.nutrition || {},
  ingredients: recipe.extendedIngredients || [],
  instructions: recipe.analyzedInstructions || [],
  sourceUrl: recipe.sourceUrl || '',
  aggregateLikes: recipe.aggregateLikes || 0,
});
