// src/app/patients/page.tsx
import Link from 'next/link'

export default function PatientsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Patient Management System</h1>
            <p className="text-lg text-gray-600 mb-6">
              Search, view, and manage patient records securely
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/patients/search"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Search Patients
              </Link>
              <Link
                href="/patients/new"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Add New Patient
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Search</h3>
            <p className="text-gray-600 mb-4">
              Search patients by name, ID, email, or phone number
            </p>
            <Link href="/patients/search" className="text-blue-600 hover:underline">
              Search Now →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Records</h3>
            <p className="text-gray-600 mb-4">
              Access comprehensive medical history and records
            </p>
            <Link href="/medical-records" className="text-blue-600 hover:underline">
              View Records →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Registration</h3>
            <p className="text-gray-600 mb-4">
              Register new patients with complete information
            </p>
            <Link href="/register" className="text-blue-600 hover:underline">
              Register →
            </Link>
          </div>
        </div>

        {/* Note for Authentication */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Authentication Required</h3>
              <p className="text-yellow-700">
                Please <Link href="/login" className="underline">login</Link> to access patient management features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




