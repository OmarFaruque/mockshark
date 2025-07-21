'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function InvoicePage() {
  const { id } = useParams();
  const [invoiceHtml, setInvoiceHtml] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`https://mockshark-backend.vercel.app/orders/${id}`);
        const data = await res.json();
        setInvoiceHtml(data?.data?.invoiceHtml); // assuming { data: { invoiceHtml: "<p>...</p>" } }
      } catch (err) {
        console.error('Error loading invoice:', err);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoiceHtml) {
    return <div className="p-8 text-center">Loading invoice...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black">
      <div dangerouslySetInnerHTML={{ __html: invoiceHtml }} />
    </div>
  );
}
