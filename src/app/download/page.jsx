"use client";

import React, { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import Cookies from "js-cookie";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function DownloadPage() {
  const [downloads, setDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDownloads = async () => {
      const userId = Cookies.get("userId"); // Get userId from cookie

      if (!userId) return;

      const res = await fetch(
        `https://mockshark-backend.vercel.app/api/v1/downloads?userId=${userId}`
      );

      const data = await res.json();
      if (data.success) setDownloads(data.data);
    };

    fetchDownloads();
  }, []);

  const filteredDownloads = downloads.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#0f1c2e]">
      <Navbar />

      {/* Search Bar */}
      <div className="bg-[#192533] px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pr-12 rounded-full border border-gray-400 text-white placeholder-white bg-[#192533] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-gray-100 px-4 py-3 font-bold text-xl text-[#0f1c2e]">
        <div className="max-w-6xl mx-auto grid grid-cols-3">
          <div>Product</div>
          <div className="text-center">License</div>
          <div className="text-end">Download</div>
        </div>
      </div>

      {/* Table Content */}
      <div className="max-w-6xl mx-auto divide-y divide-gray-200 min-h-[50vh]">
        {filteredDownloads.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 py-6 items-center">
            <div className="text-xl font-medium text-[#0f1c2e]">
              {item.productName}
            </div>
            <div className="flex justify-center">
              <Download className="text-[#0f1c2e]" />
            </div>
            <div className="flex justify-end">
              <a
                href={item.downloadUrl}
                download
                className="bg-[#192533] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0f1c2e] transition"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
