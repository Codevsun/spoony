import { Link } from 'react-router-dom';

const Footer = ({
  logo = 'Spoony',
  links = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ],
  copyright = '© 2024 Spoony. All rights reserved.',
  className = '',
}) => {
  return (
    <footer
      className={`w-full border-t border-gray-300 py-8 md:py-12 ${className}`}
    >
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
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
            <span className='text-gray-700 font-medium'>{logo}</span>
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center gap-8 text-sm text-gray-600'>
            {links.map((link, index) => (
              <Link key={index} to={link.href} className='hover:text-gray-900'>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='w-full border-t border-gray-200 mt-6 pt-6'>
          <p className='text-center text-sm text-gray-500'>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
