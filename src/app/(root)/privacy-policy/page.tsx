
import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Calendar } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      <main className="pt-24 pb-20">
        {/* Content */}
        <div className="px-4 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Privacy Policy</h1>
              <p className="text-gray-400 text-sm">Last updated: December 2024</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 lg:p-12">
              
              {/* Quick Navigation */}
              <div className="bg-gray-800/50 rounded-2xl p-6 mb-12 backdrop-blur-sm border border-gray-700/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-red-500" />
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="#information-collection" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Information We Collect</a>
                  <a href="#information-use" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ How We Use Information</a>
                  <a href="#information-sharing" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Information Sharing</a>
                  <a href="#data-security" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Data Security</a>
                  <a href="#user-rights" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Your Rights</a>
                  <a href="#contact" className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm">→ Contact Us</a>
                </div>
              </div>

              <div className="space-y-12">
                
                {/* Information We Collect */}
                <section id="information-collection">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Database className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16 space-y-6">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">Personal Information</h3>
                      <ul className="text-gray-300 space-y-2 leading-relaxed">
                        <li>• Name, email address, and contact information when you register</li>
                        <li>• Payment information for subscription services</li>
                        <li>• Profile preferences and viewing history</li>
                        <li>��� Communication preferences and settings</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">Usage Information</h3>
                      <ul className="text-gray-300 space-y-2 leading-relaxed">
                        <li>• Device information and browser type</li>
                        <li>• IP address and location data</li>
                        <li>• Viewing patterns and content preferences</li>
                        <li>• Platform interaction and engagement metrics</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section id="information-use">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Lock className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <ul className="text-gray-300 space-y-3 leading-relaxed">
                        <li className="flex items-start">
                          <span className="text-red-400 mr-3">•</span>
                          <span><strong className="text-white">Service Delivery:</strong> To provide, maintain, and improve our streaming platform and content recommendations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-3">•</span>
                          <span><strong className="text-white">Personalization:</strong> To customize your viewing experience and suggest relevant content</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-3">•</span>
                          <span><strong className="text-white">Communication:</strong> To send important updates, newsletters, and promotional content (with your consent)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-3">•</span>
                          <span><strong className="text-white">Analytics:</strong> To analyze usage patterns and improve our services</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-3">•</span>
                          <span><strong className="text-white">Security:</strong> To protect against fraud, abuse, and security threats</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Information Sharing */}
                <section id="information-sharing">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Shield className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:
                      </p>
                      <ul className="text-gray-300 space-y-2 leading-relaxed">
                        <li>• With your explicit consent</li>
                        <li>• With trusted service providers who help us operate our platform</li>
                        <li>• When required by law or to protect our legal rights</li>
                        <li>• In case of business transfer or merger (with prior notice)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Lock className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We implement industry-standard security measures to protect your personal information:
                      </p>
                      <ul className="text-gray-300 space-y-2 leading-relaxed">
                        <li>• SSL encryption for all data transmission</li>
                        <li>• Secure data storage with access controls</li>
                        <li>• Regular security audits and updates</li>
                        <li>• Employee training on data protection</li>
                        <li>• Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="user-rights">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Eye className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        You have the following rights regarding your personal data:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <h4 className="text-red-400 font-semibold mb-2">Access & Portability</h4>
                          <p className="text-gray-300 text-sm">Request a copy of your personal data and download your information</p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <h4 className="text-red-400 font-semibold mb-2">Correction</h4>
                          <p className="text-gray-300 text-sm">Update or correct inaccurate personal information</p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <h4 className="text-red-400 font-semibold mb-2">Deletion</h4>
                          <p className="text-gray-300 text-sm">Request deletion of your personal data (subject to legal requirements)</p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <h4 className="text-red-400 font-semibold mb-2">Opt-out</h4>
                          <p className="text-gray-300 text-sm">Unsubscribe from marketing communications at any time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact */}
                <section id="contact">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl p-6 border border-red-500/30">
                      <p className="text-gray-200 leading-relaxed mb-4">
                        If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                      </p>
                      <div className="space-y-2">
                        <p className="text-white">
                          <strong>Email:</strong> 
                          <span className="text-red-400 ml-2">privacy@isolakwamuntu.com</span>
                        </p>
                        <p className="text-white">
                          <strong>Data Protection Officer:</strong> 
                          <span className="text-red-400 ml-2">dpo@isolakwamuntu.com</span>
                        </p>
                        <p className="text-gray-300 text-sm mt-4">
                          We will respond to your inquiry within 30 days of receipt.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
