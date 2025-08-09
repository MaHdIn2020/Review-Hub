import React, { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { FaStar } from 'react-icons/fa';
import ReactRating from 'react-rating';
import { AuthContext } from '../../providers/AuthContext';

const ServiceDetails = () => {
const service = useLoaderData();
    const { _id, title, description, price, image, category, rating, reviews } = service;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: ''
    });

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const reviewData = {
                rating: newReview.rating,
                comment: newReview.comment,
                userId: user.uid,
                userName: user.displayName || 'Anonymous',
                userAvatar: user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'
            };

            const response = await fetch(`https://review-hub-server-xi.vercel.app/services/${_id}/reviews`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${await user.getIdToken()}`
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                // Refresh the page to show the new review
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Failed to submit review:', errorData.message);
                alert(`Failed to submit review: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/2">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <div className="flex items-center mb-4">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{rating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                    </div>
                    <p className="text-xl font-semibold mb-4">Price: ${price}</p>
                    <p className="text-gray-600 mb-4">Category: {category}</p>
                    <button className="btn btn-primary">Book Service</button>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Service Details</h2>
                <p className="text-gray-700">{description}</p>
            </div>

{/* Reviews Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Customer Reviews ({reviews?.length || 0})</h2>
                
                {/* Add Review Form */}
                {user ? (
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Your Rating</label>
                                <ReactRating
                                    initialRating={newReview.rating}
                                    onChange={(value) => setNewReview({...newReview, rating: value})}
                                    emptySymbol={<FaStar className="text-gray-300 text-2xl" />}
                                    fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
                                    fractions={2}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Your Review</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="4"
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                    placeholder="Share your experience with this service..."
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                disabled={!newReview.rating || !newReview.comment}
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-blue-50 p-4 rounded-lg mb-8 text-blue-800">
                        Please <button onClick={() => navigate('/login')} className="text-blue-600 font-medium hover:underline">login</button> to leave a review
                    </div>
                )}

                {/* Existing Reviews */}
                {reviews?.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b pb-6 last:border-b-0">
                                <div className="flex items-start mb-3">
                                    <img 
                                        src={review.userAvatar} 
                                        alt={review.userName} 
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg">{review.userName}</h4>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center my-1">
                                            <ReactRating
                                                initialRating={review.rating}
                                                readonly
                                                emptySymbol={<FaStar className="text-gray-300" />}
                                                fullSymbol={<FaStar className="text-yellow-400" />}
                                            />
                                            <span className="ml-2 text-gray-600">{review.rating.toFixed(1)}</span>
                                        </div>
                                        <p className="text-gray-700 mt-2">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                        No reviews yet. Be the first to review!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;