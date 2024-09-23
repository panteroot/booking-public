import { useForm } from "react-hook-form";
import styles from "./loginForm.module.scss";
import { useQueryLogin } from "../useQueryLogin";
import { AdminDTO } from "@repositories/UserRepository";
import { globalSettings } from "@repositories/BaseRepository";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminDTO>();

  globalSettings.bypassInterceptor = true;

  const mutation = useQueryLogin();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className={styles.login}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.divCol2}>
          <div className={styles.divInput}>
            <label>Username</label>
            <input
              className={errors.username ? `${styles.errorInput}` : ""}
              type="text"
              {...register("username", {
                required: "This field is required!",
              })}
            />
            {errors.username && (
              <span className={styles.error}> {errors.username.message}</span>
            )}
          </div>

          <div className={styles.divInput}>
            <label>Password</label>
            <input
              className={errors.password ? `${styles.errorInput}` : ""}
              type="password"
              {...register("password", {
                required: "This field is required!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters!",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error}> {errors.password.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formButton}>
          <button type="submit" className={styles.buttonSave}>
            Login as Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
