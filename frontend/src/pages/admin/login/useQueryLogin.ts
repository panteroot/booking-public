import { useMutation, useQueryClient } from "react-query";
import * as api from "@api/AuthApi";
import { useAppContext } from "@hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

export function useQueryLogin() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { saveAuthentication, resetAuthentication } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation(api.loginAsAdmin, {
    onSuccess: async (result) => {
      showToast({ message: "Login successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateAdminToken");
      const { userId, name, userType } = result;
      resetAuthentication();
      saveAuthentication(true, userId, name, userType);

      navigate("/admin/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data || error.message || "Error during admin login!";
      showToast({ message: errorMessage, type: "ERROR" });
    },
  });

  return mutation;
}
