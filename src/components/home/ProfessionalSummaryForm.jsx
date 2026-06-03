// File Purpose: Home and resume-builder UI section component: ProfessionalSummaryForm.
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../../configs/api";

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary "${data || ""}"`;
      const { data: responseData } = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onChange(responseData.enhancedContent || "");
      toast.success("Summary enhanced");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>
        <button
          type="button"
          disabled={isGenerating}
          onClick={generateSummary}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="write a compelling professional summary that highlights your key strengths and career objectives..."
        />
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
