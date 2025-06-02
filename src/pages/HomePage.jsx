import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../assets/components/Hero';
import Quote from '../assets/components/Quote';
import Features from '../assets/components/Features';
import RecipeCard from '../assets/components/RecipeCard';
import { getRandomRecipes } from '../services/spoonacularApi';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const handleBrowseRecipes = () => {
    navigate('/recipes');
  };

  const handleGetStarted = () => {
    navigate('/recipes');
  };

  // Load featured recipes with error handling
  const loadFeaturedRecipes = async () => {
    setLoadingRecipes(true);
    try {
      console.log('Loading featured recipes...');
      const recipes = await getRandomRecipes(6, 'dinner,healthy');
      console.log('Received recipes:', recipes);
      setFeaturedRecipes(recipes.slice(0, 6));
    } catch (error) {
      console.error('Error loading featured recipes:', error);
      setFeaturedRecipes([]);
    } finally {
      setLoadingRecipes(false);
    }
  };

  useEffect(() => {
    // Delay the API call slightly to ensure component is mounted
    const timer = setTimeout(() => {
      loadFeaturedRecipes();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero
        title='Spoony Recipes'
        subtitle='Discover delicious recipes that are easy to follow and perfect for every home cook'
        primaryButton={{
          text: 'Browse Recipes',
          action: handleBrowseRecipes,
        }}
        secondaryButton={{
          text: 'Get Started',
          action: handleGetStarted,
        }}
        image='./src/assets/hero.png'
        imageAlt='Delicious food spread'
      />

      <Quote
        quote="Cooking is not about convenience. It's about love, care, and the joy of creating something beautiful."
        author='Chef Julia Child'
        backgroundColor='#d8ecde'
      />

      <Features title='Why Spoony is Your Perfect Kitchen Companion ?' />

      {/* Featured Recipes Section */}
      <section className='w-full max-w-6xl mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl space-grotesk-bold text-gray-900 mb-4'>
            ✨ Featured Recipes
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Discover amazing recipes handpicked by our chefs. Perfect for trying
            something new or impressing your guests.
          </p>
        </div>

        {loadingRecipes ? (
          <div className='text-center py-8'>
            <div className='text-4xl mb-4'>⏳</div>
            <p className='text-gray-500'>Loading delicious recipes...</p>
          </div>
        ) : featuredRecipes.length === 0 ? (
          <div className='text-center py-8 bg-gray-50 rounded-lg'>
            <div className='text-4xl mb-4'>🍽️</div>
            <p className='text-gray-500 mb-2'>
              Featured recipes will appear here.
            </p>
            <p className='text-xs text-gray-400'>
              Using sample data (API key not configured)
            </p>
            <button
              onClick={loadFeaturedRecipes}
              className='mt-4 bg-[#2D3648] text-white px-4 py-2 rounded hover:bg-[#1F2937] transition-colors'
            >
              Retry Loading Recipes
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                showPrice={false}
                onClick={() => navigate('/recipes')}
              />
            ))}
          </div>
        )}

        <div className='text-center mt-12'>
          <button
            onClick={handleBrowseRecipes}
            className='border-2 border-[#2D3648] text-[#2D3648] px-8 py-3 rounded-lg hover:bg-[#2D3648] hover:text-white transition-colors space-grotesk-medium'
          >
            Explore All Recipes
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
