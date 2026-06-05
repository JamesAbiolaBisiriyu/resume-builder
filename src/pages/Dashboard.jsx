// File Purpose: Route-level page component for the Dashboard screen.
import {
  FilePenLineIcon,
  PlusIcon,
  UploadCloudIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
  UploadCloud,
  LoaderCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppState } from "../context/hooks";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { useState, useEffect, useCallback } from "react";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  // console.log("TOKEN:", token);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const { resumes, dashboard } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      dispatch({
        type: "SET_RESUMES",
        payload: data.resumes.map((resume) => ({
          ...resume,
          personal_info: { ...(resume.personal_info || {}) },
          experience: Array.isArray(resume.experience) ? resume.experience : [],
          education: Array.isArray(resume.education) ? resume.education : [],
          projects: Array.isArray(resume.projects) ? resume.projects : [],
          skills: Array.isArray(resume.skills) ? resume.skills : [],
          professional_summary: resume.professional_summary || "",
        })),
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      loadAllResumes();
    }
  }, [token, loadAllResumes]);

  const createResume = async (event) => {
    event.preventDefault();

    const title = dashboard.createTitle.trim();
    if (!title) return;

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      const newResume = data.resume;

      dispatch({ type: "ADD_RESUME", payload: newResume });
      dispatch({ type: "CLOSE_CREATE_MODAL" });

      navigate(`/app/builder/${newResume._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
  event.preventDefault();

  const file = dashboard.uploadFile;

  if (!file) {
    toast.error("Please select a resume file");
    return;
  }

  if (!dashboard.uploadTitle?.trim()) {
    toast.error("Please enter a resume title");
    return;
  }

  setIsLoading(true);

  try {
    // console.log("Step 1: Extracting PDF text...");
    const resumeText = await pdfToText(file);
    // console.log("Step 2: PDF extracted, length:", resumeText?.length);

    if (!resumeText || resumeText.trim().length < 10) {
      toast.error("Could not extract text from PDF. Please try a different file.");
      return;
    }

    // console.log("Step 3: Sending to server...");
    const { data } = await api.post(
      "/api/ai/upload-resume",
      {
        title: dashboard.uploadTitle.trim(),
        resumeText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // console.log("Step 4: Server response:", data);

    dispatch({ type: "CLOSE_UPLOAD_MODAL" });
    dispatch({ type: "SET_UPLOAD_FILE", payload: null });
    dispatch({ type: "SET_UPLOAD_TITLE", payload: "" });

    navigate(`/app/builder/${data.resumeId}`);
  } catch (error) {
    console.error("Upload error:", error);
    toast.error(error?.response?.data?.message || error.message || "Upload failed");
  } finally {
    setIsLoading(false);
  }
};

  const editTitle = async (event) => {
    event.preventDefault();

    if (!dashboard.editResumeId || !dashboard.editTitle.trim()) return;

    try {
      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId: dashboard.editResumeId,
          resumeData: {
            title: dashboard.editTitle.trim(),
          },
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      dispatch({
        type: "UPDATE_RESUME",
        payload: data.resume,
      });

      dispatch({ type: "CLOSE_EDIT_MODAL" });

      toast.success(data.message || "Resume updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmDelete) return;

    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      dispatch({
        type: "DELETE_RESUME",
        payload: resumeId,
      });

      toast.success(data.message || "Resume deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome {user?.name || "User"}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: "OPEN_CREATE_MODAL" })}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center
        justify-center rounded-lg gap-2 text-slate-600 border border-dashed
        border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all
        duration-300 cursor-pointer"
          >
            <PlusIcon
              className="size-11 transition-all duration-300 p-2.5
          bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full"
            />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => dispatch({ type: "OPEN_UPLOAD_MODAL" })}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center
        justify-center rounded-lg gap-2 text-slate-600 border border-dashed
        border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all
        duration-300 cursor-pointer"
          >
            <UploadCloudIcon
              className="size-11 transition-all duration-300 p-2.5
          bg-linear-to-br from-purple-300 to-indigo-500 text-white rounded-full"
            />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-76.25" />
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {resumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex
            flex-col items-center justify-center rounded-lg gap-2 border group
            hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2
              text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-slate-400
              group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on{" "}
                  {resume.updatedAt
                    ? new Date(resume.updatedAt).toLocaleDateString()
                    : "Just now"}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 flex items-center gap-1 rounded-md bg-white/80 p-1 shadow-sm backdrop-blur-sm"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white rounded text-slate-700 transition-colors"
                  />
                  <PencilIcon
                    onClick={() =>
                      dispatch({ type: "OPEN_EDIT_MODAL", payload: resume })
                    }
                    className="size-7 p-1.5 hover:bg-white rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {dashboard.showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => dispatch({ type: "CLOSE_CREATE_MODAL" })}
            className="fixed inset-0 bg-black/70 backdrop:blur bg-opacity-50
            z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4"> Create a Resume </h2>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SET_CREATE_TITLE",
                    payload: e.target.value,
                  })
                }
                value={dashboard.createTitle}
                type="text"
                placeholder="Resume title"
                className="w-full px-4 mb-4 focus:border-green-600
                ring-green-600"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  dispatch({ type: "CLOSE_CREATE_MODAL" });
                }}
              />
            </div>
          </form>
        )}

        {dashboard.showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => dispatch({ type: "CLOSE_UPLOAD_MODAL" })}
            className="fixed inset-0 bg-black/70 backdrop:blur bg-opacity-50
            z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4"> Upload Resume </h2>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SET_UPLOAD_TITLE",
                    payload: e.target.value,
                  })
                }
                value={dashboard.uploadTitle}
                type="text"
                placeholder="Resume title"
                className="w-full px-4 mb-4 focus:border-green-600
                ring-green-600"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select resume file
                  <div
                    className="flex flex-col items-center justify-center gap-2
                    border group text-slate-400 border-slate-400 border-dashed
                    rounded-md p-4 py-10 my-4 hover:border-green-500
                    hover:text-green-700 cursor-pointer transition-colors"
                  >
                    {dashboard.uploadFile ? (
                      <p className="text-green-700">
                        {dashboard.uploadFile.name}
                      </p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) =>
                    dispatch({
                      type: "SET_UPLOAD_FILE",
                      payload: e.target.files[0],
                    })
                  }
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* {isLoading ? "Uploading..." : "Upload Resume"} */}
                {isLoading && (
                  <LoaderCircleIcon className="animate-spin size-4 text-white " />
                )}
                {isLoading ? "uploading..." : "Upload Resume"}
                Upload resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  dispatch({ type: "CLOSE_UPLOAD_MODAL" });
                }}
              />
            </div>
          </form>
        )}

        {dashboard.editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
            className="fixed inset-0 bg-black/70 backdrop:blur bg-opacity-50
            z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4"> Edit Resume Title </h2>
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_EDIT_TITLE", payload: e.target.value })
                }
                value={dashboard.editTitle}
                type="text"
                placeholder="Resume title"
                className="w-full px-4 mb-4 focus:border-green-600
                ring-green-600"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update{" "}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  dispatch({ type: "CLOSE_EDIT_MODAL" });
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
