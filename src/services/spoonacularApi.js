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
    summary:
      'Rich, hearty lasagna with layers of beef, cheese, and pasta. This family favorite combines tender pasta sheets with savory meat sauce and three types of cheese for the ultimate comfort food experience.',
    extendedIngredients: [
      {
        name: 'Ground beef',
        amount: 1,
        unit: 'lb',
        original: '1 lb ground beef',
      },
      {
        name: 'Lasagna noodles',
        amount: 12,
        unit: 'sheets',
        original: '12 lasagna noodle sheets',
      },
      {
        name: 'Ricotta cheese',
        amount: 15,
        unit: 'oz',
        original: '15 oz ricotta cheese',
      },
      {
        name: 'Mozzarella cheese',
        amount: 16,
        unit: 'oz',
        original: '16 oz mozzarella cheese, shredded',
      },
      {
        name: 'Parmesan cheese',
        amount: 0.5,
        unit: 'cup',
        original: '1/2 cup grated Parmesan cheese',
      },
      {
        name: 'Marinara sauce',
        amount: 24,
        unit: 'oz',
        original: '24 oz marinara sauce',
      },
      { name: 'Eggs', amount: 2, unit: 'large', original: '2 large eggs' },
      {
        name: 'Italian seasoning',
        amount: 2,
        unit: 'tsp',
        original: '2 tsp Italian seasoning',
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: 'Preheat oven to 375°F. Cook lasagna noodles according to package directions and drain.',
          },
          {
            number: 2,
            step: 'Brown ground beef in a large skillet over medium heat. Drain excess fat and stir in marinara sauce.',
          },
          {
            number: 3,
            step: 'In a bowl, mix ricotta cheese, eggs, and Italian seasoning until well combined.',
          },
          {
            number: 4,
            step: 'Layer half the noodles in a greased 9x13 baking dish. Spread ricotta mixture over noodles.',
          },
          {
            number: 5,
            step: 'Add half the meat sauce and half the mozzarella cheese. Repeat layers.',
          },
          {
            number: 6,
            step: 'Top with Parmesan cheese. Cover with foil and bake for 45 minutes.',
          },
          {
            number: 7,
            step: 'Remove foil and bake 15 more minutes until cheese is golden. Let rest 10 minutes before serving.',
          },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 445,
          unit: 'kcal',
          percentOfDailyNeeds: 22.25,
        },
        { name: 'Fat', amount: 23, unit: 'g', percentOfDailyNeeds: 35.38 },
        { name: 'Protein', amount: 35, unit: 'g', percentOfDailyNeeds: 70 },
        {
          name: 'Carbohydrates',
          amount: 28,
          unit: 'g',
          percentOfDailyNeeds: 9.33,
        },
      ],
    },
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
    summary:
      'Perfectly ripe avocado on artisan bread with premium toppings. This nutrient-packed breakfast is both delicious and Instagram-worthy.',
    extendedIngredients: [
      {
        name: 'Sourdough bread',
        amount: 2,
        unit: 'slices',
        original: '2 slices artisan sourdough bread',
      },
      {
        name: 'Avocado',
        amount: 1,
        unit: 'large',
        original: '1 large ripe avocado',
      },
      {
        name: 'Cherry tomatoes',
        amount: 6,
        unit: 'pieces',
        original: '6 cherry tomatoes, halved',
      },
      {
        name: 'Feta cheese',
        amount: 2,
        unit: 'tbsp',
        original: '2 tbsp crumbled feta cheese',
      },
      {
        name: 'Lime',
        amount: 0.5,
        unit: 'piece',
        original: '1/2 lime, juiced',
      },
      {
        name: 'Red pepper flakes',
        amount: 0.25,
        unit: 'tsp',
        original: '1/4 tsp red pepper flakes',
      },
      { name: 'Salt', amount: 0.25, unit: 'tsp', original: '1/4 tsp sea salt' },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: 'Toast the sourdough bread slices until golden brown.',
          },
          {
            number: 2,
            step: 'Mash the avocado with lime juice and salt in a small bowl.',
          },
          {
            number: 3,
            step: 'Spread the avocado mixture evenly on the toasted bread.',
          },
          {
            number: 4,
            step: 'Top with cherry tomatoes and crumbled feta cheese.',
          },
          {
            number: 5,
            step: 'Sprinkle with red pepper flakes and serve immediately.',
          },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 285,
          unit: 'kcal',
          percentOfDailyNeeds: 14.25,
        },
        { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 27.69 },
        { name: 'Protein', amount: 8, unit: 'g', percentOfDailyNeeds: 16 },
        {
          name: 'Carbohydrates',
          amount: 28,
          unit: 'g',
          percentOfDailyNeeds: 9.33,
        },
      ],
    },
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
    summary:
      'Perfectly grilled salmon with homemade teriyaki glaze. This healthy and flavorful dish is rich in omega-3 fatty acids.',
    extendedIngredients: [
      {
        name: 'Salmon fillets',
        amount: 4,
        unit: 'pieces',
        original: '4 salmon fillets (6 oz each)',
      },
      {
        name: 'Soy sauce',
        amount: 0.25,
        unit: 'cup',
        original: '1/4 cup low-sodium soy sauce',
      },
      { name: 'Mirin', amount: 2, unit: 'tbsp', original: '2 tbsp mirin' },
      {
        name: 'Brown sugar',
        amount: 2,
        unit: 'tbsp',
        original: '2 tbsp brown sugar',
      },
      {
        name: 'Ginger',
        amount: 1,
        unit: 'tbsp',
        original: '1 tbsp fresh ginger, grated',
      },
      {
        name: 'Garlic',
        amount: 2,
        unit: 'cloves',
        original: '2 cloves garlic, minced',
      },
      {
        name: 'Sesame oil',
        amount: 1,
        unit: 'tsp',
        original: '1 tsp sesame oil',
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: 'Whisk together soy sauce, mirin, brown sugar, ginger, garlic, and sesame oil for the teriyaki glaze.',
          },
          {
            number: 2,
            step: 'Marinate salmon fillets in half the teriyaki sauce for 15 minutes.',
          },
          {
            number: 3,
            step: 'Preheat grill to medium-high heat and oil the grates.',
          },
          {
            number: 4,
            step: 'Grill salmon for 4-5 minutes per side, basting with remaining teriyaki sauce.',
          },
          {
            number: 5,
            step: 'Cook until internal temperature reaches 145°F and fish flakes easily.',
          },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 350,
          unit: 'kcal',
          percentOfDailyNeeds: 17.5,
        },
        { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 27.69 },
        { name: 'Protein', amount: 42, unit: 'g', percentOfDailyNeeds: 84 },
        {
          name: 'Carbohydrates',
          amount: 8,
          unit: 'g',
          percentOfDailyNeeds: 2.67,
        },
      ],
    },
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
      'Fresh, healthy bowl with quinoa, vegetables, and Mediterranean flavors. Packed with plant-based protein and colorful vegetables.',
    extendedIngredients: [
      {
        name: 'Quinoa',
        amount: 1,
        unit: 'cup',
        original: '1 cup quinoa, rinsed',
      },
      {
        name: 'Cucumber',
        amount: 1,
        unit: 'medium',
        original: '1 medium cucumber, diced',
      },
      {
        name: 'Cherry tomatoes',
        amount: 1,
        unit: 'cup',
        original: '1 cup cherry tomatoes, halved',
      },
      {
        name: 'Kalamata olives',
        amount: 0.25,
        unit: 'cup',
        original: '1/4 cup kalamata olives, pitted',
      },
      {
        name: 'Red onion',
        amount: 0.25,
        unit: 'cup',
        original: '1/4 cup red onion, diced',
      },
      {
        name: 'Olive oil',
        amount: 3,
        unit: 'tbsp',
        original: '3 tbsp extra virgin olive oil',
      },
      {
        name: 'Lemon juice',
        amount: 2,
        unit: 'tbsp',
        original: '2 tbsp fresh lemon juice',
      },
      {
        name: 'Oregano',
        amount: 1,
        unit: 'tsp',
        original: '1 tsp dried oregano',
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: 'Cook quinoa according to package directions and let cool.',
          },
          {
            number: 2,
            step: 'Dice cucumber, halve cherry tomatoes, and slice red onion.',
          },
          {
            number: 3,
            step: 'Whisk together olive oil, lemon juice, and oregano for dressing.',
          },
          {
            number: 4,
            step: 'Combine quinoa with vegetables and olives in a large bowl.',
          },
          {
            number: 5,
            step: 'Toss with dressing and season with salt and pepper to taste.',
          },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 380,
          unit: 'kcal',
          percentOfDailyNeeds: 19,
        },
        { name: 'Fat', amount: 16, unit: 'g', percentOfDailyNeeds: 24.62 },
        { name: 'Protein', amount: 12, unit: 'g', percentOfDailyNeeds: 24 },
        {
          name: 'Carbohydrates',
          amount: 52,
          unit: 'g',
          percentOfDailyNeeds: 17.33,
        },
      ],
    },
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
    summary:
      'Soft, chewy cookies with the perfect chocolate-to-cookie ratio. A classic treat that never goes out of style.',
    extendedIngredients: [
      {
        name: 'All-purpose flour',
        amount: 2.25,
        unit: 'cups',
        original: '2 1/4 cups all-purpose flour',
      },
      {
        name: 'Butter',
        amount: 1,
        unit: 'cup',
        original: '1 cup butter, softened',
      },
      {
        name: 'Brown sugar',
        amount: 0.75,
        unit: 'cup',
        original: '3/4 cup packed brown sugar',
      },
      {
        name: 'White sugar',
        amount: 0.75,
        unit: 'cup',
        original: '3/4 cup granulated sugar',
      },
      { name: 'Eggs', amount: 2, unit: 'large', original: '2 large eggs' },
      {
        name: 'Vanilla extract',
        amount: 2,
        unit: 'tsp',
        original: '2 tsp vanilla extract',
      },
      {
        name: 'Baking soda',
        amount: 1,
        unit: 'tsp',
        original: '1 tsp baking soda',
      },
      { name: 'Salt', amount: 1, unit: 'tsp', original: '1 tsp salt' },
      {
        name: 'Chocolate chips',
        amount: 2,
        unit: 'cups',
        original: '2 cups chocolate chips',
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: 'Preheat oven to 375°F and line baking sheets with parchment paper.',
          },
          {
            number: 2,
            step: 'Cream together butter and both sugars until light and fluffy.',
          },
          {
            number: 3,
            step: 'Beat in eggs one at a time, then add vanilla extract.',
          },
          {
            number: 4,
            step: 'In a separate bowl, whisk together flour, baking soda, and salt.',
          },
          {
            number: 5,
            step: 'Gradually mix dry ingredients into wet ingredients until just combined.',
          },
          {
            number: 6,
            step: 'Fold in chocolate chips and drop spoonfuls of dough onto baking sheets.',
          },
          {
            number: 7,
            step: 'Bake for 9-11 minutes until edges are golden brown. Cool on pan for 5 minutes before transferring.',
          },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 195,
          unit: 'kcal',
          percentOfDailyNeeds: 9.75,
        },
        { name: 'Fat', amount: 9, unit: 'g', percentOfDailyNeeds: 13.85 },
        { name: 'Protein', amount: 2.5, unit: 'g', percentOfDailyNeeds: 5 },
        {
          name: 'Carbohydrates',
          amount: 28,
          unit: 'g',
          percentOfDailyNeeds: 9.33,
        },
      ],
    },
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
    summary:
      'Fresh, crispy salad with homemade dressing. This classic Caesar salad features crisp romaine lettuce, parmesan cheese, and crunchy croutons.',
    extendedIngredients: [
      {
        name: 'Romaine lettuce',
        amount: 2,
        unit: 'heads',
        original: '2 heads romaine lettuce, chopped',
      },
      {
        name: 'Parmesan cheese',
        amount: 0.5,
        unit: 'cup',
        original: '1/2 cup grated Parmesan cheese',
      },
      {
        name: 'Croutons',
        amount: 1,
        unit: 'cup',
        original: '1 cup homemade croutons',
      },
      {
        name: 'Mayonnaise',
        amount: 0.5,
        unit: 'cup',
        original: '1/2 cup mayonnaise',
      },
      {
        name: 'Lemon juice',
        amount: 2,
        unit: 'tbsp',
        original: '2 tbsp fresh lemon juice',
      },
      {
        name: 'Worcestershire sauce',
        amount: 1,
        unit: 'tsp',
        original: '1 tsp Worcestershire sauce',
      },
      {
        name: 'Garlic',
        amount: 2,
        unit: 'cloves',
        original: '2 cloves garlic, minced',
      },
      {
        name: 'Dijon mustard',
        amount: 1,
        unit: 'tsp',
        original: '1 tsp Dijon mustard',
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: 'Wash and chop romaine lettuce into bite-sized pieces.',
          },
          {
            number: 2,
            step: 'Make dressing by whisking together mayonnaise, lemon juice, Worcestershire sauce, garlic, and Dijon mustard.',
          },
          {
            number: 3,
            step: 'Toss lettuce with dressing until evenly coated.',
          },
          { number: 4, step: 'Top with grated Parmesan cheese and croutons.' },
          {
            number: 5,
            step: 'Serve immediately while lettuce is still crisp.',
          },
        ],
      },
    ],
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 220,
          unit: 'kcal',
          percentOfDailyNeeds: 11,
        },
        { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 27.69 },
        { name: 'Protein', amount: 6, unit: 'g', percentOfDailyNeeds: 12 },
        {
          name: 'Carbohydrates',
          amount: 10,
          unit: 'g',
          percentOfDailyNeeds: 3.33,
        },
      ],
    },
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
