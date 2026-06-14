// File Purpose: Home and resume-builder UI section component: CallToAction.
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const CallToAction = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div id="cta" className="px-6 md:px-16 lg:px-24 xl:px-40 my-24">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500 rounded-3xl px-8 sm:px-14 py-16 text-center text-white relative overflow-hidden shadow-2xl shadow-green-200">
        {/* Decorative blobs */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-white/10 rounded-full pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={12} /> Free — no credit card needed
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-4 max-w-xl mx-auto">
            Your next job starts with a great resume
          </h2>
          <p className="text-green-100 max-w-md mx-auto mb-8 leading-relaxed">
            Join thousands of job seekers who built their resume in minutes and landed interviews faster with AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              to={user ? "/app" : "/app?state=register"}
              className="flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3.5 rounded-full hover:bg-green-50 active:scale-95 transition-all shadow-lg"
            >
              {user ? "Go to Dashboard" : "Build my resume now"}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-green-100">
            {["Free forever", "No credit card required", "Instant PDF download"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-green-300 shrink-0" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;