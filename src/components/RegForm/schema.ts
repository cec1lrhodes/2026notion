import * as yup from "yup";

const rexExpEmail: RegExp = new RegExp(/^\S+@\S+\.\S+$/);

export const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Це поле обов'язкове")
    .min(3, "Мінімальна кількість символів 3"),
  email: yup
    .string()
    .required("Це поле обов'язкове")
    .matches(rexExpEmail, "Невірний формат пошти"),
  password: yup
    .string()
    .required("Введіть пароль")
    .min(6, "Пароль має містити мінімум 6 символів"),
});
