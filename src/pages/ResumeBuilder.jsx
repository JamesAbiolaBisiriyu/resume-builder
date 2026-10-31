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
  PencilIcon,
  Share2Icon,
  SlidersHorizontal,
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

// ─── Mobile tab options ────────────────────────────────────────────────────────
const MOBILE_TABS = [
  { id: "edit", label: "Edit", icon: PencilIcon },
  { id: "preview", label: "Preview", icon: EyeIcon },
];

// ─── Action Buttons Component (moved outside) ────────────────────────────────
const ActionButtons = ({ draftResume, onShare, onToggleVisibility, onDownload }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {draftResume.public && (
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-linear-to-br from-blue-50 to-blue-100 text-blue-600 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
        >
          <Share2Icon className="size-3.5" /> Share
        </button>
      )}
      <button
        onClick={onToggleVisibility}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-linear-to-br from-purple-50 to-purple-100 text-purple-600 border border-purple-200 rounded-lg hover:border-purple-300 transition-colors"
      >
        {draftResume.public
          ? <><EyeIcon className="size-3.5" /> Public</>
          : <><EyeOffIcon className="size-3.5" /> Private</>
        }
      </button>
      <button
        onClick={onDownload}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-linear-to-br from-green-50 to-green-100 text-green-600 border border-green-200 rounded-lg hover:border-green-300 transition-colors"
      >
        <DownloadIcon className="size-3.5" /> Download
      </button>
    </div>
  );
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { builder } = useAppState();
  const dispatch = useAppDispatch();
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  // "edit" | "preview" — mobile only
  const [mobileTab, setMobileTab] = useState("edit");

  const sections = [
    { id: "personal",   name: "Personal Info",          Icon: User },
    { id: "summary",    name: "Professional Summary",   Icon: Sparkles },
    { id: "experience", name: "Experience",             Icon: Briefcase },
    { id: "education",  name: "Education",              Icon: GraduationCap },
    { id: "projects",   name: "Projects",               Icon: FolderIcon },
    { id: "skills",     name: "Skills",                 Icon: Sparkles },
  ];

  const activeSection = sections[builder.activeSectionIndex];

  // ── Load resume on mount ───────────────────────────────────────────────────
  useEffect(() => {
    if (resumeId && token) {
      const loadExistingResume = async () => {
        try {
          const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (data.resume) {
            dispatch({ type: "INITIALIZE_BUILDER", payload: { resume: data.resume } });
            document.title = data.resume.title;
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };
      loadExistingResume();
    }
  }, [resumeId, token, dispatch]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const changeResumeVisibility = async () => {
    try {
      const newVisibility = !builder.draftResume.public;
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId, resumeData: { public: newVisibility } },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { public: newVisibility } });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // NOTE: this function intentionally has no try/catch. It's called via
  // `toast.promise(saveResume(), {...})` below, which needs the returned
  // promise to actually reject on failure so it can show the "error"
  // message — swallowing the error here would make every save look
  // successful even when the request fails. Any caller that isn't using
  // toast.promise should wrap this in its own try/catch.
  const saveResume = async () => {
    const updatedResumeData = structuredClone(builder.draftResume);
    if (updatedResumeData.personal_info?.image instanceof File) {
      delete updatedResumeData.personal_info.image;
    }
    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));
    if (builder.draftResume.personal_info?.image instanceof File) {
      formData.append("image", builder.draftResume.personal_info.image);
      // Only meaningful alongside a newly-uploaded image — the backend
      // only runs the ImageKit "remove background" transformation when
      // it's actually processing an incoming file.
      formData.append("removeBackground", builder.removeBackground);
    }
    const { data } = await api.put("/api/resumes/update", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  const handleShare = () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      navigator.clipboard?.writeText(resumeUrl).then(() =>
        toast.success("Link copied to clipboard!")
      ).catch(() =>
        toast.error("Could not copy link. Please copy manually: " + resumeUrl)
      );
    }
  };

  const downloadResume = () => setShowPrintPreview(true);
  const handlePrintResume = () => window.print();

  // ── Progress bar width ─────────────────────────────────────────────────────
  const progressPct = Math.round(
    ((builder.activeSectionIndex) / (sections.length - 1)) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/*
        ── Everything below is the normal app shell: top bar, mobile tabs,
        editor + live preview grid. None of it should exist in the print
        layout — `visibility: hidden` (used in the injected print stylesheet)
        keeps these elements in the layout flow even when invisible, which
        pushes the print modal down. `print:hidden` uses `display: none`
        instead, which actually removes them from flow during print.
      */}
      <div className="print:hidden">

        {/* ── Top bar ─────────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
            {/* Back */}
            <Link
              to="/app"
              className="inline-flex shrink-0 gap-1.5 items-center text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeftIcon className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* Resume title */}
            <p className="text-sm font-medium text-slate-700 truncate max-w-40 sm:max-w-xs">
              {builder.draftResume.title || "Untitled Resume"}
            </p>

            {/* Desktop actions — visible only on desktop */}
            <div className="hidden md:flex items-center gap-2">
              <ActionButtons 
                draftResume={builder.draftResume}
                onShare={handleShare}
                onToggleVisibility={changeResumeVisibility}
                onDownload={downloadResume}
              />
            </div>

            {/* Mobile: compact action strip icons */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={downloadResume}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                aria-label="Download"
              >
                <DownloadIcon className="size-4" />
              </button>
              <button
                onClick={changeResumeVisibility}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                aria-label="Toggle visibility"
              >
                {builder.draftResume.public
                  ? <EyeIcon className="size-4" />
                  : <EyeOffIcon className="size-4" />
                }
              </button>
              {builder.draftResume.public && (
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                  aria-label="Share"
                >
                  <Share2Icon className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile tab toggle ──────────────────────────────────────────── */}
        <div className="md:hidden sticky top-14 z-20 bg-white border-b border-slate-200 px-4">
          <div className="flex gap-0">
            {MOBILE_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = mobileTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMobileTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                    active
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Progress bar (mobile, inside edit tab) */}
          {mobileTab === "edit" && (
            <div className="pb-2 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>{activeSection.name}</span>
                <span>{builder.activeSectionIndex + 1} / {sections.length}</span>
              </div>
              <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Main content area ─────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-5 pb-10">
          <div className="grid lg:grid-cols-12 gap-6">

            {/* ── LEFT PANEL: Editor ─────────────────────────────────────── */}
            {/* On mobile: only shown when mobileTab === "edit" */}
            <div className={`lg:col-span-5 ${mobileTab === "preview" ? "hidden md:block" : "block"} min-w-0`}>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Progress bar (desktop) */}
                <div className="hidden md:block h-1 bg-slate-100">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="p-5 pt-4">

                  {/* Section nav header */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                    {/* Template + colour pickers */}
                    <div className="flex items-center gap-2">
                      <TemplateSelector
                        selectedTemplate={builder.draftResume.template}
                        onChange={(template) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { template } })
                        }
                      />
                      <ColorPicker
                        selectedColor={builder.draftResume.accent_color}
                        onChange={(color) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { accent_color: color } })
                        }
                      />
                    </div>

                    {/* Prev / Next */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "SET_ACTIVE_SECTION",
                            payload: Math.max(builder.activeSectionIndex - 1, 0),
                          })
                        }
                        disabled={builder.activeSectionIndex === 0}
                        className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
                      >
                        <ChevronLeft className="size-3.5" /> Prev
                      </button>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "SET_ACTIVE_SECTION",
                            payload: Math.min(builder.activeSectionIndex + 1, sections.length - 1),
                          })
                        }
                        disabled={builder.activeSectionIndex === sections.length - 1}
                        className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
                      >
                        Next <ChevronRight className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Section tab chips — scrollable row on mobile */}
                  <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
                    {sections.map((section, i) => {
                      const Icon = section.Icon;
                      const active = builder.activeSectionIndex === i;
                      return (
                        <button
                          key={section.id}
                          onClick={() =>
                            dispatch({ type: "SET_ACTIVE_SECTION", payload: i })
                          }
                          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            active
                              ? "bg-green-500 text-white shadow-sm shadow-green-200"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          <Icon className="size-3" />
                          {section.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active form */}
                  <div className="w-full overflow-hidden">
                    {activeSection.id === "personal" && (
                      <PersonalInfoForm
                        data={builder.draftResume.personal_info}
                        onChange={(data) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { personal_info: data } })
                        }
                        removeBackground={builder.removeBackground}
                        setRemoveBackground={(value) =>
                          dispatch({
                            type: "SET_REMOVE_BACKGROUND",
                            payload: typeof value === "function" ? value(builder.removeBackground) : value,
                          })
                        }
                      />
                    )}
                    {activeSection.id === "summary" && (
                      <ProfessionalSummaryForm
                        data={builder.draftResume.professional_summary}
                        onChange={(data) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { professional_summary: data } })
                        }
                      />
                    )}
                    {activeSection.id === "experience" && (
                      <ExperienceForm
                        data={builder.draftResume.experience}
                        onChange={(data) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { experience: data } })
                        }
                      />
                    )}
                    {activeSection.id === "education" && (
                      <EducationForm
                        data={builder.draftResume.education}
                        onChange={(data) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { education: data } })
                        }
                      />
                    )}
                    {activeSection.id === "projects" && (
                      <ProjectForm
                        data={builder.draftResume.projects}
                        onChange={(data) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { projects: data } })
                        }
                      />
                    )}
                    {activeSection.id === "skills" && (
                      <SkillForm
                        data={builder.draftResume.skills}
                        onChange={(data) =>
                          dispatch({ type: "UPDATE_DRAFT_RESUME", payload: { skills: data } })
                        }
                      />
                    )}
                  </div>


                  {/* Save + mobile preview CTA */}
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                    <button
                      onClick={() =>
                        toast.promise(saveResume(), {
                          loading: "Saving…",
                          success: "Saved!",
                          error: "Failed to save",
                        })
                      }
                      className="flex-1 sm:flex-none bg-linear-to-br from-green-100 to-green-200 ring-1 ring-green-300 text-green-700 hover:ring-green-400 transition-all rounded-lg px-6 py-2.5 text-sm font-medium"
                    >
                      Save Changes
                    </button>

                    {/* Mobile shortcut to preview */}
                    <button
                      onClick={() => setMobileTab("preview")}
                      className="md:hidden flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <EyeIcon className="size-4" /> Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL: Preview ────────────────────────────────────── */}
            {/* On mobile: only shown when mobileTab === "preview" */}
            <div className={`lg:col-span-7 ${mobileTab === "edit" ? "hidden md:block" : "block"} min-w-0`}>

              {/* Preview action bar — only visible on mobile (preview tab) */}
              <div className="flex md:hidden items-center justify-between mb-3 flex-wrap gap-2">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Live Preview</p>
                <ActionButtons 
                  draftResume={builder.draftResume}
                  onShare={handleShare}
                  onToggleVisibility={changeResumeVisibility}
                  onDownload={downloadResume}
                />
              </div>

              {/* Desktop: simple label only (actions are in top bar) */}
              <div className="hidden md:flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Live Preview</p>
              </div>

              {builder.draftResume && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                  <ResumePreview
                    data={builder.draftResume}
                    template={builder.draftResume.template}
                    accentColor={builder.draftResume.accent_color}
                    previewId="resume-preview-main"
                  />
                </div>
              )}

              {/* Mobile: back to edit button below preview */}
              <div className="md:hidden mt-4 flex justify-center">
                <button
                  onClick={() => setMobileTab("edit")}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors border border-slate-200 rounded-full px-5 py-2"
                >
                  <SlidersHorizontal className="size-4" /> Back to editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── end print:hidden app-shell wrapper ─────────────────────────────── */}

      {/* ── Print / PDF preview modal ──────────────────────────────────────── */}
      {showPrintPreview && builder.draftResume && (
        <div
          id="resume-print-modal"
          className="fixed inset-0 z-50 bg-slate-950/70 p-4 sm:p-8 overflow-y-auto"
        >
          <div className="mx-auto max-w-5xl space-y-4">
            {/*
              print:hidden here too — this header bar is a *sibling* of the
              resume inside the (now print:static) modal, so leaving it
              merely `visibility:hidden` would still reserve its height
              and push the resume down on the printed page.
            */}
            <div className="flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur print:hidden">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Print preview</h2>
                <p className="text-xs text-slate-500">
                  Use Print, then choose <strong>Save as PDF</strong> in the browser dialog.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPrintPreview(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
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
