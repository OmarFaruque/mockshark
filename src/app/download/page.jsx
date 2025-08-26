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

  // New states for license selector modal
  const [showLicenseSelector, setShowLicenseSelector] = useState(false);
  const [licensesForCurrentProduct, setLicensesForCurrentProduct] = useState([]);
  const [currentProductName, setCurrentProductName] = useState("");

  const handleLicenseDownload = (productName, licenseType) => {
    const license = licenses.find(
      (item) =>
        item.productName === productName &&
        item.licenseType &&
        item.licenseType.toLowerCase() === licenseType.toLowerCase()
    );

    if (!license) {
      alert("License not found for this product and license type.");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(license.licenseText, 180);
    doc.text(lines, 15, 20 , );

    doc.save(`MockShark-License-${licenseType}-${productName}.pdf`);
  };

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [downloadsRes, licensesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/downloads?userId=${userId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/licenses?userId=${userId}`),
        ]);

        const downloadsData = await downloadsRes.json();
        const licensesData = await licensesRes.json();

        if (downloadsData.success) {
          setDownloads(downloadsData.data);
        }

        if (licensesData.success) {
          setLicenses(licensesData.data);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center text-[#0f1c2e]">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-[6px] border-blue-400 border-t-transparent animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
              🦈
            </span>
          </div>
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
    <div className="h-screen bg-white text-[#0f1c2e]">
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

      {/* Product Download Table Header */}
      <div className="bg-gray-100 px-4 py-3 font-bold text-xl text-[#0f1c2e]">
        <div className="max-w-6xl mx-auto grid grid-cols-3">
          <div>Product</div>
          <div className="text-center">License</div>
          <div className="text-end">Download</div>
        </div>
      </div>

      {/* Product Download Table Body */}
      <div className="max-w-6xl mx-auto divide-y divide-gray-200">
        {filteredDownloads.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 py-6 items-center">
            <div className="text-xl font-medium text-[#0f1c2e]">{item.productName}</div>
            <div className="flex justify-center">
              <Download
                className="text-[#0f1c2e] cursor-pointer hover:text-blue-600 transition"
                onClick={() => {
                  // Get licenses for this product
                  const licensesForProduct = licenses.filter(
                    (lic) => lic.productName === item.productName
                  );

                  if (licensesForProduct.length === 0) {
                    alert("No licenses found for this product.");
                    return;
                  }

                  if (licensesForProduct.length === 1) {
                    // Only one license, download it directly
                    handleLicenseDownload(
                      item.productName,
                      licensesForProduct[0].licenseType
                    );
                  } else {
                    // Multiple licenses, show modal to select
                    setLicensesForCurrentProduct(licensesForProduct);
                    setCurrentProductName(item.productName);
                    setShowLicenseSelector(true);
                  }
                }}
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
        {filteredDownloads.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-lg">No downloads found.</div>
        )}
      </div>

      {/* License Selector Modal */}
      {showLicenseSelector && (
        <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"


          onClick={() => setShowLicenseSelector(false)} // Close on outside click
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
           <h3 className="text-xl font-semibold mb-4">
  You have {licensesForCurrentProduct.length} license
  {licensesForCurrentProduct.length > 1 ? "s" : ""} for "{currentProductName}".<br />
  Please select the one you want to download.
</h3>


            <ul>
              {licensesForCurrentProduct.map((lic, idx) => (
                <li key={idx} className="mb-3">
                  <button
                    className="w-full text-left px-4 py-2 rounded border hover:bg-blue-100"
                    onClick={() => {
                      handleLicenseDownload(lic.productName, lic.licenseType);
                      setShowLicenseSelector(false);
                    }}
                  >
                    {lic.licenseType}
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowLicenseSelector(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
