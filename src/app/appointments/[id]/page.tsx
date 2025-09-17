// src/app/appointments/[id]/page.tsx
export default function AppointmentPage({ params }: { params: { id: string } }) {
  // Your component code
}

// Add this export to make it a module
export const dynamic = 'force-dynamic';