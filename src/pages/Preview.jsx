// File Purpose: Route-level page component for the Preview screen.

import { ArrowLeftIcon } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppState } from "../context/hooks";
import { useSelector } from "react-redux";
import api from "../configs/api";
import ResumePreview from "../components/home/ResumePreview";
import Loader from "../components/home/Loader";

const Preview = () => {
  const { resumeId } = useParams();
  const state = useAppState();
  const { token } = useSelector((reduxState) => reduxState.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedResume, setLoadedResume] = useState(null);

  // Get resume from global state
  const resume = state.resumes.find((r) => r._id === resumeId);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!resumeId) {
          throw new Error("No resume ID provided");
        }

        const endpoints = token
          ? [`/api/resumes/get/${resumeId}`, `/api/resumes/public/${resumeId}`]
          : [`/api/resumes/public/${resumeId}`];

        for (const endpoint of endpoints) {
          try {
            const { data } = await api.get(endpoint, {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            if (data?.resume) {
              setLoadedResume(data.resume);
              setIsLoading(false);
              return;
            }
          } catch (requestError) {
            if (requestError?.response?.status !== 404) {
              throw requestError;
            }
          }
        }

        throw new Error("Resume not found");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeId, token]);

  const previewResume = loadedResume || resume;

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-2xl text-red-500 font-medium mb-4">
          Error: {error}
        </p>

        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9
          m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Go to home page
        </Link>
      </div>
    );
  }

  // Resume found
  if (previewResume) {
    return (
      <div className="bg-slate-100 min-h-screen">
        <div className="max-w-3xl mx-auto py-10 px-4">
          <ResumePreview
            data={previewResume}
            template={previewResume.template}
            accentColor={previewResume.accent_color}
            classes="py-4 bg-white shadow-lg rounded-lg"
          />
        </div>
      </div>
    );
  }

  // Resume not found
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-center text-6xl text-slate-400 font-medium">
        Resume not found.
      </p>

      <Link
        to="/"
        className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9
        m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
      >
        <ArrowLeftIcon className="mr-2 size-4" />
        Go to home page
      </Link>
    </div>
  );
};

export default Preview;
