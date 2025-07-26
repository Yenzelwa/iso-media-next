
'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle } from 'lucide-react';

const FAQsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'What is IsolaKwaMUNTU?',
      answer: 'IsolaKwaMUNTU is a premium streaming platform dedicated to consciousness-expanding content. We curate documentaries, series, and educational content focused on spirituality, wellness, personal development, and human consciousness exploration.'
    },
    {
      id: 2,
      category: 'subscription',
      question: 'How much does a subscription cost?',
      answer: 'We offer flexible subscription plans to suit different needs. Our basic plan starts at $9.99/month, with premium plans offering additional features like offline viewing and exclusive content. We also offer annual subscriptions with significant savings.'
    },
    {
      id: 3,
      category: 'subscription',
      question: 'Do you offer a free trial?',
      answer: 'Yes! New users get a 7-day free trial to explore our content library. You can cancel anytime during the trial period without being charged. After the trial, your subscription will automatically continue unless cancelled.'
    },
    {
      id: 4,
      category: 'technical',
      question: 'What devices can I watch on?',
      answer: 'IsolaKwaMUNTU is compatible with most modern devices including computers (Windows, Mac, Linux), smartphones and tablets (iOS, Android), smart TVs, and streaming devices like Roku, Apple TV, and Chromecast.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'Can I download content for offline viewing?',
      answer: 'Yes, premium subscribers can download select content for offline viewing on mobile devices and tablets. Downloaded content is available for 30 days and must be watched within 48 hours once started.'
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime through your account settings. Go to Account > Subscription > Cancel Subscription. Your access will continue until the end of your current billing period.'
    },
    {
      id: 7,
      category: 'account',
      question: 'Can I share my account with family?',
      answer: 'Our family plans allow up to 4 simultaneous streams and 6 user profiles. Each profile can have personalized recommendations and viewing history. Account sharing outside your household violates our terms of service.'
    },
    {
      id: 8,
      category: 'content',
      question: 'How often is new content added?',
      answer: 'We add new content weekly, including both original productions and carefully curated content from spiritual teachers and consciousness researchers worldwide. Premium subscribers get early access to exclusive releases.'
    },
    {
      id: 9,
      category: 'content',
      question: 'Can I request specific content?',
      answer: 'Absolutely! We value community input and regularly review content requests. You can submit suggestions through your account dashboard or contact us directly. Popular requests are prioritized in our curation process.'
    },
    {
      id: 10,
      category: 'technical',
      question: 'What internet speed do I need?',
      answer: 'For standard definition (SD): 3 Mbps, High definition (HD): 5 Mbps, Ultra-high definition (4K): 15 Mbps. We automatically adjust quality based on your connection speed for optimal viewing experience.'
    },
    {
      id: 11,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets like Apple Pay and Google Pay. Payments are processed securely through industry-leading payment processors.'
    },
    {
      id: 12,
      category: 'billing',
      question: 'Can I get a refund?',
      answer: 'We offer refunds within 30 days of subscription for annual plans if you\'re not satisfied. Monthly subscriptions are generally non-refundable, but we handle special circumstances on a case-by-case basis.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqData.length },
    { id: 'general', name: 'General', count: faqData.filter(faq => faq.category === 'general').length },
    { id: 'subscription', name: 'Subscription', count: faqData.filter(faq => faq.category === 'subscription').length },
    { id: 'technical', name: 'Technical', count: faqData.filter(faq => faq.category === 'technical').length },
    { id: 'account', name: 'Account', count: faqData.filter(faq => faq.category === 'account').length },
    { id: 'content', name: 'Content', count: faqData.filter(faq => faq.category === 'content').length },
    { id: 'billing', name: 'Billing', count: faqData.filter(faq => faq.category === 'billing').length }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      <main className="pt-24 pb-20">
        {/* Content */}
        <div className="px-4 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Frequently Asked Questions</h1>
              <p className="text-gray-400 text-sm">Find answers to common questions about our platform</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-6 mb-8">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                  <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden transition-all duration-300 hover:border-red-500/30"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                        {openFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {openFAQ === faq.id && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-700/30">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-12">
              <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-2xl border border-red-500/30 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Still Need Help?</h3>
                <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                  Can't find the answer you're looking for? Our support team is here to help you with any 
                  questions about your IsolaKwaMUNTU experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact-us" 
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Contact Support</span>
                  </a>
                  <a 
                    href="mailto:support@isolakwamuntu.com" 
                    className="inline-flex items-center justify-center space-x-2 border-2 border-red-500 text-red-400 hover:bg-red-500/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-6">Popular Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:border-red-500/30 transition-colors duration-300">
                  <h4 className="text-red-400 font-semibold mb-2">Getting Started</h4>
                  <p className="text-gray-300 text-sm">Learn how to set up your account and start your consciousness journey</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:border-red-500/30 transition-colors duration-300">
                  <h4 className="text-red-400 font-semibold mb-2">Content Library</h4>
                  <p className="text-gray-300 text-sm">Discover our curated collection of transformational content</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:border-red-500/30 transition-colors duration-300">
                  <h4 className="text-red-400 font-semibold mb-2">Troubleshooting</h4>
                  <p className="text-gray-300 text-sm">Resolve common technical issues and optimize your viewing experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQsPage;
