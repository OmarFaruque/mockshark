'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id'); // ✅ now using id

 const handleVerify = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/v1/customer/auth/verify-email`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Email verified successfully!');
      
      // Wait 2 seconds before redirecting
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
      console.log("Verifying userId:", userId); // ✅ optional debug
      handleVerify();
    }
  }, [userId]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Verifying your email...</h2>
      <ToastContainer/>
    </div>
  );
};

export default VerifyEmailPage;
