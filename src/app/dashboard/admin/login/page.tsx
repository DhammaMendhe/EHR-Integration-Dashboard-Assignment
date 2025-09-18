// src/app/admin/login/page.tsx
import AdminLoginForm from '@/components/forms/admin-login'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <AdminLoginForm />
      </div>
    </div>
  )
}
