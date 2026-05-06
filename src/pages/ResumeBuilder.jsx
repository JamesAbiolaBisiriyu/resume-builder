import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/home/PersonalInfoForm";
import { useAppDispatch, useAppState } from "../context/AppContext.jsx";
import ResumePreview from "../components/home/ResumePreview.jsx";
import TemplateSelector from "../components/home/TemplateSelector.jsx";
import ColorPicker from "../components/home/ColorPicker.jsx";
import ProfessionalSummaryForm from "../components/home/ProfessionalSummaryForm.jsx";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { builder, resumes } = useAppState();
  const dispatch = useAppDispatch();

  const selectedResume = resumeId
    ? resumes.find((resume) => resume._id === resumeId)
    : null;

  useEffect(() => {
    dispatch({
      type: "INITIALIZE_BUILDER",
      payload: { resume: selectedResume },
    });
  }, [dispatch, selectedResume]);

  const sections = [
    { id: "personal", name: "Personal Info", Icon: User },
    { id: "summary", name: "Professional Summary", Icon: Sparkles },
    { id: "experience", name: "Experience", Icon: Briefcase },
    { id: "education", name: "Education", Icon: GraduationCap },
    { id: "projects", name: "Projects", Icon: FolderIcon },
    { id: "skills", name: "Skills", Icon: Sparkles },
  ];

  const activeSection = sections[builder.activeSectionIndex];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500
        hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to bg-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${(builder.activeSectionIndex * 100) / sections.length - 1}%`,
                }}
              />
              {/* =========================Section Navigation ============ */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={builder.draftResume.template}
                    onChange={(template) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { template },
                      })
                    }
                  />
                  <ColorPicker
                    selectedColor={builder.draftResume.accent_color}
                    onChange={(color) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { accent_color: color },
                      })
                    }
                  />
                </div>
                <div className="flex  items-center gap-2">
                  {builder.activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SET_ACTIVE_SECTION",
                          payload: Math.max(builder.activeSectionIndex - 1, 0),
                        })
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={builder.activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      dispatch({
                        type: "SET_ACTIVE_SECTION",
                        payload: Math.min(
                          builder.activeSectionIndex + 1,
                          sections.length - 1,
                        ),
                      })
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${builder.activeSectionIndex === sections.length - 1 && "opacity-50"}`}
                    disabled={
                      builder.activeSectionIndex === sections.length - 1
                    }
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={builder.draftResume.personal_info}
                    onChange={(data) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: {
                          personal_info: data,
                        },
                      })
                    }
                    removeBackground={builder.removeBackground}
                    setRemoveBackground={(value) =>
                      dispatch({
                        type: "SET_REMOVE_BACKGROUND",
                        payload:
                          typeof value === "function"
                            ? value(builder.removeBackground)
                            : value,
                      })
                    }
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={builder.draftResume.professional_summary}
                    onChange={(data) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { professional_summary: data },
                      })
                    }
                    setResumeData={dispatch}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Right Panel - Preview  */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>{/* -------------- buttons ----------------- */}</div>
            {builder.draftResume && (
              <ResumePreview
                data={builder.draftResume}
                template={builder.draftResume.template}
                accentColor={builder.draftResume.accent_color}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
