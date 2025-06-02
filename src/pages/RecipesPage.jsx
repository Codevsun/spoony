import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  searchRecipes,
  getRecipesByCategory,
} from '../services/spoonacularApi';
import RecipeCard from '../components/RecipeCard';

const RecipesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    'all',
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'snack',
    'appetizer',
  ];

  // Load recipes based on category and search term
  const loadRecipes = async (
    category = selectedCategory,
    query = searchTerm
  ) => {
    setLoading(true);
    setHasSearched(true);
    try {
      let fetchedRecipes = [];

      if (query.trim()) {
        // Search by query
        const searchParams = {
          query: query.trim(),
          number: 12,
          type: category !== 'all' ? category : '',
        };
        fetchedRecipes = await searchRecipes(searchParams);
      } else if (category !== 'all') {
        // Search by category only
        fetchedRecipes = await getRecipesByCategory(category, 12);
      } else {
        // Load popular recipes
        const searchParams = {
          number: 12,
          sort: 'popularity',
          sortDirection: 'desc',
        };
        fetchedRecipes = await searchRecipes(searchParams);
      }

      setRecipes(fetchedRecipes || []);
    } catch (error) {
      console.error('Error loading recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Load initial recipes
  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search
  const handleSearch = () => {
    loadRecipes(selectedCategory, searchTerm);
  };

  // Handle category change
  const handleCategoryChange = newCategory => {
    setSelectedCategory(newCategory);
    loadRecipes(newCategory, searchTerm);
  };

  // Handle search input key press
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          Recipe Collection
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Discover amazing recipes for every occasion. From quick weekday meals
          to special weekend treats.
        </p>
      </div>

      {/* Search and Filter */}
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='flex-1 relative'>
          <input
            type='text'
            placeholder='Search recipes...'
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

        <select
          value={selectedCategory}
          onChange={e => handleCategoryChange(e.target.value)}
          className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all'
                ? 'All Categories'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className='px-6 py-3 bg-[#2D3648] text-white rounded-lg hover:bg-[#1F2937] transition-colors'
        >
          Search
        </button>
      </div>

      {/* Quick Links to Features */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <Link
          to='/features/ingredient-match'
          className='p-4 bg-[#FFE3E3] rounded-lg hover:bg-[#ffcaca] transition-colors'
        >
          <h3 className='font-bold text-gray-800 mb-2'>
            🔍 Smart Ingredient Match
          </h3>
          <p className='text-sm text-gray-600'>
            Find recipes with your ingredients
          </p>
        </Link>

        <Link
          to='/features/recipe-library'
          className='p-4 bg-[#E3F2FD] rounded-lg hover:bg-[#bbdefb] transition-colors'
        >
          <h3 className='font-bold text-gray-800 mb-2'>📚 Recipe Library</h3>
          <p className='text-sm text-gray-600'>Browse our curated collection</p>
        </Link>

        <Link
          to='/features/nutrition-tracking'
          className='p-4 bg-[#E8F5E8] rounded-lg hover:bg-[#c8e6c9] transition-colors'
        >
          <h3 className='font-bold text-gray-800 mb-2'>
            🔍 Custom Nutrition Search
          </h3>
          <p className='text-sm text-gray-600'>
            Search for recipes based on specific nutritional criteria.
          </p>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className='text-center py-12'>
          <div className='text-4xl mb-4'>⏳</div>
          <p className='text-gray-500 text-lg'>Searching for recipes...</p>
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
            Try adjusting your search terms or category selection.
          </p>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && recipes.length > 0 && (
        <>
          <div className='mb-6'>
            <p className='text-gray-600'>
              Showing {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' &&
                ` in ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} showPrice={false} />
            ))}
          </div>
        </>
      )}

      {/* Initial State - No search performed */}
      {!loading && !hasSearched && (
        <div className='text-center py-12 bg-gray-50 rounded-lg'>
          <div className='text-4xl mb-4'>🍽️</div>
          <p className='text-gray-500 text-lg mb-4'>
            Ready to discover amazing recipes?
          </p>
          <p className='text-gray-400 mb-6'>
            Use the search bar above or select a category to get started.
          </p>
          <button
            onClick={() => loadRecipes()}
            className='bg-[#2D3648] text-white px-6 py-3 rounded-lg hover:bg-[#1F2937] transition-colors'
          >
            Show Popular Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
