// File Purpose: Route-level page component for the ResumeBuilder screen.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import PersonalInfoForm from "../components/home/PersonalInfoForm";
import { useAppDispatch, useAppState } from "../context/hooks";
import ResumePreview from "../components/home/ResumePreview.jsx";
import TemplateSelector from "../components/home/TemplateSelector.jsx";
import ColorPicker from "../components/home/ColorPicker.jsx";
import ProfessionalSummaryForm from "../components/home/ProfessionalSummaryForm.jsx";
import ExperienceForm from "../components/home/ExperienceForm.jsx";
import EducationForm from "../components/home/EducationForm.jsx";
import ProjectForm from "../components/home/ProjectForm.jsx";
import SkillForm from "../components/home/SkillForm.jsx";
import { useSelector } from "react-redux";
import api from "../configs/api";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { builder } = useAppState();
  const dispatch = useAppDispatch();
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", Icon: User },
    { id: "summary", name: "Professional Summary", Icon: Sparkles },
    { id: "experience", name: "Experience", Icon: Briefcase },
    { id: "education", name: "Education", Icon: GraduationCap },
    { id: "projects", name: "Projects", Icon: FolderIcon },
    { id: "skills", name: "Skills", Icon: Sparkles },
  ];

  const activeSection = sections[builder.activeSectionIndex];

  useEffect(() => {
    if (resumeId && token) {
      const loadExistingResume = async () => {
        try {
          const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (data.resume) {
            dispatch({
              type: "INITIALIZE_BUILDER",
              payload: {
                resume: data.resume,
              },
            });

            document.title = data.resume.title;
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };

      loadExistingResume();
    }
  }, [resumeId, token, dispatch]);

  const changeResumeVisibility = async () => {
    try {
      const newVisibility = !builder.draftResume.public;

      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId,
          resumeData: {
            public: newVisibility,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({
        type: "UPDATE_DRAFT_RESUME",
        payload: {
          public: newVisibility,
        },
      });

      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const saveResume = async () => {
  try {
    const updatedResumeData = structuredClone(builder.draftResume);

    // Remove File object from JSON data
    if (
      updatedResumeData.personal_info?.image instanceof File
    ) {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();

    formData.append("resumeId", resumeId);
    formData.append(
      "resumeData",
      JSON.stringify(updatedResumeData)
    );

    // Send image separately
    if (
      builder.draftResume.personal_info?.image instanceof File
    ) {
      formData.append(
        "image",
        builder.draftResume.personal_info.image
      );
    }

    const { data } = await api.put(
      "/api/resumes/update",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(data.message || "Resume saved");
  } catch (error) {
    toast.error(
      error.response?.data?.message || error.message
    );
  }
};

  const handleShare = () => {
    // Implement share functionality here (e.g., generate shareable link, open share modal, etc.)
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      // Fallback: copy to clipboard
      alert("Sharing not supported. Please copy the link manually.");
    }
  };

  const downloadResume = () => {
    setShowPrintPreview(true);
  };

  const handlePrintResume = () => {
    window.print();
  };

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
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={builder.draftResume.experience}
                    onChange={(data) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { experience: data },
                      })
                    }
                    // setResumeData={dispatch}
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={builder.draftResume.education}
                    onChange={(data) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { education: data },
                      })
                    }
                    // setResumeData={dispatch}
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={builder.draftResume.projects}
                    onChange={(data) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { projects: data },
                      })
                    }
                    // setResumeData={dispatch}
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillForm
                    data={builder.draftResume.skills}
                    onChange={(data) =>
                      dispatch({
                        type: "UPDATE_DRAFT_RESUME",
                        payload: { skills: data },
                      })
                    }
                    // setResumeData={dispatch}
                  />
                )}
              </div>
              <button
                onClick={() =>
                  toast.promise(saveResume(), {
                    loading: "Saving...",
                    success: "Saved successfully",
                    error: "Failed to save",
                  })
                }
                className="bg-linear-to-br from-green-100 to bg-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
          {/* Right Panel - Preview  */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {builder.draftResume.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring-blue-400 transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring-purple-400 transition-colors"
                >
                  {builder.draftResume.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {builder.draftResume.public ? "Public" : "Private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring-green-400 transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>
            {builder.draftResume && (
              <ResumePreview
                data={builder.draftResume}
                template={builder.draftResume.template}
                accentColor={builder.draftResume.accent_color}
                previewId="resume-preview-main"
              />
            )}
          </div>
        </div>
      </div>

      {showPrintPreview && builder.draftResume && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 p-4 sm:p-8 overflow-y-auto">
          <div className="mx-auto max-w-5xl space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Print preview
                </h2>
                <p className="text-xs text-slate-500">
                  Use Print, then choose Save as PDF in the browser dialog.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrintPreview(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePrintResume}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
                >
                  Print / Save as PDF
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <ResumePreview
                data={builder.draftResume}
                template={builder.draftResume.template}
                accentColor={builder.draftResume.accent_color}
                previewId="resume-preview-print"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
