import { useQueryClient, useMutation } from "react-query";
import { useAppContext } from "@hooks/useAppContext";
import styles from "./header.module.scss";
import * as api from "@api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

const Signout = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { resetAuthentication } = useAuthContext();

  const mutation = useMutation(api.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logout successful!", type: "SUCCESS" });
      resetAuthentication();
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className={styles.signout}>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Signout;
