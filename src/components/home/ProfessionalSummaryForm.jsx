import { Sparkles } from "lucide-react";
const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold
          text-gray-900"> Professional Summary</h3>
          <p className="text-sm text-gray-500"> Add summary for your resume here</p>
        </div>
        <button>
          <Sparkles classNamesize-4/>
          AI Enhance
        </button>
      </div>

      <div className="mt-6">
        <textarea value={data} onChange={(e)=> onChange(e.target.value)} rows={7} className="w-full p-3 px-4 mt-2 border text-sm
        border-gray-300 rounded-lg focus:ring focus:ring-blue-500
        focus:border-blue-500 outline-none transition-colors resize-none" placeholder="write a compelling professional summary that highlights your key strengths and career objectives..." />
        <p className=""></p>
      </div>
    </div>
  );
}

export default ProfessionalSummaryForm;
