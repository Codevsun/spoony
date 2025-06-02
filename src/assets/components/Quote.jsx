const Quote = ({
  quote = "Cooking is not about convenience. It's about love, care, and the joy of creating something beautiful.",
  author = 'Chef Julia Child',
  backgroundColor = '#d8ecde',
  className = '',
}) => {
  return (
    <>
      <div className='w-full border-b'></div>
      <div
        className={`w-full py-6 md:py-12 ${className}`}
        style={{ backgroundColor }}
      >
        <div className='max-w-2xl mx-auto px-4 text-center'>
          <blockquote className='text-lg md:text-xl font-light text-gray-800 mb-3 leading-relaxed'>
            "{quote}"
          </blockquote>
          <cite className='text-sm text-gray-600 font-medium'>- {author}</cite>
        </div>
      </div>
      <div className='w-full border-b'></div>
    </>
  );
};

export default Quote;
