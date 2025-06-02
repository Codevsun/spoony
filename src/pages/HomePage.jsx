import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Quote from '../components/Quote';
import Features from '../components/Features';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBrowseRecipes = () => {
    navigate('/recipes');
  };

  const handleGetStarted = () => {
    navigate('/recipes');
  };

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
    </>
  );
};

export default HomePage;
