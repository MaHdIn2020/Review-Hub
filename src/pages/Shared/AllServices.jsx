import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // ✅ Fixed incorrect import

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const categories = [
    'All', 'Cleaning', 'Repair', 'IT', 'Photography', 
    'Design', 'Outdoor', 'Fitness', 'Automotive'
  ];

  const fetchServices = async () => {
    setLoading(true);
    try {
      const queryParams = [];
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (categoryFilter && categoryFilter !== 'All') queryParams.push(`category=${encodeURIComponent(categoryFilter)}`);

      const query = queryParams.length ? `?${queryParams.join('&')}` : '';
      const res = await fetch(`https://review-hub-server-xi.vercel.app/services${query}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [search, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">All Services</h1>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Services Grid */}
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="card shadow-md rounded-xl p-4 border">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold text-blue-700">{service.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{service.description.slice(0, 100)}...</p>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                  <span className="text-green-600 font-semibold">${service.price}</span>
                </div>
                <div className="mt-6 text-right">
                  <Link
                    to={`/services/${service._id}`}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">No services found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllServices;
