import * as yup from "yup";
import { type RegisterInterface } from "./FormTypes";

const rexExpEmail: RegExp = new RegExp(/^\S+@\S+\.\S+$/);

export const getSchema = (mode: "register" | "login") =>
  yup.object().shape({
    email: yup
      .string()
      .required("Це поле обов'язкове")
      .matches(rexExpEmail, "Невірний формат пошти"),
    username:
      mode === "register"
        ? yup
            .string()
            .trim()
            .required("Це поле обов'язкове")
            .min(3, "Мінімальна кількість символів 3")
        : yup.string().optional(),
    password: yup
      .string()
      .required("Введіть пароль")
      .min(6, "Пароль має містити мінімум 6 символів"),
  }) as yup.ObjectSchema<RegisterInterface>;
