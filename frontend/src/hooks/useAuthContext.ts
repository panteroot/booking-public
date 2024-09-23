import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw Error(
      "useAuthContext must be inside AuthContextProvider (check your main file)!"
    );

  return context;
};
