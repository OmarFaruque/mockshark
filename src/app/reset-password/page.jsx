'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('https://mockshark-backend.vercel.app/api/v1/reset-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    })

    const data = await res.json()
    if (res.ok) {
      toast.success('✅ Password reset successful!')
      setTimeout(() => router.push('/login'), 1500)
    } else {
      toast.error(data.message || '❌ Failed to reset password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Set New Password
        </button>
      </form>
    </div>
  )
}
