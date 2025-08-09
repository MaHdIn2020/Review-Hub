import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout"
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ServiceDeatils from "../pages/Home/ServiceDetails";
import PrivateRoute from "../routes/PrivateRoute"
import AddService from "../pages/Shared/AddService";
import MyServices from "../pages/Shared/MyServices";
import MyReviews from "../pages/Shared/MyReviews";
import ErrorPage from "../pages/Shared/ErrorPage";
import AllServices from "../pages/Shared/AllServices";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        Component: Home
      },
      {
        path:'/services/:id',
        Component: ServiceDeatils,
        loader: ({params}) => fetch(`https://review-hub-server-xi.vercel.app/services/${params.id}`)
      },
      {
        path:'/all-services',
        Component: AllServices
      },
      {
        path:'/register',
        Component:Register
      },
            {
        path:'/login',
        Component:Login
      },
      {
        path:'/addservice',
        Component: () => (
    <PrivateRoute>
      <AddService />
    </PrivateRoute>
  )
      },
      {
        path:'/my-service',
        Component: () => (
    <PrivateRoute>
      <MyServices></MyServices>
    </PrivateRoute>
  )

      },
      {
        path:'/my-reviews',
                Component: () => (
    <PrivateRoute>
      <MyReviews></MyReviews>
    </PrivateRoute>
  )
      }
    ]
  },
]);

export default router