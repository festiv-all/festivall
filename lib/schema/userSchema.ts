import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match"),
  isOver14: yup
    .boolean()
    .oneOf([true], "You must be over 14 years old to use this service"),
  termsAgreement: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and privacy policy"),
});

export type UserFormData = yup.InferType<typeof userSchema>;

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email address"),
  password: yup.string().required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Invalid email address"),
});

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
