// src/components/layout/navbar.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EHR System</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/patients" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Patients
              </Link>
              <Link 
                href="/appointments" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Appointments
              </Link>
              <Link 
                href="/doctors" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Doctors
              </Link>
              <Link 
                href="/reports" 
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Reports
              </Link>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Link 
                href="/auth/login" 
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Patient Login
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
              {/* ✅ Admin Login Button */}
              <Link 
                href="/auth/admin-login" 
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium border border-red-500"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
            <Link
              href="/"
              className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/patients"
              className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Patients
            </Link>
            <Link
              href="/appointments"
              className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Appointments
            </Link>
            <Link
              href="/doctors"
              className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Doctors
            </Link>
            <Link
              href="/reports"
              className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              Reports
            </Link>
            
            {/* Mobile Login Section */}
            <div className="pt-4 pb-3 border-t border-blue-600">
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              >
                Patient Login
              </Link>
              <Link
                href="/auth/register"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              >
                Register
              </Link>
              {/* ✅ Admin Login in Mobile Menu */}
              <Link
                href="/auth/admin/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 mt-2"
              >
                🔒 Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
