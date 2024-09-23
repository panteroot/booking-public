import { useQuery } from "react-query";
import * as apiUser from "@api/UserApi";

export function useQueryLoggedUser() {
  const { data, isLoading, isError, error } = useQuery(
    "loggedUser",
    () => apiUser.getLoggedUserDetails(),
    {
      retry: false,
    }
  );

  return { data, isLoading, isError, error };
}
