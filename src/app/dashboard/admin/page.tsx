// src/app/admin/dashboard/page.tsx
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/patients" className="bg-blue-50 p-6 rounded-lg hover:shadow-md">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Manage Patients</h3>
          <p className="text-blue-700">Create, view, edit, and delete patient records</p>
        </Link>

        <Link href="/admin/users" className="bg-green-50 p-6 rounded-lg hover:shadow-md">
          <h3 className="text-xl font-semibold text-green-900 mb-2">Manage Staff</h3>
          <p className="text-green-700">Add doctors, nurses, and administrative staff</p>
        </Link>

        <Link href="/admin/reports" className="bg-purple-50 p-6 rounded-lg hover:shadow-md">
          <h3 className="text-xl font-semibold text-purple-900 mb-2">View Reports</h3>
          <p className="text-purple-700">Generate and view system reports</p>
        </Link>
      </div>
    </div>
  )
}
