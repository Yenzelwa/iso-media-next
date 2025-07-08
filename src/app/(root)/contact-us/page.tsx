import React from "react";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-center text-red-700 mb-8">Contact Us</h1>

        {/* Intro Text */}
        <p className="text-lg text-center text-gray-600 mb-12">
          Have questions, feedback, or partnership inquiries? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-red-200"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-red-200"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-red-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="text-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Office</h2>
              <p>123 Media Lane<br />Cape Town, South Africa<br />7405</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p>support@visionstream.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Phone</h2>
              <p>+27 21 123 4567</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} VisionStream Media. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
