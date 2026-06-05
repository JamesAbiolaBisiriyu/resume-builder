// File Purpose: Page shown when user clicks the email verification link.
import  { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import api from "../configs/api.js";

const token = new URLSearchParams(window.location.search).get("token");

const VerifyEmail = () => {
  const [status, setStatus] = useState(
    token ? "loading" : "error"
  );

  const [message, setMessage] = useState(
    token ? "" : "No verification token found in this link."
  );

  useEffect(() => {
    if (!token) return;

    api
      .get(`/api/users/verify-email?token=${token}`)
      .then(({ data }) => {
        setStatus("success");
        setMessage(data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err?.response?.data?.message ||
          "Verification failed. The link may have expired."
        );
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="sm:w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 py-14 bg-white shadow-sm">
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-4">
              <Loader size={48} color="#22c55e" className="animate-spin" />
            </div>
            <h2 className="text-gray-700 text-xl font-medium">
              Verifying your email...
            </h2>
            <p className="text-gray-400 text-sm mt-2">Please hold on.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle size={40} color="#22c55e" />
              </div>
            </div>
            <h2 className="text-gray-900 text-2xl font-semibold">
              Email Verified!
            </h2>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {message}
            </p>
            <a
              href="/login"
              className="mt-8 inline-block w-full h-11 leading-[44px] rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity font-medium"
            >
              Go to Login
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <XCircle size={40} color="#ef4444" />
              </div>
            </div>
            <h2 className="text-gray-900 text-2xl font-semibold">
              Verification Failed
            </h2>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {message}
            </p>
            <a
              href="/login?state=register"
              className="mt-8 inline-block w-full h-11 leading-[44px] rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity font-medium"
            >
              Register Again
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
