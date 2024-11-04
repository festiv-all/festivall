import * as yup from "yup";

export const userSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
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
    )
    .required("Password is required"),
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

export const socialUserSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  isOver14: yup
    .boolean()
    .oneOf([true], "You must be over 14 years old to use this service"),
  termsAgreement: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and privacy policy"),
});

export type SocialUserFormData = yup.InferType<typeof socialUserSchema>;

export const oauthUserSchema = yup.object({
  isOver14: yup
    .boolean()
    .oneOf([true], "You must be over 14 years old to use this service"),
  termsAgreement: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and privacy policy"),
});

export type OauthUserFormData = yup.InferType<typeof oauthUserSchema>;

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

export const resetPasswordSchema = yup.object({
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
});
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

export const updateUserSchema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email address"),
  password: yup.string(),
  phone: yup.string(),
});
export type UpdateUserFormData = yup.InferType<typeof updateUserSchema>;

export const updatePasswordSchema = yup.object({
  password: yup.string().required("Password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm new password is required"),
});
export type UpdatePasswordFormData = yup.InferType<typeof updatePasswordSchema>;

export const updatePhoneSchema = yup.object({
  phone: yup.string().required("Phone number is required"),
});

export type UpdatePhoneFormData = yup.InferType<typeof updatePhoneSchema>;

export const resendEmailFormSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export type ResendEmailFormData = { email: string };
