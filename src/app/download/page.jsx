"use client";

import React, { useEffect, useState } from "react";
import { Download, Search, FileText } from "lucide-react";
import Cookies from "js-cookie";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { jsPDF } from "jspdf";


export default function DownloadPage() {
  const [downloads, setDownloads] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [loading, setLoading] = useState(true);
   const handleLicenseDownload = (productName) => {
  const license = licenses.find(
    (item) => item.productName === productName
  );

  if (!license) {
    alert("License not found for this product.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("Times", "Normal");
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(license.licenseText, 180);
  doc.text(lines, 15, 20);

  doc.save(`MockShark-License-${productName}.pdf`);
};







 useEffect(() => {
  const userId = Cookies.get("userId");
  if (!userId) return;

  const fetchData = async () => {
  try {
    const [downloadsRes, licensesRes] = await Promise.all([
      fetch(`https://mockshark-backend.vercel.app/api/v1/downloads?userId=${userId}`),
      fetch(`https://mockshark-backend.vercel.app/api/v1/licenses?userId=${userId}`)
    ]);

    const downloadsData = await downloadsRes.json();
    const licensesData = await licensesRes.json();

    if (downloadsData.success) {
      const uniqueDownloads = Array.from(
        new Map(downloadsData.data.map(item => [item.productId, item])).values()
      );
      setDownloads(uniqueDownloads);
    }

    if (licensesData.success) {
      const uniqueLicenses = Array.from(
        new Map(licensesData.data.map(item => [item.productName, item])).values()
      );
      setLicenses(uniqueLicenses);
    }

  } catch (error) {
    console.error("Error fetching data", error);
  } finally {
    setLoading(false);
  }
};


  fetchData();
}, []);




  const filteredDownloads = downloads.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLicenses = licenses.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
 if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center text-[#0f1c2e]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24">
          {/* Spinner Ring */}
          <div className="absolute inset-0 rounded-full border-[6px] border-blue-400 border-t-transparent animate-spin"></div>
          
          {/* Shark Emoji */}
          <span className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
            🦈
          </span>
        </div>

        {/* Brand Text */}
        <h2 className="text-2xl font-bold animate-pulse tracking-wide">
          MockShark is swimming your mockups...
        </h2>
        <p className="text-sm text-gray-500 animate-fadeIn">
          Please wait while we fetch your assets.
        </p>
      </div>
    </div>
  );
}

   if (!downloads.length && !licenses.length) {
    return (
      <div className="min-h-screen bg-white text-[#0f1c2e] flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">No Downloads Available</h2>
          <p className="text-gray-600">You have not downloaded any products yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen bg-white text-[#0f1c2e] ">
      <Navbar />

      {/* Search Bar */}
     <div className="px-4 py-6 bg-white/10 backdrop-blur-md rounded-md">
  <div className="max-w-6xl mx-auto">
    <div className="relative">
      <input
        type="text"
        placeholder="Search by Product Name..."
        className="w-full px-4 py-2 pr-12 rounded-full border border-gray-400 text-black placeholder-black bg-white/30 backdrop-blur-md focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
    </div>
  </div>
</div>


      {/* Product Download Table */}
      <div className="bg-gray-100 px-4 py-3 font-bold text-xl text-[#0f1c2e]">
        <div className="max-w-6xl mx-auto grid grid-cols-3">
          <div>Product</div>
          <div className="text-center">License</div>
          <div className="text-end">Download</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto divide-y divide-gray-200">
        {filteredDownloads.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 py-6 items-center">
            <div className="text-xl font-medium text-[#0f1c2e]">
              {item.productName}
            </div>
           <div className="flex justify-center">
  <Download
    className="text-[#0f1c2e] cursor-pointer hover:text-blue-600 transition"
    onClick={() => handleLicenseDownload(item.productName)}
  />
</div>

            <div className="flex justify-end">
              <a
                href={item.downloadUrl}
                download
                className="bg-[#192533] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0f1c2e] transition"
              >
                Download File
              </a>
            </div>
          </div>
        ))}
        {filteredDownloads?.length === 0 && (
    <div className="text-center py-10 text-gray-500 text-lg">
      No downloads found.
    </div>
  )}
      </div>

      {/* License Download Table */}
      {/* <div className="bg-gray-100 px-4 py-3 font-bold text-xl text-[#0f1c2e] mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-3">
          <div>Product</div>
          <div className="text-center">License Type</div>
          <div className="text-end">Download</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto divide-y divide-gray-200 mb-10">
        {filteredLicenses.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 py-6 items-center">
            <div className="text-xl font-medium text-[#0f1c2e]">
              {item.productName}
            </div>
            <div className="text-center">{item.licenseType}</div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const blob = new Blob([item.licenseText], {
                    type: "text/plain",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `MockShark-License-${item.productName}.txt`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-[#192533] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0f1c2e] transition"
              >
                Download License
              </button>
            </div>
          </div>
        ))}
      </div> */}

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
