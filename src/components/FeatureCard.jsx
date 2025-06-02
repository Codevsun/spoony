const FeatureCard = ({
  title,
  description,
  icon,
  borderColor = '#789DBC',
  iconBgColor = '#FFE3E3',
  className = '',
}) => {
  return (
    <div
      className={`border-2 aspect-square p-6 flex flex-col ${className}`}
      style={{ borderColor }}
    >
      {/* Title */}
      <div className='mb-4 text-center'>
        <span className='text-gray-800 text-xl space-grotesk-bold'>
          {title}
        </span>
      </div>

      {/* Icon */}
      <div className='flex-1 flex items-center justify-center'>
        <div
          className='w-20 h-20 rounded-full flex items-center justify-center'
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
      </div>

      {/* Description */}
      <div className='mt-4'>
        <div className='border-t border-gray-300 pt-4 text-center'>
          <span className='text-gray-600 text-sm leading-relaxed'>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
