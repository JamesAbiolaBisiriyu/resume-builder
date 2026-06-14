// File Purpose: Home and resume-builder UI section component: Banner.
import { Sparkles } from "lucide-react";

const Banner = () => (
  <div className="w-full py-2.5 font-medium text-sm text-green-800 text-center bg-gradient-to-r from-[#ABFF7E] via-[#d4fdb8] to-[#FDFEFF]">
    <p className="flex items-center justify-center gap-2">
      <Sparkles size={13} className="text-green-700" />
      <span>
        <span className="px-2.5 py-0.5 rounded-md text-white bg-green-600 mr-2 text-xs font-semibold">New</span>
        AI resume enhancement is now live — try it on your summary and experience sections
      </span>
    </p>
  </div>
);

export default Banner;