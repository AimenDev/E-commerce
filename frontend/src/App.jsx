import { Routes } from "react-router-dom";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import {  Navigate, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage"; 
import { useCartStore } from "./stores/useCartStore";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
export default function App() {
  const {user,checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
		checkAuth();
	}, [checkAuth]);
  useEffect(() => {
		if (!user) return; 

		getCartItems();
	}, [getCartItems, user]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-br from-slate-800 to-green-900" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />}/>
          <Route path='/Admin-Dashboard' element={user?.role === 'admin' ? <AdminPage /> : <Navigate to='/login' />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
          <Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}/>
					<Route path='/purchase-cancel'  element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}
