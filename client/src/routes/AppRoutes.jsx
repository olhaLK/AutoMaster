import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import CarPage from '../pages/CarPage/CarPage';
import OrderCarPage from '../pages/OrderCarPage/OrderCarPage';
import TestDriveFormPage from '../pages/TestDriveFormPage/TestDriveFormPage';
import TrackingPage from '../pages/TrackingPage/TrackingPage';
import CartPage from '../pages/CartPage/CartPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import Page404 from '../pages/Page404/Page404';
import AdminClientsListPage from '../pages/AdminClientsListPage/AdminClientsListPage';
import AdminOrdersListPage from '../pages/AdminOrdersListPage/AdminOrdersListPage';
import AdminTestDrivesListPage from '../pages/AdminTestDrivesListPage/AdminTestDrivesListPage';
import AddCarPage from "../pages/AddCar/AddCarPage.jsx";
import EditCar from "../pages/EditCar/EditCar.jsx";
import ProtectedRoute from './ProtectedRoute.jsx';


export default function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* admin */}
      <Route element={<ProtectedRoute roles={['Admin']} />}>
        <Route path="/cars/add" element={<AddCarPage />} />
        <Route path="/admin/clients" element={<AdminClientsListPage />} />
        <Route path="/admin/orders" element={<AdminOrdersListPage />} />
        <Route path="/admin/test-drives" element={<AdminTestDrivesListPage />} />
        <Route path="/car/:id/edit" element={<EditCar />} />
      </Route>

      {/* user (protected) */}
      <Route element={<ProtectedRoute roles={['User']} />}>
        <Route path="/cars" element={<CatalogPage />} />
        <Route path="/cars/:id" element={<CarPage />} />
        <Route path="/order/:id" element={<OrderCarPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* public pages for booking and tracking (available without auth) */}
      <Route path="/test-drive" element={<TestDriveFormPage />} />
      <Route path="/tracking" element={<TrackingPage />} />

    </Routes>
  )
}
