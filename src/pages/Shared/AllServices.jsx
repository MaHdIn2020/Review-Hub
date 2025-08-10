import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

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
    <div className=" mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 text-gray-900 dark:text-gray-100">All Services</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered w-full sm:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full sm:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border dark:border-gray-700"
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

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="card shadow-md rounded-xl p-4 border bg-white dark:bg-gray-900 dark:border-gray-700">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300">{service.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{service.description.slice(0, 100)}...</p>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">${service.price}</span>
                </div>
                <div className="mt-6 text-right">
                  <Link
                    to={`/services/${service._id}`}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300 text-lg">No services found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllServices;
