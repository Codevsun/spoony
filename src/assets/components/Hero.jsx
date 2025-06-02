const Hero = ({
  title = 'Spoony Recipes',
  subtitle = 'Discover delicious recipes that are easy to follow and perfect for every home cook',
  primaryButton = { text: 'Browse Recipes', action: () => {} },
  secondaryButton = { text: 'Get Started', action: () => {} },
  image = './src/assets/hero.png',
  imageAlt = 'Delicious food spread',
  className = '',
}) => {
  return (
    <div
      className={`max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between mt-12 md:mt-20 px-4 gap-8 md:gap-12 pb-12 ${className}`}
    >
      {/* Content Section */}
      <div className='max-w-2xl w-full md:w-1/2'>
        <h1 className='text-4xl md:text-6xl space-grotesk-bold mb-4 md:mb-6 text-gray-900 text-center md:text-left'>
          {title}
        </h1>
        <p className='text-lg md:text-xl space-grotesk-regular mb-6 md:mb-8 text-gray-700 text-center md:text-left'>
          {subtitle}
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
          <button
            className='w-full sm:w-auto bg-[#2D3648] text-white px-8 py-3 rounded-lg space-grotesk-medium hover:bg-[#1F2937] transition-colors'
            onClick={primaryButton.action}
          >
            {primaryButton.text}
          </button>
          <button
            className='w-full sm:w-auto border-2 border-[#2D3648] text-[#2D3648] px-8 py-3 rounded-lg space-grotesk-medium hover:bg-[#2D3648] hover:text-white transition-colors'
            onClick={secondaryButton.action}
          >
            {secondaryButton.text}
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full md:w-1/2 flex-shrink-0'>
        <img
          src={image}
          alt={imageAlt}
          className='w-full h-[300px] md:h-[500px] object-cover rounded-lg'
        />
      </div>
    </div>
  );
};

export default Hero;
