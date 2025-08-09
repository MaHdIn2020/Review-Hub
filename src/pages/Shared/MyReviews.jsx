import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch reviews for current user
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://review-hub-server-xi.vercel.app/services");
        const services = await res.json();

        const userReviews = [];
        services.forEach((service) => {
          service.reviews?.forEach((review) => {
            if (review.userId === user.uid) {
              userReviews.push({
                ...review,
                serviceId: service._id,
                serviceTitle: service.title,
              });
            }
          });
        });

        setMyReviews(userReviews);
      } catch (error) {
        // Removed Swal.fire("Error", "Failed to load reviews", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) fetchReviews();
  }, [user?.uid]);

  // Update review handler
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { serviceId, _id, rating, comment } = editData;

    try {
      const token = await user.getIdToken();

      const res = await fetch(
        `https://review-hub-server-xi.vercel.app/services/${serviceId}/reviews/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: Number(rating),
            comment,
          }),
        }
      );

      if (res.ok) {
        Swal.fire("Updated!", "Your review has been updated.", "success");
        setEditData(null);

        // Refresh reviews after update
        setLoading(true);
        const refreshed = await fetch("https://review-hub-server-xi.vercel.app/services");
        const services = await refreshed.json();

        const userReviews = [];
        services.forEach((service) => {
          service.reviews?.forEach((review) => {
            if (review.userId === user.uid) {
              userReviews.push({
                ...review,
                serviceId: service._id,
                serviceTitle: service.title,
              });
            }
          });
        });
        setMyReviews(userReviews);
        setLoading(false);
      } else {
        Swal.fire("Error", "Failed to update review", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  // Delete review handler
  const handleDelete = async (review) => {
    const { serviceId, _id } = review;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete your review for "${review.serviceTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await user.getIdToken();

        const res = await fetch(
          `https://review-hub-server-xi.vercel.app/services/${serviceId}/reviews/${_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          setMyReviews((prev) => prev.filter((r) => r._id !== _id));
        } else {
          Swal.fire("Error", "Failed to delete review", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Server error occurred", "error");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your reviews...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>

      {myReviews.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not submitted any reviews yet.
        </p>
      ) : (
        myReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-lg p-5 mb-5 border"
          >
            <h3 className="text-xl font-semibold mb-2">
              Service: {review.serviceTitle}
            </h3>
            <p>
              <strong>Rating:</strong> {review.rating} ⭐
            </p>
            <p className="mt-2">
              <strong>Review:</strong> {review.comment}
            </p>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => setEditData({ ...review })}
                className="btn btn-sm btn-info"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-4">Edit Review</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">
                  Service Title (read-only)
                </label>
                <input
                  type="text"
                  value={editData.serviceTitle}
                  disabled
                  className="input input-bordered w-full cursor-not-allowed bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Rating (1 to 5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={editData.rating}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, rating: e.target.value }))
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Review Comment</label>
                <textarea
                  value={editData.comment}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, comment: e.target.value }))
                  }
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditData(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
