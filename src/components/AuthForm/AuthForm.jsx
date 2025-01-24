import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "../../redux/slices/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import loginBg from "../../assets/login-bg.png";
import logo from "../../assets/logo.png";
import "./AuthForm.css";
import { toast } from "react-toastify";

function AuthForm({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(null);
  };

  useEffect(() => {
    toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile number validation
    if (type === "signup" && !/^\d{10,}$/.test(formData.mobileno)) {
      setError(
        "Mobile number must be at least 10 digits and contain only numbers"
      );
      return;
    }

    // Password confirmation validation for signup
    if (type === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let response;
    if (type === "signup") {
      response = await dispatch(signupUser(formData)).unwrap();
    } else {
      response = await dispatch(loginUser(formData)).unwrap();
    }
    if (response) {
      const redirectPath = location.state?.from;

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate(`/dashboard`);
      }
    }
  };

  return loading ? (
    <div style={{ fontSize: "40px", margin: "50px" }}>Loading...</div>
  ) : (
    <div className="auth-form">
      <div className="login-bg">
        <img src={loginBg} alt="bg" />
      </div>
      <form onSubmit={handleSubmit} className="af-form-layout">
        <div className="afl-form">
          <p>Join us Today!</p>
          {type === "signup" && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email id"
            required
          />
          {type === "signup" && (
            <div>
              <input
                type="tel"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                placeholder="Mobile no."
                required
              />
            </div>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {type === "signup" && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
          <button className="af-submit" type="submit">
            Register
          </button>
        </div>
        <div className="af-bottom-link inter">
          {type === "signup" ? (
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/signup">SignUp</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
