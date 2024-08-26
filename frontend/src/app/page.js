"use client";

import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token", "");
    router.push("/Auth/Login");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            TRAINING MODULES
          </div>
          <nav className="hidden md:flex space-x-10">
            <a href="/" className="text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a
              href="/training-modules"
              className="text-gray-800 hover:text-blue-600"
            >
              All Trainings Modules
            </a>
          </nav>
          <div className="hidden md:flex space-x-4">
            <button className="text-gray-800 hover:text-blue-600">
              <a
                href="Auth/Login"
                className="block px-4 py-2 text-gray-800 hover:text-blue-600"
              >
                Login
              </a>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              <a href="Auth/Register" className="block px-4 py-2 text-white">
                Sign up
              </a>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              <a href="Auth/Register" className="block px-4 py-2 text-white">
                Logout
              </a>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-200"
              >
                Home
              </a>
              <a
                href="/training-module"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-200"
              >
                All Trainings Modules
              </a>
              <a
                href="Auth/Login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-200"
              >
                Login
              </a>
              <a
                href="Auth/Register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-green-500 text-white hover:bg-green-600"
              >
                Sign up
              </a>

              <a
                onClick={handleLogout}
                href="Auth/Register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[calc(100vh-88px)]"
        style={{ backgroundImage: "url(/background_img.jpg)" }}
      >
        <div className="bg-black bg-opacity-45 absolute inset-0"></div>
        <div className="container mx-auto px-4 py-24 relative z-10 text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Welcome to Training Modules
          </h1>
          <p className="text-lg md:text-xl">
            Enhance your skills with our modules.
          </p>
        </div>
      </section>
    </div>
  );
}
