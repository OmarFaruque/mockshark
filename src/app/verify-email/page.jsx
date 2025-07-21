'use client'

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const handleVerify = async () => {
    try {
      const res = await fetch(`https://mockshark-backend.vercel.app/api/v1/customer/auth/verify-email`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Email verified successfully!');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        toast.error(data?.message || 'Verification failed.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      handleVerify();
    }
  }, [userId]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Verifying your email...</h2>
      <ToastContainer />
    </div>
  );
};

// 👇 Main export wrapped in Suspense to allow useSearchParams
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
