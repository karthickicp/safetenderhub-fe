import * as Yup from "yup";

export const ORGANIZATION_SCHEMA = Yup.object().shape({
  organisationType: Yup.string().required("Organisation type is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  organisation: Yup.string().required("Organisation is required"),
  officeZoneName: Yup.string().required("Office/Zone name is required"),
});

export const AADHAR_SHCHEMA = Yup.object().shape({
  aadhaar: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar must be a 12-digit number")
    .required("Aadhaar is required"),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number")
    .required("Mobile number is required"),
  consent: Yup.boolean()
    .oneOf([true], "Consent is required")
    .required("Consent is required"),
});

export const EMAIL_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Please confirm your email"),
});

export const USER_SCHEMA = Yup.object({
  userId: Yup.string().required("User ID is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must meet all requirements"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export const LOGIN_SCHEMA = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});
