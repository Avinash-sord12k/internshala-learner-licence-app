import * as yup from "yup";

const loginResolver = yup.object().shape({
  email: yup.string()
    .email("must be a valid email")
    .required("This field is required"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("This field is required"),
  // dashboard: yup.string().required("This field is required"),
});

export default loginResolver;