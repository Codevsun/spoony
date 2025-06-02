import { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className='min-h-screen flex flex-col items-center'>
        <nav className='fixed top-0 w-full backdrop-blur-sm border-b'>
          <div className='max-w-6xl mx-auto px-4 py-5 flex flex-wrap justify-between items-center'>
            <div className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='icon icon-tabler icons-tabler-outline icon-tabler-asterisk'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 12l8 -4.5' />
                <path d='M12 12v9' />
                <path d='M12 12l-8 -4.5' />
                <path d='M12 12l8 4.5' />
                <path d='M12 3v9' />
                <path d='M12 12l-8 4.5' />
              </svg>
              <span className='text-gray-800 font-medium'>Spoony</span>
            </div>
            <div className='hidden md:flex items-center gap-8'>
              <a href='#' className='text-sm text-gray-600 hover:text-gray-900'>
                Recipes
              </a>
              <a href='#' className='text-sm text-gray-600 hover:text-gray-900'>
                About
              </a>
              <a href='#' className='text-sm text-gray-600 hover:text-gray-900'>
                Contact
              </a>
            </div>

            <div className='flex items-center gap-4'>
              <button className='text-gray-600 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button
                className='md:hidden text-gray-600 hover:text-gray-900'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className='md:hidden px-4 py-3 border-t '>
              <a
                href='#'
                className='block py-2 text-sm text-gray-600 hover:text-gray-900'
              >
                Recipes
              </a>
              <a
                href='#'
                className='block py-2 text-sm text-gray-600 hover:text-gray-900'
              >
                About
              </a>
              <a
                href='#'
                className='block py-2 text-sm text-gray-600 hover:text-gray-900'
              >
                Contact
              </a>
            </div>
          )}
        </nav>
        <div className='max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between mt-12 md:mt-20 px-4 gap-8 md:gap-12 pb-12'>
          <div className='max-w-2xl w-full md:w-1/2'>
            <h1 className='text-4xl md:text-6xl space-grotesk-bold mb-4 md:mb-6 text-gray-900 text-center md:text-left'>
              Spoony Recipes
            </h1>
            <p className='text-lg md:text-xl space-grotesk-regular mb-6 md:mb-8 text-gray-700 text-center md:text-left'>
              Discover delicious recipes that are easy to follow and perfect for
              every home cook
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
              <button className='w-full sm:w-auto bg-[#2D3648] text-white px-8 py-3 rounded-lg space-grotesk-medium hover:bg-[#1F2937] transition-colors'>
                Browse Recipes
              </button>
              <button className='w-full sm:w-auto border-2 border-[#2D3648] text-[#2D3648] px-8 py-3 rounded-lg space-grotesk-medium hover:bg-[#2D3648] hover:text-white transition-colors'>
                Get Started
              </button>
            </div>
          </div>
          <div className='w-full md:w-1/2 flex-shrink-0'>
            <img
              src='./src/assets/hero.png'
              alt='Delicious food spread'
              className='w-full h-[300px] md:h-[500px] object-cover rounded-lg'
            />
          </div>
        </div>
        <div className='w-full border-b'></div>
        {/* Quote Section */}
        <div
          className='w-full py-6 md:py-12'
          style={{ backgroundColor: '#d8ecde' }}
        >
          <div className='max-w-2xl mx-auto px-4 text-center'>
            <blockquote className='text-lg md:text-xl font-light text-gray-800 mb-3 leading-relaxed'>
              "Cooking is not about convenience. It's about love, care, and the
              joy of creating something beautiful."
            </blockquote>
            <cite className='text-sm text-gray-600 font-medium'>
              - Chef Julia Child
            </cite>
          </div>
        </div>
        <div className='w-full border-b'></div>
        {/* Featured Section */}
        <div className='w-full py-12 md:py-16'>
          <div className='max-w-6xl mx-auto px-4'>
            <div className='flex items-center gap-3 mb-12'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='icon icon-tabler icons-tabler-outline icon-tabler-sparkles'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z' />
              </svg>
              <h2 className='text-3xl md:text-4xl space-grotesk-bold text-left text-gray-900'>
                Why do i use spoony?
              </h2>
            </div>
          </div>
          <div className='max-w-6xl mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              {/* Featured Item 1 */}
              <div className='border-2 border-[#000000] aspect-square p-6 flex flex-col'>
                <div className='mb-4 text-center'>
                  <span className='text-gray-800 text-xl space-grotesk-bold'>
                    Smart Ingredient Match
                  </span>
                </div>
                <div className='flex-1 flex items-center justify-center'>
                  <div className='w-20 h-20 bg-[#FFE3E3] rounded-full flex items-center justify-center'>
                    <svg
                      className='w-10 h-10 text-gray-600'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21ZM8 11H16V13H8V11ZM8 15H13V17H8V15Z' />
                    </svg>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='border-t border-gray-300 pt-4 text-center'>
                    <span className='text-gray-600 text-sm leading-relaxed'>
                      Enter ingredients you have at home and get instant recipe
                      suggestions that minimize waste
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Item 2 */}
              <div className='border-2 border-[#000000] aspect-square p-6 flex flex-col'>
                <div className='mb-4 text-center'>
                  <span className='text-gray-800 text-xl space-grotesk-bold'>
                    Curated Recipe Library
                  </span>
                </div>
                <div className='flex-1 flex items-center justify-center'>
                  <div className='w-20 h-20 bg-[#FFE3E3] rounded-full flex items-center justify-center'>
                    <svg
                      className='w-10 h-10 text-gray-600'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM15 16H7V14H15V16ZM17 8H7V6H17V8Z' />
                    </svg>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='border-t border-gray-300 pt-4 text-center'>
                    <span className='text-gray-600 text-sm leading-relaxed'>
                      Access thousands of chef-tested recipes with step-by-step
                      instructions and cooking tips
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Item 3 */}
              <div className='border-2 border-[#000000] aspect-square p-6 flex flex-col'>
                <div className='mb-4 text-center'>
                  <span className='text-gray-800 text-xl space-grotesk-bold'>
                    Nutrition Tracking
                  </span>
                </div>
                <div className='flex-1 flex items-center justify-center'>
                  <div className='w-20 h-20 bg-[#FFE3E3] rounded-full flex items-center justify-center'>
                    <svg
                      className='w-10 h-10 text-gray-600'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18V6ZM11 8V16C8.24 16 6 13.76 6 11C6 9.34 6.84 7.91 8.1 7.1L11 8Z' />
                    </svg>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='border-t border-gray-300 pt-4 text-center'>
                    <span className='text-gray-600 text-sm leading-relaxed'>
                      Monitor calories, macros, and dietary preferences with
                      detailed nutritional breakdowns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='w-full border-t border-gray-300 py-8 md:py-12'>
          <div className='max-w-6xl mx-auto px-4'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
              <div className='flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='icon icon-tabler icons-tabler-outline icon-tabler-asterisk'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 12l8 -4.5' />
                  <path d='M12 12v9' />
                  <path d='M12 12l-8 -4.5' />
                  <path d='M12 12l8 4.5' />
                  <path d='M12 3v9' />
                  <path d='M12 12l-8 4.5' />
                </svg>
                <span className='text-gray-700 font-medium'>Spoony</span>
              </div>

              <div className='flex items-center gap-8 text-sm text-gray-600'>
                <a href='#' className='hover:text-gray-900'>
                  About
                </a>
                <a href='#' className='hover:text-gray-900'>
                  Contact
                </a>
                <a href='#' className='hover:text-gray-900'>
                  Privacy
                </a>
              </div>
            </div>

            <div className='w-full border-t border-gray-200 mt-6 pt-6'>
              <p className='text-center text-sm text-gray-500'>
                © 2024 Spoony. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
