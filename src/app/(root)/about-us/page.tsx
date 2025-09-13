import React from 'react';
import Link from 'next/link';
import { Heart, Users, Target, Award, Globe, Lightbulb } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      <main className="pt-24 pb-20">
        {/* Content */}
        <div className="px-4 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">About Us</h1>
              <p className="text-gray-400 text-sm">Transforming consciousness through curated content</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 lg:p-12">
              
              <div className="space-y-12">
                
                {/* Our Mission */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Target className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed text-lg mb-4">
                        At IsolaKwaMUNTU, we believe in the transformative power of consciousness-expanding content. 
                        The mission is to create a sacred digital space where seekers of truth, wisdom, and spiritual 
                        growth can access carefully curated content that illuminates the path to awakening.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        We are dedicated to preserving and sharing ancient wisdom while embracing modern insights 
                        into human consciousness, wellness, and the deeper mysteries of existence.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Our Story */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Heart className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        IsolaKwaMUNTU was born from a vision to bridge the gap between ancient wisdom and modern 
                        technology. Founded by consciousness explorers and spiritual practitioners, our platform 
                        emerged from the recognition that authentic transformational content was scattered across 
                        the digital landscape.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        "IsolaKwaMUNTU" means "Island of Humanity" in Zulu, reflecting our commitment to creating 
                        a sanctuary for human consciousness exploration in our increasingly digital world.
                      </p>
                      <div className="bg-red-600/10 rounded-lg p-4 border border-red-500/20">
                        <p className="text-red-200 text-sm leading-relaxed italic">
                          "We envision a world where spiritual wisdom is accessible to all, where consciousness 
                          expansion is supported by community, and where technology serves the highest good of humanity."
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Our Values */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Award className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-red-600/20 p-2 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-red-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-red-400">Authenticity</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          We curate content from authentic teachers, practitioners, and researchers who embody 
                          the wisdom they share. Every piece of content is verified for integrity and transformational value.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-red-600/20 p-2 rounded-lg">
                            <Globe className="w-5 h-5 text-red-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-red-400">Accessibility</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Spiritual wisdom should be available to all seekers, regardless of background or 
                          circumstance. We strive to make transformational content accessible and affordable.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-red-600/20 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-red-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-red-400">Community</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          We believe in the power of conscious community. Our platform fosters connections 
                          between like-minded souls on the journey of awakening and personal transformation.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-red-600/20 p-2 rounded-lg">
                            <Heart className="w-5 h-5 text-red-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-red-400">Integrity</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          We operate with complete transparency, respect for intellectual property, and 
                          commitment to ethical practices in all aspects of our business and content curation.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* What We Offer */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Globe className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-red-400" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">Documentary Series</h4>
                          <p className="text-gray-300 text-sm">
                            Thought-provoking documentaries exploring consciousness, spirituality, and human potential.
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lightbulb className="w-8 h-8 text-red-400" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">Educational Content</h4>
                          <p className="text-gray-300 text-sm">
                            Deep-dive courses and teachings from renowned spiritual teachers and consciousness researchers.
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="bg-red-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-red-400" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">Wellness Practices</h4>
                          <p className="text-gray-300 text-sm">
                            Guided meditations, healing practices, and wellness techniques for holistic well-being.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Our Team */}
                <section>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-600/20 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Our team consists of consciousness researchers, spiritual practitioners, content creators, 
                        and technology experts who share a common passion for human awakening and transformation.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-red-400 font-semibold mb-3">Content Curation Team</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Spiritual teachers and practitioners</li>
                            <li>• Consciousness researchers</li>
                            <li>• Documentary producers</li>
                            <li>• Wellness experts</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-red-400 font-semibold mb-3">Technology & Support</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Platform developers</li>
                            <li>• User experience designers</li>
                            <li>• Community managers</li>
                            <li>• Customer support specialists</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Join Our Journey */}
                <section>
                  <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl p-8 border border-red-500/30 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-red-600/30 p-3 rounded-full">
                        <Heart className="w-8 h-8 text-red-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Join Our Journey</h3>
                    <p className="text-gray-200 leading-relaxed mb-6 max-w-2xl mx-auto">
                      We invite you to become part of our conscious community. Whether you're beginning your 
                      spiritual journey or are a seasoned practitioner, IsolaKwaMUNTU offers content and 
                      connections to support your path of awakening.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link 
                        href="/register" 
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-center"
                      >
                        Start Your Journey
                      </Link>
                      <Link 
                        href="/contact-us" 
                        className="border-2 border-red-500 text-red-400 hover:bg-red-500/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-red-400 text-center"
                      >
                        Contact Us
                      </Link>
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

export default AboutUsPage;
