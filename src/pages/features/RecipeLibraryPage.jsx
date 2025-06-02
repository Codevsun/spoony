import { useState, useEffect } from 'react';
import { advancedRecipeSearch } from '../../services/spoonacularApi';
import RecipeCard from '../../components/RecipeCard';

const RecipeLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const cuisines = [
    '',
    'italian',
    'mexican',
    'chinese',
    'japanese',
    'indian',
    'french',
    'greek',
    'mediterranean',
    'american',
    'thai',
    'korean',
    'spanish',
  ];

  const diets = [
    '',
    'vegetarian',
    'vegan',
    'gluten free',
    'ketogenic',
    'paleo',
    'dairy free',
    'low carb',
    'whole30',
    'pescetarian',
  ];

  const types = [
    '',
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'appetizer',
    'snack',
    'salad',
    'soup',
    'beverage',
    'sauce',
    'side dish',
  ];

  const sortOptions = [
    'popularity',
    'healthiness',
    'price',
    'time',
    'random',
    'max-used-ingredients',
    'min-missing-ingredients',
  ];

  // Perform advanced search
  const performSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const searchParams = {
        query: searchTerm,
        cuisine: selectedCuisine,
        diet: selectedDiet,
        type: selectedType,
        sort: sortBy,
        number: 12,
      };

      // Add time constraints
      if (selectedTime) {
        switch (selectedTime) {
          case 'under-15':
            searchParams.maxReadyTime = '15';
            break;
          case '15-30':
            searchParams.minReadyTime = '15';
            searchParams.maxReadyTime = '30';
            break;
          case '30-60':
            searchParams.minReadyTime = '30';
            searchParams.maxReadyTime = '60';
            break;
          case 'over-60':
            searchParams.minReadyTime = '60';
            break;
        }
      }

      const results = await advancedRecipeSearch(searchParams);
      setRecipes(results || []);
    } catch (error) {
      console.error('Error performing advanced search:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Load initial popular recipes
  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search input key press
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const formatCuisineName = cuisine => {
    return cuisine
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          📚 Curated Recipe Library
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Explore our comprehensive collection of chef-tested recipes. From
          quick weekday meals to elaborate weekend projects, find the perfect
          dish for any occasion.
        </p>
      </div>

      {/* Search and Filters */}
      <div className='bg-white rounded-lg border p-6 mb-8'>
        {/* Search Bar */}
        <div className='flex flex-col md:flex-row gap-4 mb-4'>
          <div className='flex-1 relative'>
            <input
              type='text'
              placeholder='Search recipes, ingredients, or keywords...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
            />
            <svg
              className='absolute left-3 top-3.5 h-5 w-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>

          <button
            onClick={performSearch}
            className='px-6 py-3 bg-[#2D3648] text-white rounded-lg hover:bg-[#1F2937] transition-colors'
          >
            Search
          </button>
        </div>

        {/* Advanced Filters */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <select
            value={selectedCuisine}
            onChange={e => setSelectedCuisine(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
          >
            <option value=''>All Cuisines</option>
            {cuisines.slice(1).map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {formatCuisineName(cuisine)}
              </option>
            ))}
          </select>

          <select
            value={selectedDiet}
            onChange={e => setSelectedDiet(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
          >
            <option value=''>All Diets</option>
            {diets.slice(1).map(diet => (
              <option key={diet} value={diet}>
                {formatCuisineName(diet)}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
          >
            <option value=''>All Types</option>
            {types.slice(1).map(type => (
              <option key={type} value={type}>
                {formatCuisineName(type)}
              </option>
            ))}
          </select>

          <select
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
          >
            <option value=''>Any Time</option>
            <option value='under-15'>Under 15 min</option>
            <option value='15-30'>15-30 min</option>
            <option value='30-60'>30-60 min</option>
            <option value='over-60'>Over 1 hour</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className='mb-6'>
        {!loading && hasSearched && (
          <p className='text-gray-600'>
            Showing {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCuisine &&
              ` in ${formatCuisineName(selectedCuisine)} cuisine`}
            {selectedDiet && ` for ${formatCuisineName(selectedDiet)} diet`}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className='text-center py-12'>
          <div className='text-4xl mb-4'>⏳</div>
          <p className='text-gray-500 text-lg'>Searching recipe library...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && hasSearched && recipes.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-4xl mb-4'>🔍</div>
          <p className='text-gray-500 text-lg mb-2'>
            No recipes found matching your criteria.
          </p>
          <p className='text-gray-400'>
            Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCuisine('');
              setSelectedDiet('');
              setSelectedType('');
              setSelectedTime('');
              setSortBy('popularity');
              performSearch();
            }}
            className='mt-4 bg-[#2D3648] text-white px-6 py-2 rounded-lg hover:bg-[#1F2937] transition-colors'
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && recipes.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} showPrice={true} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && recipes.length > 0 && recipes.length >= 12 && (
        <div className='text-center mt-12'>
          <button
            onClick={() => {
              // Could implement pagination here
              console.log('Load more recipes');
            }}
            className='border-2 border-[#2D3648] text-[#2D3648] px-8 py-3 rounded-lg hover:bg-[#2D3648] hover:text-white transition-colors'
          >
            Load More Recipes
          </button>
        </div>
      )}

      {/* Initial State */}
      {!loading && !hasSearched && (
        <div className='text-center py-12 bg-gray-50 rounded-lg'>
          <div className='text-4xl mb-4'>📚</div>
          <p className='text-gray-500 text-lg mb-4'>
            Welcome to our comprehensive recipe library!
          </p>
          <p className='text-gray-400 mb-6'>
            Use the advanced filters above to find exactly what you're looking
            for.
          </p>
          <button
            onClick={performSearch}
            className='bg-[#2D3648] text-white px-6 py-3 rounded-lg hover:bg-[#1F2937] transition-colors'
          >
            Browse Popular Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeLibraryPage;
