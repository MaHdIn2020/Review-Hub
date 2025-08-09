import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountupStats = () => {
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    // Fetch all services from backend
    fetch("https://review-hub-server-xi.vercel.app/services")
      .then((res) => res.json())
      .then((services) => {
        setServiceCount(services.length);

        // Collect all reviews across services
        const allReviews = services.flatMap((service) => service.reviews || []);

        setReviewCount(allReviews.length);

        // Extract unique user IDs from reviews
        const uniqueUserIds = new Set(allReviews.map((r) => r.userId));
        setUserCount(uniqueUserIds.size);
      })
      .catch((err) => {
        console.error("Failed to fetch services for counts:", err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-2">Users</h3>
        <CountUp end={userCount} duration={2} separator="," />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
        <CountUp end={reviewCount} duration={2} separator="," />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-2">Services</h3>
        <CountUp end={serviceCount} duration={2} separator="," />
      </div>
    </div>
  );
};

export default CountupStats;
