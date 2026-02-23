import { useForm } from "react-hook-form";
import { type RegisterInterface } from "./FormTypes";
import { getSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./stylesRegForm/stylesRegForm.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMemo, useEffect } from "react";

const RegForm = () => {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [authError, setAuthError] = useState<string | null>(null);

  const registerUser = useAuthStore((s) => s.register);
  const loginUser = useAuthStore((s) => s.loginUser);

  const navigate = useNavigate();

  const schema = useMemo(() => getSchema(mode), [mode]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInterface>({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset();
  }, [mode, reset]);

  const submitForm = (data: RegisterInterface) => {
    setAuthError(null);

    if (mode === "register") {
      const success = registerUser({
        email: data.email,
        username: data.username ?? "",
        password: data.password,
      });
      if (!success) {
        setAuthError("Email is already taken");
        return;
      }
    } else {
      const success = loginUser(data.email, data.password);
      if (!success) {
        setAuthError("Invalid email or password");
        return;
      }
    }

    navigate({ to: "/" });
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        {/* Header  */}
        <div className={styles.formHeader}>
          <div>
            <h1 className={styles.title}>
              {mode === "register" ? "Create account" : "Log In"}
            </h1>
            <p className={styles.subtitle}>Fill in the fields below</p>
          </div>
          <div className={styles.switchMode}>
            <span className={styles.switchText}>
              {mode === "register" ? "or" : "or"}
            </span>
            <button
              type="button"
              className={styles.switchBtn}
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                reset();
              }}
            >
              {mode === "register" ? "Log In" : "Register"}
            </button>
          </div>
        </div>

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

        {/* Username  тільки при реєстрації */}
        {mode === "register" && (
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
        )}

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

        {authError && <span className={styles.error}>{authError}</span>}

        <button type="submit" className={styles.submitBtn}>
          {mode === "register" ? "Register" : "Log In"}
        </button>
      </form>
    </div>
  );
};
export default RegForm;
