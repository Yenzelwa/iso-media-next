// AboutUsPage.tsx
import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-red-700 mb-8">About Us</h1>

        {/* Introduction */}
        <p className="text-lg text-gray-600 mb-6 text-center">
          At VisionStream, we’re passionate about delivering impactful stories and premium content that inspires, entertains, and connects audiences across the globe.
        </p>

        {/* Company Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To provide a platform where thought-provoking documentaries, independent films, and educational content can reach viewers without boundaries.
              We aim to support creators and thinkers who are changing the world one frame at a time.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where storytelling breaks barriers and empowers people to question, learn, and evolve. We believe in the power of media to shape a better future.
            </p>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
            <p className="text-gray-600">
              We are a team of developers, producers, researchers, and creatives driven by a shared belief in truth and transparency. Collaboration and curiosity guide every decision we make.
            </p>
          </div>

          {/* Join Us */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
            <p className="text-gray-600">
              Want to make a difference through digital storytelling? We’re always looking for passionate individuals to join the team. Explore careers or contact us for partnership opportunities.
            </p>
          </div>
        </div>

        {/* Footer Line */}
        <div className="mt-16 border-t pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} VisionStream Media. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
