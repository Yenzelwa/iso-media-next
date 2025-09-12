'use client'
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart, MessageCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

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
  image: string;
}

// Sample blog post data (in a real app, this would come from an API or CMS)
const blogPosts: { [key: string]: BlogPost } = {
  'consciousness-expansion-journey': {
    id: 'consciousness-expansion-journey',
    title: 'The Journey of Consciousness Expansion: Ancient Wisdom Meets Modern Science',
    excerpt: 'Explore how ancient spiritual practices align with contemporary neuroscience research to create profound pathways for consciousness expansion and personal transformation.',
    content: `
      <p>In the intersection between ancient wisdom traditions and cutting-edge neuroscience research, we find remarkable convergences that illuminate the path of consciousness expansion. For millennia, spiritual teachers and mystics have described states of heightened awareness, interconnectedness, and transcendence that modern science is now beginning to understand and validate.</p>

      <h2>The Neuroscience of Consciousness</h2>
      <p>Recent advances in neuroimaging technology have allowed researchers to observe the brain during various states of consciousness. Studies on meditation practitioners show measurable changes in brain structure and function, including increased gray matter density in areas associated with learning, memory, and emotional regulation.</p>

      <p>Dr. Richard Davidson's groundbreaking research at the University of Wisconsin has demonstrated that even short-term meditation practice can lead to significant changes in brain activity patterns. These findings echo what contemplative traditions have taught for centuries: that consciousness is malleable and can be trained.</p>

      <h2>Ancient Practices, Modern Validation</h2>
      <p>Traditional practices such as mindfulness meditation, breathwork, and contemplative prayer are showing remarkable efficacy in promoting mental health, emotional resilience, and cognitive enhancement. The Ubuntu philosophy's emphasis on interconnectedness aligns with neuroscientific discoveries about the brain's default mode network and our inherent social nature.</p>

      <blockquote>
        "The privilege of a lifetime is being who you are." - Joseph Campbell
      </blockquote>

      <p>Indigenous wisdom keepers have long understood that healing and transformation occur not just at the individual level, but within the context of community and relationship with the natural world. This holistic approach is now being embraced by integrative medicine and psychology.</p>

      <h2>Practical Applications</h2>
      <p>Integrating these insights into daily life doesn't require retreating to a monastery or laboratory. Simple practices such as:</p>

      <ul>
        <li>Daily mindfulness meditation (even 10 minutes can make a difference)</li>
        <li>Breathwork practices from various traditions</li>
        <li>Time in nature and contemplation</li>
        <li>Community engagement and service to others</li>
        <li>Study of wisdom traditions from around the world</li>
      </ul>

      <p>These practices can serve as bridges between ancient wisdom and modern understanding, offering practical pathways for consciousness expansion that are both scientifically supported and spiritually nourishing.</p>

      <h2>The Journey Continues</h2>
      <p>As we continue to explore the frontiers of consciousness, we're reminded that the journey of awakening is both deeply personal and universally shared. The convergence of ancient wisdom and modern science offers unprecedented opportunities for understanding the full potential of human consciousness.</p>

      <p>Whether through the lens of neuroscience or the teachings of spiritual masters, one truth emerges clearly: consciousness is not fixed, and the potential for growth, healing, and transformation remains available to all who earnestly seek it.</p>
    `,
    author: 'Dr. Amara Okafor',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Spirituality',
    tags: ['Consciousness', 'Neuroscience', 'Ancient Wisdom'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
  // Additional blog posts would be added here
};

// Related posts (simplified - in a real app, this would be more sophisticated)
const relatedPosts = [
  {
    id: 'meditation-practices-transformation',
    title: 'Sacred Meditation Practices for Daily Transformation',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ubuntu-philosophy-modern-world',
    title: 'Ubuntu Philosophy in the Modern Digital World',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <main className="pt-24 pb-20">
        <div className="px-4 lg:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Back Navigation */}
            <Link 
              href="/blog"
              className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            {/* Hero Section */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-red-600/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-800/60 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Social Actions */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-700/50">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75'
                }}
              />
            </div>

            {/* Author Bio */}
            <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">About {post.author}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    A consciousness researcher and spiritual teacher with over 15 years of experience in bridging 
                    ancient wisdom traditions with modern scientific understanding. Dedicated to helping others 
                    discover their full potential through transformational practices and insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Tag className="w-6 h-6 mr-2 text-red-400" />
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.id}`}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden hover:border-red-500/30 transition-all duration-300 transform hover:scale-105">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                          {relatedPost.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;