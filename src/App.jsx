import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./components/PrivateRoute/PublicRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Links from "./pages/Links";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { getUserData } from "./redux/slices/authSlice";
import { fetchAnalytics } from "./redux/slices/analyticsSlice";
import { getLinks } from "./redux/slices/linkSlice";
import { getCompleteAnalytics } from "./redux/slices/analyticsSlice";

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { currentPage, shortUrlIds } = useSelector((state) => state.links);
  const { currentPage: currentClickPage } = useSelector(
    (state) => state.analytics
  );
  const limit = 10;
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (token && !userData) {
      dispatch(getUserData());
    }
    if (userData) {
      dispatch(getLinks({ page: currentPage, limit }));
      dispatch(getCompleteAnalytics());
    }
  }, [dispatch, token, userData]);

  useEffect(() => {
    if (shortUrlIds && shortUrlIds.length > 0) {
      dispatch(fetchAnalytics({ shortUrlIds, page: currentClickPage, limit }));
    }
  }, [shortUrlIds]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<Links />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
