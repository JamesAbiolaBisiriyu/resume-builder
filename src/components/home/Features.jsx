// File Purpose: Home and resume-builder UI section component: Features.
import { useState } from "react";
import { Sparkles, Eye, Download, FileText, Share2, ShieldCheck } from "lucide-react";
import Title from "./Title";

const FEATURES = [
  {
    icon: <Eye className="text-violet-600" size={22} />,
    defaultBg: "bg-violet-100",
    defaultBorder: "border-violet-300",
    hoverBg: "hover:bg-violet-100",
    hoverBorder: "hover:border-violet-300",
    iconBg: "bg-violet-50 border-violet-100",
    iconHoverBg: "group-hover:bg-violet-100",
    iconHoverBorder: "group-hover:border-violet-300",
    title: "Real-Time Analytics",
    desc: "Get instant insights into your finances with live dashboards.",
  },
  {
    icon: <ShieldCheck className="text-green-600" size={22} />,
    defaultBg: "",
    defaultBorder: "",
    hoverBg: "hover:bg-green-100",
    hoverBorder: "hover:border-green-300",
    iconBg: "bg-green-50 border-green-100",
    iconHoverBg: "group-hover:bg-green-100",
    iconHoverBorder: "group-hover:border-green-300",
    title: "Bank-Grade Security",
    desc: "End-to-end encryption, 2FA, compliance with GDPR standards.",
  },
  {
    icon: <Download className="text-orange-600" size={22} />,
    defaultBg: "",
    defaultBorder: "",
    hoverBg: "hover:bg-orange-100",
    hoverBorder: "hover:border-orange-300",
    iconBg: "bg-orange-50 border-orange-100",
    iconHoverBg: "group-hover:bg-orange-100",
    iconHoverBorder: "group-hover:border-orange-300",
    title: "Customizable Reports",
    desc: "Export professional, audit-ready financial reports for tax or internal review.",
  },
];

const Features = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div id="features" className="flex flex-col items-center my-10 scroll-mt-12">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 border border-green-200 rounded-full px-6 py-1.5">
        <Sparkles size={14} />
        <span>Simple Process</span>
      </div>

      <Title
        title="Build your resume"
        description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features"
      />

      {/* Side-by-side: Image left, Cards right - centralized */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-0 mt-10 w-full xl:-mt-10">
        {/* Image - left side */}
        <div className="w-full md:w-auto flex justify-center xl:-ml-32">
          <img
            className="max-w-2xl w-full"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt="Resume builder features overview"
          />
        </div>

        {/* Feature cards - right side, centered vertically */}
        <div
          className="flex items-center justify-center px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="flex flex-col gap-0 max-w-md">
            {FEATURES.map((f, index) => (
              <div
                key={f.title}
                className={`p-6 border flex gap-4 rounded-xl transition-all duration-200 group cursor-pointer
                  ${index === 0 && !isHover ? `${f.defaultBg} ${f.defaultBorder}` : "border-transparent"}
                  ${f.hoverBg} ${f.hoverBorder}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-200
                    ${index === 0 && !isHover ? `${f.defaultBg} ${f.defaultBorder}` : `${f.iconBg}`}
                    ${f.iconHoverBg} ${f.iconHoverBorder}`}
                >
                  {f.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">{f.title}</h3>
                  <p className="text-sm text-slate-600 max-w-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;