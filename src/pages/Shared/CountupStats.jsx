import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountupStats = () => {
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    fetch("https://review-hub-server-xi.vercel.app/services")
      .then((res) => res.json())
      .then((services) => {
        setServiceCount(services.length);

        const allReviews = services.flatMap((service) => service.reviews || []);

        setReviewCount(allReviews.length);

        const uniqueUserIds = new Set(allReviews.map((r) => r.userId));
        setUserCount(uniqueUserIds.size);
      })
      .catch((err) => {
        console.error("Failed to fetch services for counts:", err);
      });
  }, []);

  return (
    <section
      aria-label="Statistics on users, reviews, and services"
      className="max-w-7xl mx-auto px-6 py-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          { label: "Users", count: userCount },
          { label: "Reviews", count: reviewCount },
          { label: "Services", count: serviceCount },
        ].map(({ label, count }) => (
          <div
            key={label}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center"
          >
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">{label}</h3>
            <p
              className="text-5xl font-bold text-primary"
              aria-live="polite"
              aria-atomic="true"
            >
              <CountUp end={count} duration={2} separator="," />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountupStats;
