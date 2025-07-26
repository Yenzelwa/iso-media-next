'use client'
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <main className="pt-24 pb-20">
        {/* Content */}
        <div className="px-4 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Contact Us</h1>
              <p className="text-gray-400 text-sm">We're here to help you on your consciousness journey</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-600/20 p-3 rounded-xl flex-shrink-0">
                        <Mail className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email Us</h3>
                        <p className="text-gray-300 text-sm mb-2">General inquiries and support</p>
                        <a href="mailto:hello@isolakwamuntu.com" className="text-red-400 hover:text-red-300 text-sm">
                          hello@isolakwamuntu.com
                        </a>
                      </div>
                    </div>

                    {/* Support */}
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-600/20 p-3 rounded-xl flex-shrink-0">
                        <HeadphonesIcon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Technical Support</h3>
                        <p className="text-gray-300 text-sm mb-2">Platform and streaming issues</p>
                        <a href="mailto:support@isolakwamuntu.com" className="text-red-400 hover:text-red-300 text-sm">
                          support@isolakwamuntu.com
                        </a>
                      </div>
                    </div>

                    {/* Business */}
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-600/20 p-3 rounded-xl flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Business Inquiries</h3>
                        <p className="text-gray-300 text-sm mb-2">Partnerships and collaborations</p>
                        <a href="mailto:partnerships@isolakwamuntu.com" className="text-red-400 hover:text-red-300 text-sm">
                          partnerships@isolakwamuntu.com
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-600/20 p-3 rounded-xl flex-shrink-0">
                        <Clock className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Response Time</h3>
                        <p className="text-gray-300 text-sm">We typically respond within 24 hours</p>
                        <p className="text-gray-300 text-sm">Business hours: 9 AM - 6 PM EST</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-gray-700/50">
                    <h3 className="text-white font-semibold mb-4">Follow Our Journey</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-gray-800/50 p-3 rounded-xl hover:bg-red-600/20 transition-colors duration-300">
                        <svg className="w-5 h-5 text-gray-400 hover:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="#" className="bg-gray-800/50 p-3 rounded-xl hover:bg-red-600/20 transition-colors duration-300">
                        <svg className="w-5 h-5 text-gray-400 hover:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                      <a href="#" className="bg-gray-800/50 p-3 rounded-xl hover:bg-red-600/20 transition-colors duration-300">
                        <svg className="w-5 h-5 text-gray-400 hover:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-white font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-white font-semibold mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-white font-semibold mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Subscriptions</option>
                        <option value="content">Content Suggestions</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white font-semibold mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Please describe your inquiry in detail..."
                      />
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-blue-200 text-sm">
                        <strong>Note:</strong> For urgent technical issues affecting your streaming experience, 
                        please email support@isolakwamuntu.com directly for faster response.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <div className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Looking for Quick Answers?</h3>
                <p className="text-gray-300 mb-6">
                  Check out our frequently asked questions for instant solutions to common queries.
                </p>
                <a 
                  href="/faqs" 
                  className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>View FAQs</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
