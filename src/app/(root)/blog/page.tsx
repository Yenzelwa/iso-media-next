'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, Tag, User, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'consciousness-expansion-journey',
    title: 'The Journey of Consciousness Expansion: Ancient Wisdom Meets Modern Science',
    excerpt: 'Explore how ancient spiritual practices align with contemporary neuroscience research to create profound pathways for consciousness expansion and personal transformation.',
    content: 'Full content would be here...',
    author: 'Dr. Amara Okafor',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Spirituality',
    tags: ['Consciousness', 'Neuroscience', 'Ancient Wisdom'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'meditation-practices-transformation',
    title: 'Sacred Meditation Practices for Daily Transformation',
    excerpt: 'Discover time-tested meditation techniques that can be seamlessly integrated into modern life for deeper awareness and spiritual growth.',
    content: 'Full content would be here...',
    author: 'Thabo Mthembu',
    date: '2024-12-10',
    readTime: '6 min read',
    category: 'Wellness',
    tags: ['Meditation', 'Mindfulness', 'Spiritual Practice'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ubuntu-philosophy-modern-world',
    title: 'Ubuntu Philosophy in the Modern Digital World',
    excerpt: 'Understanding how the African philosophy of Ubuntu - "I am because we are" - can guide our interactions in an increasingly connected yet disconnected world.',
    content: 'Full content would be here...',
    author: 'Nomsa Cele',
    date: '2024-12-05',
    readTime: '5 min read',
    category: 'Philosophy',
    tags: ['Ubuntu', 'Community', 'Digital Wellness'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'healing-power-storytelling',
    title: 'The Healing Power of Indigenous Storytelling',
    excerpt: 'Explore how traditional African storytelling serves as a powerful tool for healing, wisdom transmission, and community building.',
    content: 'Full content would be here...',
    author: 'Kofi Asante',
    date: '2024-11-28',
    readTime: '7 min read',
    category: 'Culture',
    tags: ['Storytelling', 'Healing', 'Indigenous Wisdom'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1544531586-fbb90ac5b939?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'plant-medicine-consciousness',
    title: 'Plant Medicine and Consciousness: A Sacred Relationship',
    excerpt: 'An exploration of the sacred relationship between humans and plant medicine in traditional healing practices and consciousness expansion.',
    content: 'Full content would be here...',
    author: 'Dr. Zuri Makena',
    date: '2024-11-20',
    readTime: '10 min read',
    category: 'Healing',
    tags: ['Plant Medicine', 'Traditional Healing', 'Consciousness'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

const categories = ['All', 'Spirituality', 'Wellness', 'Philosophy', 'Culture', 'Healing'];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <main className="pt-24 pb-20">
        <div className="px-4 lg:px-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Consciousness & Wisdom Blog
              </h1>
              <p className="text-gray-400 text-lg max-w-3xl">
                Explore transformational insights, ancient wisdom, and modern perspectives on consciousness expansion, 
                spiritual growth, and human potential.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-6 mb-12">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Tag className="w-6 h-6 mr-2 text-red-400" />
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl hover:border-red-500/30 transition-all duration-300 transform hover:scale-105">
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400 text-sm">{post.author}</span>
                            </div>
                            <span className="text-red-400 text-sm font-medium flex items-center group-hover:text-red-300">
                              Read More <ChevronRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Articles */}
            {regularPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-red-400" />
                  Recent Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl hover:border-red-500/30 transition-all duration-300 transform hover:scale-105">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-gray-800/80 text-gray-200 px-2 py-1 rounded-full text-xs">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center space-x-3 text-gray-400 text-xs mb-3">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">{post.author}</span>
                            <span className="text-red-400 text-xs font-medium flex items-center group-hover:text-red-300">
                              Read <ChevronRight className="w-3 h-3 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search terms or category filter.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-16">
              <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-2xl border border-red-500/30 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Stay Connected</h3>
                <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest insights on consciousness, spirituality, and human potential.
                </p>
                <Link 
                  href="#newsletter" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe Now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;