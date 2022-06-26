import { useContext, createContext, SetStateAction, Dispatch } from "react";

export const AppContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: (() => null) as Dispatch<SetStateAction<boolean>>,
});

export function useAppContext() {
  return useContext(AppContext);
}