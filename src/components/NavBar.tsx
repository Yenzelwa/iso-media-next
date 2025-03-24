'use client'

import Link from 'next/link';// Import the custom auth context
import logo from '../../public/logo.png'; // Assuming you still want to keep the logo
import { useAuth } from '../app/context/authContext';

const NavBar = () => {
  const { user, logout } = useAuth(); // Use the custom auth context
  const handleLogout = async () => {
    await logout(); // Logout using the custom logout function from the context
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between flex-wrap bg-dark p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          {/* <Image
            src={logo}
            alt="Logo"
            width={40} // Adjust width and height as per your logo's size
            height={40}
            className="mr-2"
          /> */}
          <Link href="/">
            <span className="font-semibold text-xl tracking-tight">IsolaKwaMUNTU</span>
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="lg:flex-grow text-sm font-semibold text-gray-900 uppercase dark:text-white">
            <Link
              href="/browse"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Browse
            </Link>
            <Link
              href="/series"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Series
            </Link>
            <Link
              href="/documentary"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Documentary
            </Link>
          </div>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.email}</span> {/* You can use user.email or user.name */}
              {/* Optionally, if user has a profile image */}
              {/* {user.image && (
                <img
                  src={user.image}
                  alt={user.email}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )} */}
              <button onClick={handleLogout} className="ml-4 text-red-500">
                Log out
              </button>
            </div>
          ) : (
            <div>
              <Link
                href="/account"
                className="inline-block font-semibold text-sm px-4 py-2 leading-none border rounded text-white border-red hover:border-transparent hover:text-teal-500 mt-4 lg:mt-0"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="inline-block font-semibold text-sm px-4 py-2 leading-none border rounded text-white border-red hover:border-transparent hover:text-teal-500 mt-4 ml-4 lg:mt-0"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export const dynamic = "force-dynamic"; // This ensures the Navbar re-renders dynamically
export default NavBar;
