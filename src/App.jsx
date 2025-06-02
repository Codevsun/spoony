import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Layout from './assets/components/Layout';
import NavBar from './assets/components/NavBar';
import Footer from './assets/components/Footer';

// Page imports
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

// Feature page imports
import IngredientMatchPage from './pages/features/IngredientMatchPage';
import RecipeLibraryPage from './pages/features/RecipeLibraryPage';
import NutritionTrackingPage from './pages/features/NutritionTrackingPage';

// App Layout Component
function AppLayout({ children }) {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Recipes', href: '/recipes' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ];

  const handleNavigation = href => {
    navigate(href);
  };

  return (
    <Layout>
      <NavBar
        logo='Spoony'
        menuItems={navItems.map(item => ({
          ...item,
          onClick: () => handleNavigation(item.href),
        }))}
      />

      {children}

      <Footer
        logo='Spoony'
        links={footerLinks.map(link => ({
          ...link,
          onClick: () => handleNavigation(link.href),
        }))}
        copyright='© 2024 Spoony. All rights reserved.'
      />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />

        <Route
          path='/recipes'
          element={
            <AppLayout>
              <RecipesPage />
            </AppLayout>
          }
        />

        <Route
          path='/about'
          element={
            <AppLayout>
              <AboutPage />
            </AppLayout>
          }
        />

        <Route
          path='/contact'
          element={
            <AppLayout>
              <ContactPage />
            </AppLayout>
          }
        />

        <Route
          path='/privacy'
          element={
            <AppLayout>
              <PrivacyPage />
            </AppLayout>
          }
        />

        {/* Feature Routes */}
        <Route
          path='/features/ingredient-match'
          element={
            <AppLayout>
              <IngredientMatchPage />
            </AppLayout>
          }
        />

        <Route
          path='/features/recipe-library'
          element={
            <AppLayout>
              <RecipeLibraryPage />
            </AppLayout>
          }
        />

        <Route
          path='/features/nutrition-tracking'
          element={
            <AppLayout>
              <NutritionTrackingPage />
            </AppLayout>
          }
        />

        {/* 404 Route */}
        <Route
          path='*'
          element={
            <AppLayout>
              <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20 text-center'>
                <div className='text-6xl mb-4'>🔍</div>
                <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                  Page Not Found
                </h1>
                <p className='text-gray-600 mb-8'>
                  Sorry, the page you're looking for doesn't exist.
                </p>
                <button
                  onClick={() => (window.location.href = '/')}
                  className='bg-[#2D3648] text-white px-8 py-3 rounded-lg hover:bg-[#1F2937] transition-colors'
                >
                  Go Home
                </button>
              </div>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
