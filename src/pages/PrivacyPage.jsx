const PrivacyPage = () => {
  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8 mt-20'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl space-grotesk-bold text-gray-900 mb-4'>
          Privacy Policy
        </h1>
        <p className='text-lg text-gray-600'>
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Content */}
      <div className='prose max-w-none'>
        <div className='bg-[#d8ecde] rounded-lg p-6 mb-8'>
          <h2 className='text-xl font-bold text-gray-900 mb-3'>
            Your Privacy Matters
          </h2>
          <p className='text-gray-700'>
            At Spoony, we are committed to protecting your privacy and ensuring
            the security of your personal information. This policy explains how
            we collect, use, and safeguard your data when you use our recipe
            platform.
          </p>
        </div>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Information We Collect
          </h2>

          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Personal Information
              </h3>
              <ul className='list-disc list-inside space-y-1 text-gray-700'>
                <li>Name and email address when you create an account</li>
                <li>
                  Dietary preferences and restrictions you choose to share
                </li>
                <li>Recipe ratings, reviews, and comments</li>
                <li>Cooking activity and favorite recipes</li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Usage Data
              </h3>
              <ul className='list-disc list-inside space-y-1 text-gray-700'>
                <li>Pages visited and features used</li>
                <li>Search queries and ingredient preferences</li>
                <li>Device information and browser type</li>
                <li>IP address and general location (city/region)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            How We Use Your Information
          </h2>

          <div className='bg-gray-50 rounded-lg p-6'>
            <ul className='space-y-3 text-gray-700'>
              <li className='flex items-start gap-3'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>
                  Provide personalized recipe recommendations based on your
                  preferences
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Track your nutritional goals and cooking progress</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Improve our platform and develop new features</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>
                  Send you relevant updates and cooking tips (with your consent)
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-green-500 mt-1'>✓</span>
                <span>Ensure platform security and prevent fraud</span>
              </li>
            </ul>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Information Sharing
          </h2>

          <div className='border-l-4 border-red-500 pl-4 mb-4'>
            <p className='text-gray-700 font-medium'>
              We do not sell, rent, or share your personal information with
              third parties for marketing purposes.
            </p>
          </div>

          <p className='text-gray-700 mb-4'>
            We may share your information only in these limited circumstances:
          </p>

          <ul className='list-disc list-inside space-y-2 text-gray-700'>
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or court orders</li>
            <li>
              With service providers who help us operate our platform (under
              strict confidentiality agreements)
            </li>
            <li>
              In case of a business merger or acquisition (with advance notice
              to users)
            </li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Data Security
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-blue-50 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                🔒 Encryption
              </h3>
              <p className='text-sm text-gray-700'>
                All data is encrypted in transit and at rest using
                industry-standard protocols.
              </p>
            </div>

            <div className='bg-green-50 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                🛡️ Access Control
              </h3>
              <p className='text-sm text-gray-700'>
                Strict access controls ensure only authorized personnel can
                access your data.
              </p>
            </div>

            <div className='bg-purple-50 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                🔍 Monitoring
              </h3>
              <p className='text-sm text-gray-700'>
                Continuous monitoring and security audits protect against
                unauthorized access.
              </p>
            </div>

            <div className='bg-orange-50 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>🗄️ Backup</h3>
              <p className='text-sm text-gray-700'>
                Regular secure backups ensure your data is protected against
                loss.
              </p>
            </div>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Your Rights and Choices
          </h2>

          <div className='bg-white border rounded-lg divide-y'>
            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                Access Your Data
              </h3>
              <p className='text-gray-700 text-sm'>
                Request a copy of all personal information we have about you.
              </p>
            </div>

            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                Update Information
              </h3>
              <p className='text-gray-700 text-sm'>
                Modify or correct your personal information at any time through
                your account settings.
              </p>
            </div>

            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                Delete Account
              </h3>
              <p className='text-gray-700 text-sm'>
                Request deletion of your account and associated data (some
                information may be retained for legal purposes).
              </p>
            </div>

            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                Opt-out Communications
              </h3>
              <p className='text-gray-700 text-sm'>
                Unsubscribe from marketing emails while still receiving
                important account notifications.
              </p>
            </div>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Cookies and Tracking
          </h2>

          <p className='text-gray-700 mb-4'>
            We use cookies and similar technologies to enhance your experience
            on our platform. These help us:
          </p>

          <ul className='list-disc list-inside space-y-1 text-gray-700 mb-4'>
            <li>Remember your preferences and settings</li>
            <li>Analyze how you use our platform</li>
            <li>Provide personalized content and recommendations</li>
            <li>Ensure platform functionality and security</li>
          </ul>

          <p className='text-gray-700'>
            You can control cookie settings through your browser, though this
            may affect platform functionality.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Children's Privacy
          </h2>

          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <p className='text-gray-700'>
              Spoony is not intended for children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If you believe a child has provided us with personal information,
              please contact us immediately so we can remove it.
            </p>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Changes to This Policy
          </h2>

          <p className='text-gray-700'>
            We may update this privacy policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of significant changes by email or through a prominent notice on our
            platform. Your continued use of Spoony after such changes
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Contact Us</h2>

          <div className='bg-gray-50 rounded-lg p-6'>
            <p className='text-gray-700 mb-4'>
              If you have any questions about this privacy policy or how we
              handle your personal information, please don't hesitate to contact
              us:
            </p>

            <div className='space-y-2 text-gray-700'>
              <p>
                <strong>Email:</strong> privacy@spoony.com
              </p>
              <p>
                <strong>Mail:</strong> Spoony Privacy Team, 123 Culinary Street,
                Food City, FC 12345
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
