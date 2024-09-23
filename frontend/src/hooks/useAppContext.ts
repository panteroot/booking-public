import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw Error(
      "useAppContext must be inside AppContextProvider (check your main file)!"
    );

  return context;
};
