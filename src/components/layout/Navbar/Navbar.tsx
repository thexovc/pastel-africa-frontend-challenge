"use client"

import Link from 'next/link';
import { useState } from 'react';
import { motion } from "motion/react";
import { DropdownMenu } from './DropdownMenu';
import { dropdownData } from './data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'product' | 'resources' | 'support' | null>(null);

  const handleDropdownClick = (dropdown: 'product' | 'resources' | 'support') => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <nav className="fixed w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-[#6E41E2] text-xl font-semibold">droip</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            {['product', 'resources', 'support'].map((type) => (
              <div key={type} className="relative group" onMouseOut={() => setActiveDropdown(null)}
                onMouseOver={() => handleDropdownClick(type as 'product' | 'resources' | 'support')}
              >
                <button
                  className="text-gray-700 hover:text-gray-900 inline-flex items-center capitalize"
                >
                  {type}
                  <motion.svg
                    animate={{ rotate: activeDropdown === type ? 180 : 0 }}
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <DropdownMenu
                  isOpen={activeDropdown === type}
                  type={type as 'product' | 'resources' | 'support'}
                  items={dropdownData[type].items}
                />
              </div>
            ))}
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900">
              Pricing
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
            <Link
              href="/get-started"
              className="bg-[#6E41E2] text-white px-4 py-2 rounded-full hover:bg-[#5a35b8]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/product" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
            Product
          </Link>
          <Link href="/resources" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
            Resources
          </Link>
          <Link href="/support" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
            Support
          </Link>
          <Link href="/pricing" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
            Login
          </Link>
          <Link
            href="/get-started"
            className="block px-3 py-2 bg-[#6E41E2] text-white rounded-full hover:bg-[#5a35b8] text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

