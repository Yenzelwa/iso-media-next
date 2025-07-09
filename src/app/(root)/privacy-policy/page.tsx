import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen  text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-10">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Last updated: July 2025
        </p>

        <section className="space-y-8 text-base leading-7 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              At Isolakwamuntu, your privacy is important to us. This Privacy Policy
              explains how we collect, use, and protect your personal information
              when you use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. What Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address,
              IP address, and usage data when you access or interact with our content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
            <p>
              We use the information to provide and improve our services, send
              updates, respond to inquiries, and personalize your experience on
              the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Sharing and Disclosure</h2>
            <p>
              We do not sell your information. We may share it with third-party
              service providers who support our operations under strict confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
            <p>
              You have the right to access, modify, or delete your personal information
              at any time. Contact us if you wish to exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Any changes will be
              posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about this policy, please contact us at:
              <br />
              <strong>Email:</strong> privacy@isolakwamuntu.com
            </p>
          </div>
        </section>

        <div className="mt-16 text-center text-sm text-gray-400 border-t pt-6">
          &copy; {new Date().getFullYear()} Isolakwamuntu Media. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
