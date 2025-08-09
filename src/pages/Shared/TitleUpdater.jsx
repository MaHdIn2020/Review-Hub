// src/components/TitleUpdater.jsx
import { useLocation } from "react-router";
import { useEffect } from "react";

const routeTitles = {
  "/": "Home | Review Hub",
  "/login": "Login | Review Hub",
  "/register": "Register | Review Hub",
  "/services": "All Services | Review Hub",
  "/add-service": "Add Service | Review Hub",
  "/my-services": "My Services | Review Hub",
  "/my-reviews": "My Reviews | Review Hub",
  "/contact": "Contact Us | Review Hub",
};

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || "Review Hub";
    document.title = title;
  }, [location.pathname]);

  return null;
};

export default TitleUpdater;
