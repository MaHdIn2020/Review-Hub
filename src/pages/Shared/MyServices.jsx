import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import Swal from 'sweetalert2';

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-10">Loading services...</p>;

  return (
    <div className=" mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Services</h2>

      {myServices.length === 0 ? (
        <p>No services found. You haven't added any yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <thead>
              <tr>
                <th className="text-gray-900 dark:text-gray-100">Title</th>
                <th className="text-gray-900 dark:text-gray-100">Category</th>
                <th className="text-gray-900 dark:text-gray-100">Price ($)</th>
                <th className="text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myServices.map(service => (
                <tr key={service._id}>
                  <td>{service.title}</td>
                  <td>{service.category}</td>
                  <td>{service.price}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-xs btn-info" onClick={() => setSelectedService({ ...service })}>
                      Edit
                    </button>
                    <button className="btn btn-xs btn-error" onClick={() => setDeleteId(service._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {selectedService && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h3 className="text-lg font-bold mb-4">Update Service</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
                value={selectedService.title}
                onChange={(e) => setSelectedService(prev => ({ ...prev, title: e.target.value }))}
              />
              <input
                type="number"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border dark:border-gray-700"
                value={selectedService.price}
                onChange={(e) => setSelectedService(prev => ({ ...prev, price: Number(e.target.value) }))}
              />
              <select
                className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border dark:border-gray-700"
                value={selectedService.category}
                onChange={(e) => setSelectedService(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="Cleaning">Cleaning</option>
                <option value="Repair">Repair</option>
                <option value="IT">IT</option>
                <option value="Photography">Photography</option>
                <option value="Design">Design</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="btn btn-success dark:bg-green-700 dark:hover:bg-green-800 dark:text-white">Update</button>
                <button type="button" className="btn" onClick={() => setSelectedService(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h3 className="text-lg font-bold mb-3">Confirm Delete</h3>
            <p>Are you sure you want to delete this service?</p>
            <div className="modal-action">
              <button className="btn btn-error dark:bg-red-700 dark:hover:bg-red-800 dark:text-white" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;
