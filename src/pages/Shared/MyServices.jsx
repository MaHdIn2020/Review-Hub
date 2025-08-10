import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus, FaEye, FaSearch, FaFilter } from 'react-icons/fa';

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetch('https://review-hub-server-xi.vercel.app/services')
      .then(res => res.json())
      .then(data => {
        const userServices = data.filter(service => service.userEmail === user.email);
        setMyServices(userServices);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user.email]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await user.getIdToken();

      const res = await fetch(`https://review-hub-server-xi.vercel.app/services/${selectedService._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(selectedService)
      });

      if (res.ok) {
        Swal.fire('Success', 'Service updated', 'success');
        const updated = myServices.map(s => s._id === selectedService._id ? selectedService : s);
        setMyServices(updated);
        setSelectedService(null);
      } else {
        Swal.fire('Error', 'Update failed', 'error');
      }
    } catch {
      Swal.fire('Error', 'Server error', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const token = await user.getIdToken();

      const res = await fetch(`https://review-hub-server-xi.vercel.app/services/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (res.ok) {
        Swal.fire('Deleted!', 'Service deleted successfully', 'success');
        const remaining = myServices.filter(s => s._id !== deleteId);
        setMyServices(remaining);
        setDeleteId(null);
      } else {
        Swal.fire('Error', 'Delete failed', 'error');
      }
    } catch {
      Swal.fire('Error', 'Server error', 'error');
    }
  };

  // Filter and search services
  const filteredServices = myServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-blue-600 dark:text-blue-400"></span>
          <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Loading your services...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                My Services
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Manage and monitor your service offerings
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <FaPlus className="text-lg" />
                Add New Service
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Services</p>
                  <p className="text-2xl font-bold">{myServices.length}</p>
                </div>
                <div className="text-blue-200 text-3xl">📊</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Services</p>
                  <p className="text-2xl font-bold">{filteredServices.length}</p>
                </div>
                <div className="text-green-200 text-3xl">✅</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Categories</p>
                  <p className="text-2xl font-bold">{new Set(myServices.map(s => s.category)).size}</p>
                </div>
                <div className="text-blue-200 text-3xl">🏷️</div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services by title or description..."
                className="input input-bordered w-full pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="select select-bordered pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Repair">Repair</option>
                <option value="IT">IT</option>
                <option value="Photography">Photography</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {filteredServices.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {searchTerm || categoryFilter !== 'All' ? 'No services found' : 'No services yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {searchTerm || categoryFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Start by adding your first service to showcase your skills'}
            </p>
            <button className="btn btn-primary btn-lg gap-2">
              <FaPlus />
              Add Your First Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div key={service._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {service.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {service.category}
                    </span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${service.price}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline btn-primary flex-1 gap-2 hover:scale-105 transition-transform"
                      onClick={() => setSelectedService({ ...service })}
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline btn-error flex-1 gap-2 hover:scale-105 transition-transform"
                      onClick={() => setDeleteId(service._id)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Modal */}
      {selectedService && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-md">
            <h3 className="text-xl font-bold mb-6 text-center">Update Service</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700 dark:text-gray-300">Service Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                  value={selectedService.title}
                  onChange={(e) => setSelectedService(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700 dark:text-gray-300">Price ($)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                  value={selectedService.price}
                  onChange={(e) => setSelectedService(prev => ({ ...prev, price: Number(e.target.value) }))}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text font-medium text-gray-700 dark:text-gray-300">Category</span>
                </label>
                <select
                  className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                  value={selectedService.category}
                  onChange={(e) => setSelectedService(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Repair">Repair</option>
                  <option value="IT">IT</option>
                  <option value="Photography">Photography</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              
              <div className="modal-action pt-4">
                <button type="submit" className="btn btn-primary btn-outline gap-2">
                  <FaEdit />
                  Update Service
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setSelectedService(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-md">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Confirm Delete</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this service? This action cannot be undone.
              </p>
              <div className="modal-action justify-center">
                <button className="btn btn-error btn-outline gap-2" onClick={handleDelete}>
                  <FaTrash />
                  Yes, Delete
                </button>
                <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;
