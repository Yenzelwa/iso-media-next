'use client'
import React, { useState } from 'react';
import { Shield, Cookie, Settings, Eye, Database, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const CookiesPage = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'what-are-cookies': false,
    'how-we-use': false,
    'types-of-cookies': false,
    'third-party': false,
    'managing-cookies': false,
    'updates': false
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <main className="pt-24 pb-20">
        <div className="px-4 lg:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Cookie Policy</h1>
              <p className="text-gray-400 text-sm">Last updated: December 2024</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 lg:p-12">
              
              {/* Introduction */}
              <div className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-red-600/20 p-3 rounded-xl">
                    <Cookie className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Introduction</h2>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    This Cookie Policy explains how IsolaKwaMUNTU ("we," "us," or "our") uses cookies and similar 
                    technologies when you visit our website or use our streaming services. This policy helps you 
                    understand what cookies are, how we use them, and what choices you have regarding their use.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    By using our services, you consent to the use of cookies as described in this policy. 
                    We are committed to transparency about our data practices and your privacy rights.
                  </p>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-gray-800/50 rounded-2xl p-6 mb-12 backdrop-blur-sm border border-gray-700/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-red-500" />
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="#what-are-cookies" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ What Are Cookies?</a>
                  <a href="#how-we-use" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ How We Use Cookies</a>
                  <a href="#types-of-cookies" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Types of Cookies</a>
                  <a href="#third-party" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Third-Party Cookies</a>
                  <a href="#managing-cookies" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Managing Cookies</a>
                  <a href="#updates" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Policy Updates</a>
                </div>
              </div>

              {/* Cookie Sections */}
              <div className="space-y-6">
                
                {/* What Are Cookies */}
                <section id="what-are-cookies">
                  <div 
                    className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden cursor-pointer"
                    onClick={() => toggleSection('what-are-cookies')}
                  >
                    <div className="p-6 flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <Database className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">What Are Cookies?</h3>
                      </div>
                      {openSections['what-are-cookies'] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {openSections['what-are-cookies'] && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 space-y-4">
                          <p className="text-gray-300 leading-relaxed">
                            Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                            when you visit a website. They contain information that helps websites remember your 
                            preferences and improve your browsing experience.
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            Cookies cannot access, read, or modify any other data on your device. They are widely 
                            used by websites to enhance functionality, analyze traffic, and personalize content.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* How We Use Cookies */}
                <section id="how-we-use">
                  <div 
                    className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden cursor-pointer"
                    onClick={() => toggleSection('how-we-use')}
                  >
                    <div className="p-6 flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <Settings className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">How We Use Cookies</h3>
                      </div>
                      {openSections['how-we-use'] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {openSections['how-we-use'] && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 space-y-4">
                          <p className="text-gray-300 leading-relaxed">
                            We use cookies for several purposes to enhance your experience on IsolaKwaMUNTU:
                          </p>
                          <ul className="text-gray-300 space-y-2 ml-4">
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Remember your login status and preferences</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Personalize content recommendations based on your viewing history</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Analyze website performance and user behavior to improve our services</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Enable essential website functionality and security features</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Remember your playback position in videos and series</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Types of Cookies */}
                <section id="types-of-cookies">
                  <div 
                    className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden cursor-pointer"
                    onClick={() => toggleSection('types-of-cookies')}
                  >
                    <div className="p-6 flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <Shield className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Types of Cookies We Use</h3>
                      </div>
                      {openSections['types-of-cookies'] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {openSections['types-of-cookies'] && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 space-y-6">
                          <div>
                            <h4 className="text-red-400 font-semibold mb-2">Essential Cookies</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              These cookies are necessary for the website to function properly. They enable core 
                              functionality such as security, network management, and accessibility.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-red-400 font-semibold mb-2">Performance Cookies</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              These cookies collect information about how you use our website, helping us understand 
                              which pages are most popular and how users navigate our platform.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-red-400 font-semibold mb-2">Functional Cookies</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              These cookies allow us to remember your preferences and provide enhanced features like 
                              personalized content recommendations and language preferences.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-red-400 font-semibold mb-2">Targeting Cookies</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              These cookies may be used to deliver advertising relevant to your interests and track 
                              the effectiveness of our marketing campaigns.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Third-Party Cookies */}
                <section id="third-party">
                  <div 
                    className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden cursor-pointer"
                    onClick={() => toggleSection('third-party')}
                  >
                    <div className="p-6 flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <Eye className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Third-Party Cookies</h3>
                      </div>
                      {openSections['third-party'] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {openSections['third-party'] && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 space-y-4">
                          <p className="text-gray-300 leading-relaxed">
                            We may use third-party services that place cookies on your device. These include:
                          </p>
                          <ul className="text-gray-300 space-y-2 ml-4">
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Analytics services (Google Analytics) to understand website usage</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Payment processors for secure transaction handling</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Content delivery networks for improved streaming performance</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              <span>Social media platforms for content sharing features</span>
                            </li>
                          </ul>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            These third parties have their own privacy policies and cookie practices. We recommend 
                            reviewing their policies to understand how they handle your data.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Managing Cookies */}
                <section id="managing-cookies">
                  <div 
                    className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden cursor-pointer"
                    onClick={() => toggleSection('managing-cookies')}
                  >
                    <div className="p-6 flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <Settings className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Managing Your Cookie Preferences</h3>
                      </div>
                      {openSections['managing-cookies'] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {openSections['managing-cookies'] && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 space-y-4">
                          <p className="text-gray-300 leading-relaxed">
                            You have several options for managing cookies:
                          </p>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-red-400 font-semibold mb-2">Browser Settings</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Most web browsers allow you to control cookies through their settings. You can set 
                                your browser to refuse cookies or delete existing ones. However, this may affect 
                                website functionality.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-red-400 font-semibold mb-2">Account Preferences</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                When logged into your IsolaKwaMUNTU account, you can adjust privacy settings and 
                                opt out of certain data collection practices in your account settings.
                              </p>
                            </div>
                            <div>
                              <h4 className="text-red-400 font-semibold mb-2">Third-Party Opt-Outs</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                You can opt out of certain third-party cookies by visiting the respective 
                                companies' privacy pages and following their opt-out instructions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Policy Updates */}
                <section id="updates">
                  <div 
                    className="bg-gray-800/30 rounded-xl border border-gray-700/30 overflow-hidden cursor-pointer"
                    onClick={() => toggleSection('updates')}
                  >
                    <div className="p-6 flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-600/20 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Policy Updates</h3>
                      </div>
                      {openSections['updates'] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {openSections['updates'] && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 space-y-4">
                          <p className="text-gray-300 leading-relaxed">
                            We may update this Cookie Policy from time to time to reflect changes in our practices 
                            or for legal, operational, or regulatory reasons.
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            When we make changes, we will update the "Last updated" date at the top of this policy. 
                            We encourage you to review this policy periodically to stay informed about how we use cookies.
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            For significant changes, we may provide additional notice through our website or email 
                            notifications to registered users.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

              </div>

              {/* Contact Section */}
              <div className="mt-12">
                <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-2xl border border-red-500/30 p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Questions About Our Cookie Policy?</h3>
                  <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                    If you have any questions about how we use cookies or this policy, please don't hesitate 
                    to contact our privacy team. We're here to help you understand your options and rights.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/contact-us" 
                      className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Contact Privacy Team
                    </a>
                    <a 
                      href="mailto:privacy@isolakwamuntu.com" 
                      className="inline-flex items-center justify-center border-2 border-red-500 text-red-400 hover:bg-red-500/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Email Us
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CookiesPage;