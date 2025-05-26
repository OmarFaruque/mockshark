'use client';
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Info, CreditCard, Edit2, Save, X, ChevronRight } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState({ profile: false, personal: false, billing: false });
  const [formData, setFormData] = useState({
    profile: {
      firstName: 'Masum',
      lastName: 'Abrar',
      email: 'masum@example.com',
      about: 'Passionate developer and marketer',
      avatar: '/avatar.png'
    },
    personal: {
      phone: '+880123456789',
      language: 'English',
      country: 'Bangladesh'
    },
    billing: {
      company: 'mockshark',
      streetAddress: '',
      apartment: '',
      city: '',
      zipCode: '',
      state: ''
    }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (section, e) => {
    e.preventDefault();
    setEditing({ ...editing, [section]: false });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const renderProfile = () => (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2836]">Profile Information</h2>
        {!editing.profile ? (
          <button
            onClick={() => setEditing({ ...editing, profile: true })}
            className="flex items-center gap-2 text-cyan-600 hover:text-green-700 transition"
          >
            <Edit2 size={16} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setEditing({ ...editing, profile: false })}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {!editing.profile ? (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={formData.profile.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-1.5 shadow-sm">
                <Edit2 size={14} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {formData.profile.firstName} {formData.profile.lastName}
              </h3>
              <p className="text-gray-500">{formData.profile.email}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="font-medium text-gray-700">About</h4>
            <p className="text-gray-600">{formData.profile.about || 'Not specified'}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit('profile', e)} className="space-y-5">
          <div className="flex justify-center">
            <div className="relative group">
              <img 
                src={formData.profile.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button type="button" className="bg-black/50 text-white p-2 rounded-full">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                className={inputClass}
                value={formData.profile.firstName}
                onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                className={inputClass}
                value={formData.profile.lastName}
                onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              className={inputClass}
              value={formData.profile.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>About</label>
            <textarea
              className={inputClass}
              rows={3}
              value={formData.profile.about}
              onChange={(e) => handleInputChange('profile', 'about', e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-cyan-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const renderPersonal = () => (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2836]">Personal Information</h2>
        {!editing.personal ? (
          <button
            onClick={() => setEditing({ ...editing, personal: true })}
            className="flex items-center gap-2 text-cyan-600 hover:text-green-700 transition"
          >
            <Edit2 size={16} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setEditing({ ...editing, personal: false })}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {!editing.personal ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{formData.profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{formData.personal.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Language</p>
              <p className="font-medium text-gray-800">{formData.personal.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium text-gray-800">{formData.personal.country}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit('personal', e)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email</label>
              <input
                className={inputClass}
                value={formData.profile.email}
                disabled
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                className={inputClass}
                value={formData.personal.phone}
                onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Language</label>
              <select
                className={inputClass}
                value={formData.personal.language}
                onChange={(e) => handleInputChange('personal', 'language', e.target.value)}
              >
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input
                className={inputClass}
                value={formData.personal.country}
                onChange={(e) => handleInputChange('personal', 'country', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-cyan-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );

 const renderBilling = () => (
  <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-[#1C2836]">Billing Address</h2>
      {!editing.billing ? (
        <button
          onClick={() => setEditing({ ...editing, billing: true })}
          className="flex items-center gap-2 text-cyan-600 hover:text-green-700 transition"
          type="button"
        >
          <Edit2 size={16} /> Edit
        </button>
      ) : (
        <button
          onClick={() => setEditing({ ...editing, billing: false })}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
          type="button"
        >
          <X size={16} /> Cancel
        </button>
      )}
    </div>

    {!editing.billing ? (
   <div className="space-y-6">
 

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p className="text-sm text-gray-500 mb-1">First Name</p>
      <p className="font-medium text-gray-800">Rakib</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Last Name</p>
      <p className="font-medium text-gray-800">Khan</p>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">Company</p>
      <p className="font-medium text-gray-800">MockShark</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Country</p>
      <p className="font-medium text-gray-800">Bangladesh</p>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">Email</p>
      <p className="font-medium text-gray-800">rakib.khan@example.com</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Phone</p>
      <p className="font-medium text-gray-800">+8801234567890</p>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">Street Address</p>
      <p className="font-medium text-gray-800">123 Main Street</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Apartment</p>
      <p className="font-medium text-gray-800">Suite 4B</p>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
    <div>
      <p className="text-sm text-gray-500 mb-1">City</p>
      <p className="font-medium text-gray-800">Dhaka</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">State</p>
      <p className="font-medium text-gray-800">Dhaka Division</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Zip Code</p>
      <p className="font-medium text-gray-800">1207</p>
    </div>
  </div>
</div>


    ) : (
      <form onSubmit={(e) => handleSubmit('billing', e)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>First Name</label>
            <input className={inputClass} value={formData.profile.firstName} disabled />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input className={inputClass} value={formData.profile.lastName} disabled />
          </div>
        </div>

        <div>
          <label className={labelClass}>Company/Organization (optional)</label>
          <input
            className={inputClass}
            value={formData.billing.company}
            onChange={(e) => handleInputChange('billing', 'company', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} value={formData.profile.email} disabled />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={formData.personal.phone} disabled />
          </div>
        </div>

        <div>
          <label className={labelClass}>Country</label>
          <input className={inputClass} value="Bangladesh" disabled />
        </div>

        <div>
          <label className={labelClass}>Street Address</label>
          <input
            className={inputClass}
            value={formData.billing.streetAddress}
            onChange={(e) => handleInputChange('billing', 'streetAddress', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Apartment, suite unit etc. (optional)</label>
          <input
            className={inputClass}
            value={formData.billing.apartment}
            onChange={(e) => handleInputChange('billing', 'apartment', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>City</label>
            <input
              className={inputClass}
              value={formData.billing.city}
              onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input
              className={inputClass}
              value={formData.billing.state}
              onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Zip / Postal Code</label>
            <input
              className={inputClass}
              value={formData.billing.zipCode}
              onChange={(e) => handleInputChange('billing', 'zipCode', e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-cyan-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition"
          >
            <Save size={16} /> Save Address
          </button>
        </div>
      </form>
    )}
  </div>
);



  const tabButton = (label, tab, Icon) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all
        ${activeTab === tab 
          ? 'bg-green-50 text-cyan-600 font-medium border-l-4 border-cyan-600' 
          : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={activeTab === tab ? 'text-cyan-600' : 'text-gray-500'} />
        <span>{label}</span>
      </div>
      <ChevronRight size={18} className={activeTab === tab ? 'text-cyan-600' : 'text-gray-400'} />
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#1C2836] mb-2">Account Settings</h1>
          <p className="text-gray-500 mb-8">Manage your profile and account information</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-2">
              {tabButton("Profile", "profile", User)}
              {tabButton("Personal Info", "personal", Info)}
              {tabButton("Billing Address", "billing", CreditCard)}
            </div>
            
            <div className="lg:col-span-9">
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'personal' && renderPersonal()}
              {activeTab === 'billing' && renderBilling()}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;