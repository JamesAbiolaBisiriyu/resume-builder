// File Purpose: Custom hooks for accessing app state and dispatch.
import { useContext } from "react";
import { AppDispatchContext, AppStateContext } from "./appContextState";

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
