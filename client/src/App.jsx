import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthUser } from "@/store/auth-slice";

// Layouts
import Authlayout from "./components/auth/layout";
import Adminlayout from "./components/admin-view/layout";
import Shopinglayout from "./components/shopping-view/layout";

// Auth Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

// Admin Pages
import Dashboard from "./pages/admin-view/Dashboard";
import Orders from "./pages/admin-view/Orders";
import Features from "./pages/admin-view/Features";
import Products from "./pages/admin-view/Products";

// Shopping Pages
import Home from "./pages/shopping-view/Home";
import Listing from "./pages/shopping-view/Listing";
import CheckOut from "./pages/shopping-view/CheckOut";
import Account from "./pages/shopping-view/Account";

// Misc
import NotFound from "./pages/not-found/NotFound";
import CheckAuth from "./components/common/CheckAuth";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // ✅ Fetch logged-in user if token exists
  useEffect(() => {
    dispatch(checkAuthUser());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-gray-600 text-orange-600",
          duration: 3000,
        }}
      />

      <Routes>
        {/* ✅ Public Auth Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Authlayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* ✅ Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Adminlayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>

        {/* ✅ Shop User Protected Routes */}
        <Route
          path="/shoping"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shopinglayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="account" element={<Account />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
