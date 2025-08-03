import React from 'react';
import Link from 'next/link';

// Social Media Icons as SVG components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.449 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer = () => {
  const footerLinks = {
    resources: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms & Conditions', href: '/terms-conditions' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    social: [
      { name: 'Facebook', icon: FacebookIcon, href: '#' },
      { name: 'Twitter', icon: TwitterIcon, href: '#' },
      { name: 'Instagram', icon: InstagramIcon, href: '#' },
      { name: 'YouTube', icon: YouTubeIcon, href: '#' },
    ],
  };

  return (
    <div className="bg-neutral border-t border-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 border border-red-400/30">
                  <div className="w-6 h-6 bg-white rounded-lg transition-all duration-300 group-hover:rounded-full"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-red-400">
                IsolaKwaMUNTU
              </span>
            </Link>
            <p className="mt-6 text-gray-400 leading-relaxed max-w-sm">
              Your premier destination for transformative African content. Watch unlimited movies, series, and documentaries that elevate consciousness and inspire spiritual growth.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-8">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 transition-all duration-300 group hover:scale-110 border border-gray-700/50 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/25"
                    aria-label={social.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-6 relative">
              Resources
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 transition-all duration-300 text-sm hover:translate-x-1 transform flex items-center group relative"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:shadow-sm group-hover:shadow-red-500"></span>
                    {link.name}
                    <span className="absolute inset-0 bg-red-500/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-6 relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 transition-all duration-300 text-sm hover:translate-x-1 transform flex items-center group relative"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:shadow-sm group-hover:shadow-red-500"></span>
                    {link.name}
                    <span className="absolute inset-0 bg-red-500/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-6 relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Subscribe to our newsletter for updates, exclusive content, and spiritual insights delivered to your inbox.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="bg-red-900 text-white px-4 py-2 hover:bg-red-800 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} IsolaKwaMUNTU. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-gray-600">|</span>
                <Link
                  href="/sitemap"
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors duration-300"
                >
                  Sitemap
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/accessibility"
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors duration-300"
                >
                  Accessibility
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Made with</span>
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <span className="text-gray-400 text-sm">for conscious living</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
