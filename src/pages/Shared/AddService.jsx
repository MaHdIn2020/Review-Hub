import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthContext';

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [serviceData, setServiceData] = useState({
    title: '',
    company: '',
    website: '',
    description: '',
    category: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // get fresh ID token from Firebase user
    const token = await user.getIdToken();

    const response = await fetch('https://review-hub-server-xi.vercel.app/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...serviceData,
        price: Number(serviceData.price),
        userEmail: user.email,
        addedDate: new Date().toISOString(),
        rating: 0,
        reviews: []
      })
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Service added successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });
    } else {
      const errData = await response.json();
      throw new Error(errData.message || 'Failed to add service');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  } finally {
    setLoading(false);
  }
};

  const categories = [
    'Cleaning', 'Repair', 'IT', 'Photography', 
    'Design', 'Outdoor', 'Fitness', 'Automotive'
  ];

  return (
    <div className=" mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Add New Service</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Service Image URL</span>
          </label>
          <input
            type="url"
            name="image"
            value={serviceData.image}
            onChange={handleChange}
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Service Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Service Title*</span>
          </label>
          <input
            type="text"
            name="title"
            value={serviceData.title}
            onChange={handleChange}
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
            placeholder="Professional Home Cleaning"
            required
          />
        </div>

        {/* Company Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Company Name*</span>
          </label>
          <input
            type="text"
            name="company"
            value={serviceData.company}
            onChange={handleChange}
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
            placeholder="Your Company Name"
            required
          />
        </div>

        {/* Website */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Company Website</span>
          </label>
          <input
            type="url"
            name="website"
            value={serviceData.website}
            onChange={handleChange}
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
            placeholder="https://yourcompany.com"
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Description*</span>
          </label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
            placeholder="Describe your service in detail..."
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Category*</span>
          </label>
          <select
            name="category"
            value={serviceData.category}
            onChange={handleChange}
            className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border dark:border-gray-700"
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-gray-200">Price (USD)*</span>
          </label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
            placeholder="120"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-control mt-8">
          <button 
            type="submit" 
            className="btn btn-primary dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white"
            disabled={loading}
          >
            {loading ? 'Adding Service...' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
