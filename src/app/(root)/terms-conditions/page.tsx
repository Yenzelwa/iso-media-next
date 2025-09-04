import React from 'react';
import { FileText, AlertTriangle, CreditCard, Users, Gavel } from 'lucide-react';

const TermsConditionsPage = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      <main className="pt-24 pb-20">
        {/* Content */}
        <div className="px-4 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Terms & Conditions</h1>
              <p className="text-gray-400 text-sm">Last updated: December 2024</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 lg:p-12">
              
              {/* Important Notice */}
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 mb-12 backdrop-blur-sm border border-amber-500/30">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">Important Notice</h3>
                    <p className="text-amber-100 text-sm leading-relaxed">
                      These terms constitute a legally binding agreement between you and IsolaKwaMUNTU. 
                      Please read them carefully and contact us if you have any questions before proceeding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                
                {/* Acceptance of Terms */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Gavel className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        By accessing or using IsolaKwaMUNTU streaming services, you acknowledge that you have read, 
                        understood, and agree to be bound by these Terms & Conditions and our Privacy Policy.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        If you do not agree to these terms, you must not use our services. We reserve the right 
                        to modify these terms at any time, and continued use constitutes acceptance of such changes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Service Description */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Our Services</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16 space-y-6">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">Platform Access</h3>
                      <ul className="text-gray-300 space-y-2 leading-relaxed">
                        <li>• Streaming access to our curated library of spiritual and consciousness content</li>
                        <li>• Personalized recommendations based on your viewing preferences</li>
                        <li>• Multiple device compatibility (computers, tablets, smartphones, smart TVs)</li>
                        <li>• Offline viewing capabilities for select content (where available)</li>
                        <li>• Community features and user engagement tools</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">Content Standards</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Our platform focuses on consciousness expansion, spiritual growth, wellness, and educational content. 
                        All content is carefully curated to provide transformative experiences that support personal development 
                        and spiritual awakening.
                      </p>
                    </div>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-red-400 font-semibold mb-3">Account Security</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Maintain confidentiality of login credentials</li>
                            <li>• Use strong, unique passwords</li>
                            <li>• Notify us immediately of any security breaches</li>
                            <li>• Do not share account access with others</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-red-400 font-semibold mb-3">Acceptable Use</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Use services for personal, non-commercial purposes</li>
                            <li>• Respect intellectual property rights</li>
                            <li>• Maintain respectful community interactions</li>
                            <li>• Comply with all applicable laws and regulations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Subscription & Payment */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <CreditCard className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Subscription & Payment</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16 space-y-6">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">Subscription Plans</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        We offer various subscription tiers to meet different needs. All subscriptions are billed 
                        on a recurring basis (monthly or annually) until cancelled.
                      </p>
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Free Trial Period</h4>
                        <p className="text-gray-300 text-sm">
                          New users may be eligible for a free trial period. At the end of the trial, 
                          your subscription will automatically convert to a paid plan unless cancelled.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-red-400 mb-3">Payment Terms</h3>
                      <ul className="text-gray-300 space-y-2 leading-relaxed">
                        <li>• Payments are processed securely through trusted payment providers</li>
                        <li>• All fees are non-refundable except as required by law</li>
                        <li>• Prices may change with 30 days advance notice</li>
                        <li>• Failed payments may result in service suspension</li>
                        <li>• You may cancel your subscription at any time</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Prohibited Activities */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Prohibited Activities</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-red-600/10 rounded-xl p-6 border border-red-500/30">
                      <p className="text-gray-200 leading-relaxed mb-4">
                        The following activities are strictly prohibited and may result in immediate account termination:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-gray-300 space-y-2 text-sm">
                          <li>• Unauthorized sharing or distribution of content</li>
                          <li>• Circumventing security measures or access controls</li>
                          <li>• Using automated tools to access our services</li>
                          <li>• Reverse engineering or decompiling our software</li>
                        </ul>
                        <ul className="text-gray-300 space-y-2 text-sm">
                          <li>• Harassment or abuse of other users</li>
                          <li>• Posting inappropriate or offensive content</li>
                          <li>• Commercial use without explicit permission</li>
                          <li>• Any illegal or fraudulent activities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Gavel className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        IsolaKwaMUNTU provides services &quot;as is" without warranties of any kind. We strive to maintain 
                        high service availability but cannot guarantee uninterrupted access.
                      </p>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <p className="text-yellow-200 text-sm leading-relaxed">
                          <strong>Important:</strong> To the maximum extent permitted by law, our liability is limited 
                          to the amount you paid for the service in the 12 months preceding the claim. We are not liable 
                          for indirect, incidental, or consequential damages.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Questions & Support</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl p-6 border border-red-500/30">
                      <p className="text-gray-200 leading-relaxed mb-4">
                        If you have questions about these Terms & Conditions or need support, please contact us:
                      </p>
                      <div className="space-y-2">
                        <p className="text-white">
                          <strong>General Support:</strong> 
                          <span className="text-red-400 ml-2">support@isolakwamuntu.com</span>
                        </p>
                        <p className="text-white">
                          <strong>Legal Inquiries:</strong> 
                          <span className="text-red-400 ml-2">legal@isolakwamuntu.com</span>
                        </p>
                        <p className="text-gray-300 text-sm mt-4">
                          We will respond to your inquiry within 48 hours during business days.
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

export default TermsConditionsPage;
