import React from "react";

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-10">
          Terms and Conditions
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Last updated: July 2024
        </p>

        <section className="space-y-8 text-base leading-7 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing and using Isolakwamuntu, you agree to be bound by these Terms and Conditions. 
              If you do not agree, please do not use the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property</h2>
            <p>
              All content, branding, logos, and media on this site are owned by Isolakwamuntu or its licensors 
              and are protected by copyright and trademark laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account information and 
              for all activities under your account. Use the platform respectfully and lawfully.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Subscription and Payments</h2>
            <p>
              You agree to pay all fees associated with your subscription. Refunds may be subject to 
              our cancellation policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access at any time if you violate 
              these terms or for any operational or legal reason.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
            <p>
              Isolakwamuntu is not liable for any indirect or consequential damages resulting from 
              your use of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the platform after changes 
              constitutes acceptance of the updated Terms.
            </p>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default TermsConditionsPage;
