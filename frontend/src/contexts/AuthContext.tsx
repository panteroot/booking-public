import { createContext, ReactNode, useState } from "react";
import { UserType } from "../repositories/UserRepository";

// Type guard to check if a string is a valid UserType
function isUserType(value: any): value is UserType {
  return value === "ADMIN" || value === "USER";
}

type AuthContextType = {
  isLoggedIn: boolean;
  userId?: string;
  name?: string;
  userType?: UserType;
  saveAuthentication: (
    isLoggedIn: boolean,
    userId: string,
    name: string,
    userType: UserType
  ) => void;
  resetAuthentication: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isLoggedIn") || "false")
  );
  const [userId, setUserId] = useState<string | undefined>(
    () => localStorage.getItem("userId") || undefined
  );
  const [name, setName] = useState<string | undefined>(
    () => localStorage.getItem("name") || undefined
  );
  const [userType, setUserType] = useState<UserType | undefined>(() => {
    const storedUserType = localStorage.getItem("userType");
    return isUserType(storedUserType) ? storedUserType : undefined;
  });

  const saveAuthentication = (
    isLoggedIn: boolean,
    userId?: string,
    name?: string,
    userType?: UserType
  ) => {
    setIsLoggedIn(isLoggedIn);
    setUserId(userId);
    setName(name);
    setUserType(userType);

    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    localStorage.setItem("userId", userId || "");
    localStorage.setItem("name", name || "");
    localStorage.setItem("userType", userType || "");
  };

  const resetAuthentication = () => {
    setIsLoggedIn(false);
    setUserId(undefined);
    setName(undefined);
    setUserType(undefined);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("userType");

    // remove localStorage and sessionStorage of booking and search details
    if (userType === "USER") {
      localStorage.removeItem("destination");
      localStorage.removeItem("checkIn");
      localStorage.removeItem("checkOut");
      localStorage.removeItem("adultCount");
      localStorage.removeItem("childCount");
      localStorage.removeItem("roomCount");

      sessionStorage.removeItem("checkIn");
      sessionStorage.removeItem("adultCount");
      sessionStorage.removeItem("childCount");
      sessionStorage.removeItem("rooms");
      sessionStorage.removeItem("propertyId");
      sessionStorage.removeItem("totalCost");
      sessionStorage.removeItem("clientSecret");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        name,
        userType,
        userId,
        saveAuthentication,
        resetAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
