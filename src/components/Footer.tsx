

"use client";
import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  const footerLinks = {
    resources: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    social: [
      { name: 'Facebook', icon: FaFacebookF, href: '#' },
      { name: 'Twitter', icon: FaTwitter, href: '#' },
      { name: 'Instagram', icon: FaInstagram, href: '#' },
      { name: 'YouTube', icon: FaYoutube, href: '#' },
    ],
  };

  return (
    <footer className="bg-neutral border-t border-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold text-white">
                IsolaKwaMUNTU
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray">
              Your premier destination for African content. Watch unlimited movies, series, and documentaries anytime, anywhere.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray hover:text-red transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray hover:text-red transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray mb-4">
              Subscribe to our newsletter for updates and exclusive content.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-neutral border border-neutral rounded-md text-white placeholder-gray focus:outline-none focus:border-red transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red text-white rounded-md hover:bg-red transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 bg-neutral border-t border-neutral">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-neutral rounded-full hover:bg-red transition-colors duration-200 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray group-hover:text-white" />
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-gray">
                © {new Date().getFullYear()} IsolaKwaMUNTU. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gray">|</span>
                <Link
                  href="/sitemap"
                  className="text-sm text-gray hover:text-red-500 transition-colors duration-200"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// import { Logo } from './Logo';

// export const Footer = () => {
//   return (
//     <footer className="flex flex-wrap justify-between items-center p-4 bg-neutral-900">
//       <div className="px-4 py-8 mx-auto w-full max-w-screen-xl">
//         <div className="flex justify-between">
//           <div className="flex shrink-0 items-center mr-6 text-sm leading-5">
//             <Logo />
//             <span className="text-xl font-semibold tracking-tight leading-7">
//               IsolaKwaMUNTU
//             </span>
//           </div>
//           <nav className="grid gap-6">
//             <div>
//               <h2 className="mb-6 text-sm font-semibold leading-5 uppercase">
//                 Resources
//               </h2>
//               <ul className="font-medium">
//                 <li className="mb-4"><a href="#about">About Us</a></li>
//                 <li className="mb-4"><a href="#contact">Contact Us</a></li>
//                 <li className="mb-4"><a href="#faq">FAQs</a></li>
//               </ul>
//             </div>
//             <div>
//               <h2 className="mb-6 text-sm font-semibold leading-5 uppercase">
//                 Legal
//               </h2>
//               <ul className="font-medium">
//                 <li className="mb-4"><a href="#privacy">Privacy Policy</a></li>
//                 <li><a href="#terms">Terms & Conditions</a></li>
//               </ul>
//             </div>
//           </nav>
//         </div>
//         <hr className="mx-auto my-8 h-0 border-t border-red-900" />
//         <div className="flex justify-between items-center">
//           <span className="text-sm leading-5 text-center">© 2023</span>
//           <div className="flex justify-center gap-5">
//             <a href="#facebook" aria-label="Facebook">
//               <svg className="w-4 h-4 fill-white" viewBox="0 0 8 19">
//                 <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" />
//               </svg>
//             </a>
//             <a href="#twitter" aria-label="Twitter">
//               <svg className="w-4 h-4 fill-white" viewBox="0 0 20 17">
//                 <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" />
//               </svg>
//             </a>
//             <a href="#dribbble" aria-label="Dribbble">
//               <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
