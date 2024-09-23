import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "@hooks/useAppContext";
import styles from "./header.module.scss";
import * as api from "@api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const Signout = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { resetAuthentication } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation(api.logoutAsAdmin, {
    onSuccess: async () => {
      showToast({ message: "Logout successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateAdminToken");
      resetAuthentication();
      navigate("/admin/login");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Logout
    </button>
  );
};

export default Signout;
