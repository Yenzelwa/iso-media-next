'use client';

import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/authContext";

const AccountNav = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    // await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-95 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-12 py-12">
        <div className="flex justify-between items-center">
 
        </div>
      </div>
    </nav>
  );
};

export default AccountNav;
