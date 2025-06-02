import { useState, useEffect } from 'react';
import { advancedRecipeSearch } from '../../services/spoonacularApi';

const RecipeLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
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
        number: 20,
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

  // Handle filter changes
  const handleFilterChange = () => {
    performSearch();
  };

  const getTimeDisplay = minutes => {
    if (!minutes) return 'Quick';
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
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

      {/* Advanced Filters */}
      <div className='bg-white rounded-lg border p-6 mb-8'>
        {/* Search Bar */}
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search recipes, ingredients, or keywords...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
          />
        </div>

        {/* Filter Row 1 */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
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
        </div>

        {/* Sort and View Options */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-gray-600'>Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() +
                    option.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
            <button
              onClick={handleFilterChange}
              className='bg-[#2D3648] text-white px-4 py-2 rounded text-sm hover:bg-[#1F2937] transition-colors'
            >
              Apply Filters
            </button>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#2D3648] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#2D3648] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              ☰
            </button>
          </div>
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

      {/* Recipe Grid/List */}
      {!loading && recipes.length > 0 && (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
                viewMode === 'list' ? 'flex gap-4 p-4' : ''
              }`}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className={
                  viewMode === 'list'
                    ? 'w-32 h-32 object-cover rounded-lg flex-shrink-0'
                    : 'w-full h-48 object-cover'
                }
              />
              <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                <div className='flex justify-between items-start mb-2'>
                  <h3 className='text-lg font-bold text-gray-900 line-clamp-2 flex-1'>
                    {recipe.title}
                  </h3>
                  <div className='flex items-center gap-1 ml-2'>
                    {recipe.healthScore && (
                      <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded'>
                        Health: {recipe.healthScore}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                  <span>⏱️ {getTimeDisplay(recipe.readyInMinutes)}</span>
                  {recipe.servings && (
                    <span>👥 {recipe.servings} servings</span>
                  )}
                  {recipe.aggregateLikes && (
                    <span>👍 {recipe.aggregateLikes}</span>
                  )}
                </div>

                {/* Cuisines and Diets */}
                <div className='mb-3'>
                  {recipe.cuisines && recipe.cuisines.length > 0 && (
                    <div className='flex flex-wrap gap-1 mb-2'>
                      {recipe.cuisines.slice(0, 2).map((cuisine, index) => (
                        <span
                          key={index}
                          className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  )}

                  {recipe.diets && recipe.diets.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {recipe.diets.slice(0, 3).map((diet, index) => (
                        <span
                          key={index}
                          className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded'
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recipe Summary (list view only) */}
                {viewMode === 'list' && recipe.summary && (
                  <p
                    className='text-gray-600 text-sm mb-3 line-clamp-2'
                    dangerouslySetInnerHTML={{
                      __html:
                        recipe.summary
                          .replace(/<[^>]*>/g, '')
                          .substring(0, 150) + '...',
                    }}
                  />
                )}

                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    {recipe.pricePerServing && (
                      <span className='text-sm text-gray-500'>
                        ${(recipe.pricePerServing / 100).toFixed(2)}/serving
                      </span>
                    )}
                  </div>
                  <button className='bg-[#2D3648] text-white px-4 py-2 rounded text-sm hover:bg-[#1F2937] transition-colors'>
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && recipes.length > 0 && recipes.length >= 20 && (
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
