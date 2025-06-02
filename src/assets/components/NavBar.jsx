import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({
  logo = 'Spoony',
  menuItems = [
    { label: 'Recipes', href: '/recipes' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-sm border-b ${className}`}
    >
      <div className='max-w-6xl mx-auto px-4 py-5 flex flex-wrap justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-asterisk'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 12l8 -4.5' />
            <path d='M12 12v9' />
            <path d='M12 12l-8 -4.5' />
            <path d='M12 12l8 4.5' />
            <path d='M12 3v9' />
            <path d='M12 12l-8 4.5' />
          </svg>
          <span className='text-gray-800 font-medium'>{logo}</span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className='text-sm text-gray-600 hover:text-gray-900'
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-4'>
          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-600 hover:text-gray-900'
            onClick={handleMenuToggle}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden px-4 py-3 border-t'>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className='block py-2 text-sm text-gray-600 hover:text-gray-900'
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
