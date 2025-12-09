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
import AdminMainPage from '../pages/AdminMainPage/AdminMainPage';
import AdminClientsListPage from '../pages/AdminClientsListPage/AdminClientsListPage';
import AdminOrdersListPage from '../pages/AdminOrdersListPage/AdminOrdersListPage';
import AdminTestDrivesListPage from '../pages/AdminTestDrivesListPage/AdminTestDrivesListPage';
import AdminCarsListPage from '../pages/AdminCarsListPage/AdminCarsListPage';


export default function AppRoutes() {
  return (
    <Routes>
      {/* user. todo: visit those pages can only authing user */}
      <Route path="/" element={<MainPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cars/:id" element={<CarPage />} />
      <Route path="/order" element={<OrderCarPage />} />
      <Route path="/test-drive" element={<TestDriveFormPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/cart" element={<CartPage />} />
      
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* admin. todo: visit those pages can only admin */}
      <Route path="/admin" element={<AdminMainPage />} />
      <Route path="/admin/clients" element={<AdminClientsListPage />} />
      <Route path="/admin/orders" element={<AdminOrdersListPage />} />
      <Route path="/admin/test-drives" element={<AdminTestDrivesListPage />} />
      <Route path="/admin/cars" element={<AdminCarsListPage />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
