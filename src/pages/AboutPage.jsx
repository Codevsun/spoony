const AboutPage = () => {
  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center  border p-6'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          About Spoony
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          We believe that cooking should be accessible, enjoyable, and
          stress-free for everyone. That's why we created Spoony - your perfect
          kitchen companion.
        </p>
      </div>

      {/* Mission Section */}
      <div className=' border p-6 '>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          <div className='lg:w-1/2'>
            <h2 className='text-3xl space-grotesk-bold text-gray-900 mb-6'>
              Our Mission
            </h2>
            <p className='text-gray-700 mb-4 leading-relaxed'>
              At Spoony, we're on a mission to make cooking more accessible and
              enjoyable for home cooks everywhere. We understand that meal
              planning can be overwhelming, ingredients can go to waste, and
              finding the right recipe for your skill level can be challenging.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              Our platform combines smart technology with culinary expertise to
              help you discover recipes that match your ingredients, dietary
              preferences, and cooking abilities. Whether you're a beginner cook
              or a seasoned chef, Spoony adapts to your needs.
            </p>
          </div>
          <div className='lg:w-1/2'>
            <img
              src='./src/assets/about.png'
              alt='Cooking in kitchen'
              className='w-full h-64 lg:h-80 object-cover rounded-lg '
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='mb-16 border p-6 '>
        <h2 className='text-3xl space-grotesk-bold text-gray-900 text-center mb-12'>
          Our Values
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3  p-6'>
          <div className='text-center p-6 border-r h-full'>
            <div className='w-16 h-16 bg-[#FFE3E3] rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>🌱</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>
              Sustainability
            </h3>
            <p className='text-gray-600'>
              We promote sustainable cooking practices that reduce food waste
              and support local ingredients.
            </p>
          </div>

          <div className='text-center p-6 border-r h-full'>
            <div className='w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>👥</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>Community</h3>
            <p className='text-gray-600'>
              We believe in building a community where cooks can share, learn,
              and grow together.
            </p>
          </div>

          <div className='text-center p-6 h-full'>
            <div className='w-16 h-16 bg-[#E8F5E8] rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>💡</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>Innovation</h3>
            <p className='text-gray-600'>
              We continuously innovate to make cooking easier and more enjoyable
              through smart technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
