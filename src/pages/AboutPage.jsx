const AboutPage = () => {
  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-12'>
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
      <div className='mb-16'>
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
              src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
              alt='Cooking in kitchen'
              className='w-full h-64 lg:h-80 object-cover rounded-lg shadow-md'
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='mb-16'>
        <h2 className='text-3xl space-grotesk-bold text-gray-900 text-center mb-12'>
          Our Values
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center p-6'>
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

          <div className='text-center p-6'>
            <div className='w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-2xl'>👥</span>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>Community</h3>
            <p className='text-gray-600'>
              We believe in building a community where cooks can share, learn,
              and grow together.
            </p>
          </div>

          <div className='text-center p-6'>
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

      {/* Story Section */}
      <div className='mb-16 bg-[#d8ecde] rounded-lg p-8 md:p-12'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl space-grotesk-bold text-gray-900 mb-6'>
            Our Story
          </h2>
          <p className='text-gray-700 leading-relaxed mb-6'>
            Spoony was born from a simple frustration: having a fridge full of
            ingredients but no idea what to cook with them. Our founder, like
            many home cooks, found themselves repeatedly buying the same
            ingredients and making the same dishes, while other foods went to
            waste.
          </p>
          <p className='text-gray-700 leading-relaxed'>
            What started as a personal project to organize recipes and track
            ingredients has grown into a comprehensive platform that helps
            thousands of home cooks discover new flavors, reduce waste, and
            build confidence in the kitchen. We're proud to be part of your
            culinary journey.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className='mb-16'>
        <h2 className='text-3xl space-grotesk-bold text-gray-900 text-center mb-12'>
          Meet the Team
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='text-center'>
            <img
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
              alt='Team member'
              className='w-32 h-32 rounded-full mx-auto mb-4 object-cover'
            />
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Alex Chen</h3>
            <p className='text-gray-600 mb-2'>Founder & CEO</p>
            <p className='text-sm text-gray-500'>
              Passionate about making cooking accessible to everyone
            </p>
          </div>

          <div className='text-center'>
            <img
              src='https://images.unsplash.com/photo-1494790108755-2616b612b515?w=300'
              alt='Team member'
              className='w-32 h-32 rounded-full mx-auto mb-4 object-cover'
            />
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              Sarah Johnson
            </h3>
            <p className='text-gray-600 mb-2'>Head Chef</p>
            <p className='text-sm text-gray-500'>
              Culinary school graduate with 10+ years of experience
            </p>
          </div>

          <div className='text-center'>
            <img
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'
              alt='Team member'
              className='w-32 h-32 rounded-full mx-auto mb-4 object-cover'
            />
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              Mike Rodriguez
            </h3>
            <p className='text-gray-600 mb-2'>Lead Developer</p>
            <p className='text-sm text-gray-500'>
              Building the technology that powers your cooking experience
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='text-center'>
        <h2 className='text-3xl space-grotesk-bold text-gray-900 mb-4'>
          Ready to Start Cooking?
        </h2>
        <p className='text-gray-600 mb-8'>
          Join thousands of home cooks who have discovered the joy of
          stress-free cooking with Spoony.
        </p>
        <button className='bg-[#2D3648] text-white px-8 py-3 rounded-lg space-grotesk-medium hover:bg-[#1F2937] transition-colors'>
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
