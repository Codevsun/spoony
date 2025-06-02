import FeatureCard from './FeatureCard';

const Features = ({
  title = 'Why Spoony is Your Perfect Kitchen Companion ?',
  features = [
    {
      title: 'Smart Ingredient Match',
      description:
        'Enter ingredients you have at home and get instant recipe suggestions that minimize waste',
      icon: (
        <svg
          className='w-10 h-10 text-gray-600'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21ZM8 11H16V13H8V11ZM8 15H13V17H8V15Z' />
        </svg>
      ),
    },
    {
      title: 'Curated Recipe Library',
      description:
        'Access thousands of chef-tested recipes with step-by-step instructions and cooking tips',
      icon: (
        <svg
          className='w-10 h-10 text-gray-600'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM15 16H7V14H15V16ZM17 8H7V6H17V8Z' />
        </svg>
      ),
    },
    {
      title: 'Nutrition Tracking',
      description:
        'Monitor calories, macros, and dietary preferences with detailed nutritional breakdowns',
      icon: (
        <svg
          className='w-10 h-10 text-gray-600'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18V6ZM11 8V16C8.24 16 6 13.76 6 11C6 9.34 6.84 7.91 8.1 7.1L11 8Z' />
        </svg>
      ),
    },
  ],
  className = '',
}) => {
  return (
    <div className={`w-full py-12 md:py-16 ${className}`}>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Section Title */}
        <div className='flex items-center gap-3 mb-12'>
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
            className='icon icon-tabler icons-tabler-outline icon-tabler-sparkles'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z' />
          </svg>
          <h2 className='text-3xl md:text-4xl space-grotesk-bold text-left text-gray-900'>
            {title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
