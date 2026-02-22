import { useForm } from "react-hook-form";
import { type RegisterInterface } from "./FormTypes";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./stylesRegForm/stylesRegForm.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";

const RegForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInterface>({ resolver: yupResolver(schema) });

  const login = useAuthStore((s) => s.login);

  const submitForm = (data: RegisterInterface) => {
    // тут буде запит на бекенд
    // поки що  зберігаємо локально і редіректимо
    login({ email: data.email, username: data.username });
    navigate({ to: "/" });
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Fill in the fields below</p>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        {/* Username */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="your_username"
            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
            {...register("username")}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegForm;
