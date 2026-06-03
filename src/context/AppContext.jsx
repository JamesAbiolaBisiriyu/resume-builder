// File Purpose: Centralized state container for resume builder flows.
import { useReducer } from "react";
import {
  AppDispatchContext,
  AppStateContext,
  appReducer,
  initialState,
} from "./appContextState";

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
