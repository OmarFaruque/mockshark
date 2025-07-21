'use client';
import React, { useState , useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Info, CreditCard, Edit2, Save, X, ChevronRight } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState({ profile: false, personal: false, billing: false });
  const [formData, setFormData] = useState({
    profile: {
      name: '',
      fullname : '',
      email: '',
      about: '',
      image: '',
      phone: '',
      language: '',
      country: '',
      billingFirstName : '',
      billingLastName : '',
      billingCompany: '',
      billingEmail: '',
      billingPhone: '',
      billingCountry: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
    },

    personal: {
     
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

  // const handleSubmit = (section, e) => {
  //   e.preventDefault();
  //   setEditing({ ...editing, [section]: false });
  // };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

//Data for the profile page
const userId = Cookies.get('userId');
const token =  Cookies.get('token'); 

 useEffect(() => {
  const fetchUser = async () => {
   

    try {
      const res = await fetch(`https://mockshark-backend.vercel.app/customer/auth/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token in Authorization header
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized');
      }

      const data = await res.json();
      setFormData({ profile: data.data }); // assuming API returns { data: { ...user } }
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  if (userId) {
    fetchUser();
  }
}, [userId]);


  if (!formData) {
    return <p>Loading user info...</p>;
  }


//update profile function
const handleSubmit = async (section, e) => {
  e.preventDefault();

  const validSections = ['profile', 'personal', 'billing'];
  if (!validSections.includes(section)) return;

  const token = Cookies.get("token");
  const id = Cookies.get('userId');

  const formDataToSend = new FormData();

  // Profile & personal section fields
  if (section === 'profile' || section === 'personal') {
    formDataToSend.append("name", formData?.profile?.name);
    formDataToSend.append("fullname", formData?.profile?.fullname);
    formDataToSend.append("email", formData?.profile?.email);
    formDataToSend.append("phone", formData?.profile?.phone);
    formDataToSend.append("language", formData?.profile?.language);
    formDataToSend.append("country", formData?.profile?.country);
    formDataToSend.append("about", formData?.profile?.about);

    if (formData?.profile?.imageFile) {
      formDataToSend.append("image", formData.profile.imageFile);
    }
  }

  // Billing section fields
  if (section === 'billing') {
    formDataToSend.append("billingFirstName", formData?.profile?.billingFirstName || '');
    formDataToSend.append("billingLastName", formData?.profile?.billingLastName || '');
    formDataToSend.append("billingCompany", formData?.profile?.billingCompany || '');
    formDataToSend.append("billingEmail", formData?.profile?.billingEmail || '');
    formDataToSend.append("billingPhone", formData?.profile?.billingPhone || '');
    formDataToSend.append("billingCountry", formData?.profile?.billingCountry || '');
    formDataToSend.append("address", formData?.profile?.address || '');
    formDataToSend.append("apartment", formData?.profile?.apartment || '');
    formDataToSend.append("city", formData?.profile?.city || '');
    formDataToSend.append("state", formData?.profile?.state || '');
    formDataToSend.append("postalCode", formData?.profile?.postalCode || '');
  }

  try {
    const res = await fetch(`https://mockshark-backend.vercel.app/customer/auth/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    const data = await res.json();

    setFormData((prev) => ({
      ...prev,
      profile: data.user,
    }));

    toast.success("Information updated successfully!");
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};




const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imageURL = URL.createObjectURL(file);

  setFormData(prev => ({
    ...prev,
    profile: {
      ...prev.profile,
      image: imageURL,      // preview
      imageFile: file,      // real file for upload
    },
  }));
};








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
            src={formData?.profile?.image}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-1.5 shadow-sm">
            <Edit2 size={14} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {formData?.profile?.firstName} {formData?.profile?.fullname}
          </h3>
          <p className="text-gray-500">{formData?.profile?.email}</p>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">About</h4>
        <p className="text-gray-600">{formData?.profile?.about || 'Not specified'}</p>
      </div>
    </div>
      ) : (
        <form onSubmit={(e) => handleSubmit('profile', e)} className="space-y-5">
          <div className="flex justify-center">
           <div className="relative group">
  <img 
    src={formData?.profile?.image} 
    alt="Profile" 
    className="w-24 h-24 rounded-full border-4 border-white shadow-md group-hover:opacity-80 transition"
  />
  
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    id="profileImageInput"
    className="hidden"
    onChange={(e) => handleImageChange(e)}
  />

  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
    <button
      type="button"
      onClick={() => document.getElementById('profileImageInput').click()}
      className="bg-black/50 text-white p-2 rounded-full"
    >
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
                value={formData?.profile?.name}
                onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                className={inputClass}
                value={formData?.profile?.fullname}
                onChange={(e) => handleInputChange('profile', 'fullname', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              className={inputClass}
              value={formData?.profile?.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>About</label>
            <textarea
              className={inputClass}
              rows={3}
              value={formData?.profile?.about}
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
              <p className="font-medium text-gray-800">{formData?.profile?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{formData?.profile?.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Language</p>
              <p className="font-medium text-gray-800">{formData?.profile?.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium text-gray-800">{formData?.profile?.country}</p>
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
                value={formData?.profile?.email}
                onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                className={inputClass}
                value={formData?.profile?.phone}
                onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div>
  <label className={labelClass}>Language</label>
  <input
    type="text"
    className={inputClass}
    value={formData?.profile?.language}
    onChange={(e) => handleInputChange('profile', 'language', e.target.value)}
    placeholder="Enter language"
  />
</div>

            <div>
              <label className={labelClass}>Country</label>
              <input
                className={inputClass}
                value={formData?.profile?.country}
                onChange={(e) => handleInputChange('profile', 'country', e.target.value)}
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
      <p className="font-medium text-gray-800">{formData?.profile?.billingFirstName}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Last Name</p>
      <p className="font-medium text-gray-800">{formData?.profile?.billingLastName}</p>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">Company</p>
      <p className="font-medium text-gray-800">{formData?.profile?.billingCompany}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Country</p>
      <p className="font-medium text-gray-800">{formData?.profile?.billingCountry} </p>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">Email</p>
      <p className="font-medium text-gray-800">{formData?.profile?.billingEmail}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Phone</p>
      <p className="font-medium text-gray-800">{formData?.profile?.billingPhone} </p>
    </div>

    <div>
      <p className="text-sm text-gray-500 mb-1">Street Address</p>
      <p className="font-medium text-gray-800">{formData?.profile?.address}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Apartment</p>
      <p className="font-medium text-gray-800">{formData?.profile?.apartment}</p>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
    <div>
      <p className="text-sm text-gray-500 mb-1">City</p>
      <p className="font-medium text-gray-800">{formData?.profile?.city}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">State</p>
      <p className="font-medium text-gray-800">{formData?.profile?.state}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Zip Code</p>
      <p className="font-medium text-gray-800">{formData?.profile?.postalCode}</p>
    </div>
  </div>
</div>


    ) : (
      <form onSubmit={(e) => handleSubmit('billing', e)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>First Name</label>
            <input className={inputClass} 
            value={formData?.profile?.billingFirstName} 
            onChange={(e) => handleInputChange('profile', 'billingFirstName', e.target.value)}
            />

          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input className={inputClass}
             value={formData?.profile?.billingLastName} 
              onChange={(e) => handleInputChange('profile', 'billingLastName', e.target.value)}
             />
          </div>
        </div>

        <div>
          <label className={labelClass}>Company/Organization (optional)</label>
          <input
            className={inputClass}
            value={formData?.profile?.billingCompany }
            onChange={(e) => handleInputChange('profile', 'billingCompany', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} value={formData?.profile?.billingEmail} 
            onChange={(e) => handleInputChange('profile', 'billingEmail', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={formData?.profile?.billingPhone} 
            onChange={(e) => handleInputChange('profile', 'billingPhone', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Country</label>
          <input className={inputClass} value={formData?.profile?.billingCountry}  
          onChange={(e) => handleInputChange('profile', 'billingCountry', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Street Address</label>
          <input
            className={inputClass}
            value={formData?.profile?.address}
            onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Apartment, suite unit etc. (optional)</label>
          <input
            className={inputClass}
            value={formData?.profile?.apartment}
            onChange={(e) => handleInputChange('profile', 'apartment', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>City</label>
            <input
              className={inputClass}
              value={formData?.profile?.city}
              onChange={(e) => handleInputChange('profile', 'city', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input
              className={inputClass}
              value={formData?.profile?.state}
              onChange={(e) => handleInputChange('profile', 'state', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Zip / Postal Code</label>
            <input
              className={inputClass}
              value={formData?.profile?.postalCode}
              onChange={(e) => handleInputChange('profile', 'postalCode', e.target.value)}
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
//main strat here
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
      <ToastContainer/>
    </div>
  );
};

export default ProfilePage;