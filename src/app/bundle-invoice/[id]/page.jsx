'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BundleInvoicePage() {
  const { id } = useParams();
  const [invoiceHtml, setInvoiceHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bundle-invoice-orders/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to load bundle invoice');
        }

        setInvoiceHtml(data?.data?.invoiceHtml || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInvoice();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        🧾 Loading bundle invoice...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        ❌ {error}
      </div>
    );
  }

  if (!invoiceHtml) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No invoice found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black">
      <div dangerouslySetInnerHTML={{ __html: invoiceHtml }} />
    </div>
  );
}
