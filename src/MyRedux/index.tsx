import React, { createContext, useContext, useReducer, ReactNode } from "react";
import initialState, { InitialState } from "./Store";

// Define the initial state type
interface AppState {
  store: InitialState;
  dispatch: <K extends keyof InitialState>(
    name: K,
    value: InitialState[K]
  ) => void;
  multiDispatch: (actions: Action[]) => void;
}

// Define the action type as a tuple
type Action = [keyof InitialState, InitialState[keyof InitialState]];

const AppContext = createContext<AppState | undefined>(undefined);

const reducer = (state: InitialState, actions: Action[]): InitialState => {
  let newState = { ...state };
  actions.forEach(([name, value]) => {
    newState = {
      ...newState,
      [name]: value,
    };
  });
  return newState;
};

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatchAction] = useReducer(reducer, initialState);

  const dispatch = <K extends keyof InitialState>(
    name: K,
    value: InitialState[K]
  ) => {
    dispatchAction([[name, value]]);
  };

  const multiDispatch = (actions: Action[]) => {
    dispatchAction(actions);
  };

  return (
    <AppContext.Provider value={{ store: state, dispatch, multiDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, AppContext, useGlobalContext };
