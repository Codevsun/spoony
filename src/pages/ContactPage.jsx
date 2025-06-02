import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          Contact Us
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Have a question, suggestion, or just want to say hello? We'd love to
          hear from you. Get in touch with the Spoony team.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        {/* Contact Form */}
        <div>
          <h2 className='text-2xl space-grotesk-bold text-gray-900 mb-6'>
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                placeholder='Your full name'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                placeholder='your.email@example.com'
              />
            </div>

            <div>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Subject
              </label>
              <select
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
              >
                <option value=''>Select a subject</option>
                <option value='general'>General Inquiry</option>
                <option value='recipe'>Recipe Suggestion</option>
                <option value='bug'>Bug Report</option>
                <option value='feature'>Feature Request</option>
                <option value='partnership'>Partnership</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D3648] focus:border-transparent'
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type='submit'
              className='w-full bg-[#2D3648] text-white py-3 px-6 rounded-lg space-grotesk-medium hover:bg-[#1F2937] transition-colors'
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className='text-2xl space-grotesk-bold text-gray-900 mb-6'>
            Get in Touch
          </h2>

          <div className='space-y-8'>
            {/* Contact Methods */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-[#FFE3E3] rounded-lg flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>Email</h3>
                  <p className='text-gray-600'>hello@spoony.com</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-[#E3F2FD] rounded-lg flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>Phone</h3>
                  <p className='text-gray-600'>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-[#E8F5E8] rounded-lg flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>Address</h3>
                  <p className='text-gray-600'>
                    123 Culinary Street
                    <br />
                    Food City, FC 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className='font-medium text-gray-900 mb-4'>Follow Us</h3>
              <div className='flex gap-4'>
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <span className='text-lg'>📘</span>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <span className='text-lg'>🐦</span>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <span className='text-lg'>📷</span>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <span className='text-lg'>💼</span>
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className='bg-[#d8ecde] rounded-lg p-6'>
              <h3 className='font-medium text-gray-900 mb-2'>
                Have a Quick Question?
              </h3>
              <p className='text-gray-700 text-sm mb-4'>
                Check out our FAQ section for answers to common questions about
                recipes, ingredients, and features.
              </p>
              <button className='text-[#2D3648] font-medium hover:underline'>
                Visit FAQ →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className='mt-12 text-center bg-gray-50 rounded-lg py-8 px-4'>
        <h3 className='text-xl font-bold text-gray-900 mb-2'>
          We're Here to Help
        </h3>
        <p className='text-gray-600'>
          We typically respond to messages within 24 hours during business days.
          For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
