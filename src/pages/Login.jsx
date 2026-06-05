// File Purpose: Route-level page component for the Login screen with email verification support.
import { Lock, User2Icon, Mail, RefreshCw } from "lucide-react";
import { login } from "../app/features/authSlice.js";
import React from "react";
import api from "../configs/api.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [loading, setLoading] = React.useState(false);
  const [showResend, setShowResend] = React.useState(false);
  const [resendEmail, setResendEmail] = React.useState("");
  const [registered, setRegistered] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "register") {
        const { data } = await api.post("/api/users/register", formData);
        toast.success(data.message);
        setRegistered(true);
        setResendEmail(formData.email);
      } else {
        const { data } = await api.post("/api/users/login", formData);
        dispatch(login(data));
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate("/app");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      const isUnverified = error?.response?.data?.unverified;
      toast.error(msg);
      if (isUnverified) {
        setShowResend(true);
        setResendEmail(formData.email);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!resendEmail) return;
    setLoading(true);
    try {
      const { data } = await api.post("/api/users/resend-verification", {
        email: resendEmail,
      });
      toast.success(data.message);
      setShowResend(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Post-registration success screen
  if (registered) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 py-12 bg-white">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <Mail size={32} color="#22c55e" />
            </div>
          </div>
          <h1 className="text-gray-900 text-2xl font-semibold">Check your inbox</h1>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            We sent a verification link to <strong>{resendEmail}</strong>.
            Click the link in the email to activate your account.
          </p>
          <p className="text-gray-400 text-xs mt-4">Didn't receive it?</p>
          <button
            onClick={handleResend}
            disabled={loading}
            className="mt-2 flex items-center gap-2 mx-auto text-green-500 text-sm hover:underline disabled:opacity-50"
          >
            <RefreshCw size={14} />
            Resend verification email
          </button>
          <p
            onClick={() => { setRegistered(false); setState("login"); }}
            className="text-gray-500 text-sm mt-8 cursor-pointer hover:underline"
          >
            Back to login
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === "login" && (
          <div className="mt-4 text-left text-green-500">
            <button className="text-sm" type="reset">
              Forget password?
            </button>
          </div>
        )}

        {showResend && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-left">
            <p className="text-yellow-700 text-sm">Your email isn't verified yet.</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="mt-1 flex items-center gap-1 text-green-600 text-sm font-medium hover:underline disabled:opacity-50"
            >
              <RefreshCw size={13} />
              Resend verification email
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? "Please wait..." : state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() => {
            setState((prev) => (prev === "login" ? "register" : "login"));
            setShowResend(false);
          }}
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-green-500 hover:underline">click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;