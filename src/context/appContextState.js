// File Purpose: Shared resume builder state, reducer logic, and contexts.
import { createContext } from "react";

export const AppStateContext = createContext(null);
export const AppDispatchContext = createContext(null);

const createEmptyResume = () => ({
  _id: "",
  title: "",
  personal_info: {},
  professional_summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  template: "classic",
  accent_color: "#3B82F6",
  public: false,
  updatedAt: "",
  createdAt: "",
});

const normalizeResume = (resume = {}) => ({
  ...createEmptyResume(),
  ...resume,
  personal_info: { ...(resume.personal_info || {}) },
  experience: Array.isArray(resume.experience) ? resume.experience : [],
  education: Array.isArray(resume.education) ? resume.education : [],
  projects: Array.isArray(resume.projects)
    ? resume.projects
    : Array.isArray(resume.project)
      ? resume.project
      : [],
  skills: Array.isArray(resume.skills) ? resume.skills : [],
  professional_summary: resume.professional_summary || "",
  public: resume.public ?? resume.isPublic ?? false,
  accent_color: resume.accent_color || resume.accentColor || "#3B82F6",
  template: resume.template || "classic",
});

export const initialState = {
  resumes: [],
  dashboard: {
    showCreateResume: false,
    showUploadResume: false,
    createTitle: "",
    uploadTitle: "",
    uploadFile: null,
    editResumeId: null,
    editTitle: "",
  },
  builder: {
    draftResume: createEmptyResume(),
    activeSectionIndex: 0,
    removeBackground: false,
  },
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_CREATE_MODAL":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          showCreateResume: true,
          createTitle: "",
        },
      };
    case "CLOSE_CREATE_MODAL":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          showCreateResume: false,
          createTitle: "",
        },
      };
    case "SET_CREATE_TITLE":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          createTitle: action.payload,
        },
      };
    case "OPEN_UPLOAD_MODAL":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          showUploadResume: true,
          uploadTitle: "",
          uploadFile: null,
        },
      };
    case "CLOSE_UPLOAD_MODAL":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          showUploadResume: false,
          uploadTitle: "",
          uploadFile: null,
        },
      };
    case "SET_UPLOAD_TITLE":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          uploadTitle: action.payload,
        },
      };
    case "SET_UPLOAD_FILE":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          uploadFile: action.payload,
        },
      };
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          editResumeId: action.payload._id,
          editTitle: action.payload.title,
        },
      };
    case "CLOSE_EDIT_MODAL":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          editResumeId: null,
          editTitle: "",
        },
      };
    case "SET_EDIT_TITLE":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          editTitle: action.payload,
        },
      };
    case "ADD_RESUME":
      return {
        ...state,
        resumes: [action.payload, ...state.resumes],
      };
    case "SET_RESUMES":
      return {
        ...state,
        resumes: action.payload,
      };
    case "DELETE_RESUME":
      return {
        ...state,
        resumes: state.resumes.filter(
          (resume) => resume._id !== action.payload,
        ),
      };
    case "UPDATE_RESUME":
    case "UPDATE_RESUME_TITLE":
      return {
        ...state,
        resumes: state.resumes.map((resume) =>
          resume._id === (action.payload._id || action.payload.resumeId)
            ? {
                ...resume,
                ...action.payload,
              }
            : resume,
        ),
      };
    case "INITIALIZE_BUILDER":
      return {
        ...state,
        builder: {
          ...state.builder,
          draftResume: normalizeResume(action.payload.resume),
          activeSectionIndex: 0,
          removeBackground: false,
        },
      };
    case "UPDATE_DRAFT_RESUME":
      return {
        ...state,
        builder: {
          ...state.builder,
          draftResume: {
            ...state.builder.draftResume,
            ...action.payload,
          },
        },
      };
    case "SET_ACTIVE_SECTION":
      return {
        ...state,
        builder: {
          ...state.builder,
          activeSectionIndex: action.payload,
        },
      };
    case "SET_REMOVE_BACKGROUND":
      return {
        ...state,
        builder: {
          ...state.builder,
          removeBackground: action.payload,
        },
      };
    case "SET_BUILDER_PUBLIC":
      return {
        ...state,
        builder: {
          ...state.builder,
          draftResume: {
            ...state.builder.draftResume,
            public: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
