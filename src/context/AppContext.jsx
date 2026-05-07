// File Purpose: Centralized state container and reducer logic for resume builder flows.
import { createContext, useContext, useReducer } from "react";
import { dummyResumeData } from "../assets/assets";

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

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
  projects: Array.isArray(resume.projects) ? resume.projects : [],
  skills: Array.isArray(resume.skills) ? resume.skills : [],
  professional_summary: resume.professional_summary || "",
});

const initialState = {
  resumes: dummyResumeData.map(normalizeResume),
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

const appReducer = (state, action) => {
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
    case "DELETE_RESUME":
      return {
        ...state,
        resumes: state.resumes.filter((resume) => resume._id !== action.payload),
      };
    case "UPDATE_RESUME_TITLE":
      return {
        ...state,
        resumes: state.resumes.map((resume) =>
          resume._id === action.payload.resumeId
            ? {
                ...resume,
                title: action.payload.title,
                updatedAt: new Date().toISOString(),
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
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);

  if (!context) {
    throw new Error("useAppDispatch must be used within AppStateProvider");
  }

  return context;
};
