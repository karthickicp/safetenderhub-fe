import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import {
  AADHAR_SHCHEMA,
  EMAIL_SCHEMA,
  ORGANIZATION_SCHEMA,
  USER_SCHEMA,
} from "../../../utils/helpers";
const Registration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log(activeTab, "activeTab");
  const tabs = [
    "Organisation Details",
    "Personal Verification",
    "Email Verification",
    "User Credentials",
  ];

  return (
    <div className="flex flex-col lg:flex-row border rounded-md shadow-md w-full max-w-6xl mx-auto mt-10">
      {/* Left Tabs */}
      <div className="w-full lg:w-1/4 bg-gray-50 border-b lg:border-b-0 lg:border-r p-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer px-4 py-3 rounded-sm font-medium text-sm sm:text-base ${
              activeTab === index
                ? "bg-white border-l-4 border-blue-600 text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Right Form Content */}
      <div className="w-full lg:w-3/4 p-4 sm:p-6">
        {activeTab === 0 ? (
          <Formik
            initialValues={{
              organisationType: "",
              state: "",
              district: "",
              organisation: "",
              officeZoneName: "",
            }}
            validationSchema={ORGANIZATION_SCHEMA}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, handleChange, handleBlur, isValid }) => {
              console.log(values, "organisation values");
              return (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">Organisation Type *</label>
                      <Field
                        name="organisationType"
                        as="select"
                        className="input-field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.organisationType}
                      >
                        <option value="">Select Organisation Type</option>
                        <option>
                          Multi-State Co-operative Societies (MSCS)
                        </option>
                        <option>
                          Single-State Co-operative Societies (SSCS)
                        </option>
                      </Field>
                      <ErrorMessage
                        name="organisationType"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label className="input-label">State *</label>
                      <Field
                        name="state"
                        as="select"
                        className="input-field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select State</option>
                        {/* Add state options here */}
                      </Field>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label className="input-label">District *</label>
                      <Field
                        name="district"
                        as="select"
                        className="input-field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select District</option>
                      </Field>
                      <ErrorMessage
                        name="district"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label className="input-label">Organisation *</label>
                      <Field
                        name="organisation"
                        as="select"
                        className="input-field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select Organisation</option>
                      </Field>
                      <ErrorMessage
                        name="organisation"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="input-label">Office/Zone Name *</label>
                      <Field
                        name="officeZoneName"
                        type="text"
                        placeholder="Enter location"
                        className="input-field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="officeZoneName"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="text-right mt-6">
                    <button
                      className={`btn ${!isValid ? "btn-disabled" : ""}`}
                      type="submit"
                      disabled={!isValid}
                    >
                      NEXT
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : activeTab === 1 ? (
          <Formik
            initialValues={{
              aadhaar: "",
              mobile: "",
              consent: false,
            }}
            validationSchema={AADHAR_SHCHEMA}
            onSubmit={(values) => {
              console.log(values);
              // You can move to next tab or trigger Aadhaar verification here
            }}
          >
            {({ values, handleChange, handleBlur, isValid }) => (
              <Form className="space-y-6">
                <div className="bg-blue-100 text-sm text-gray-700 p-4 rounded">
                  We respect your Privacy. We do not share your personal details
                  with anyone.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">
                      Aadhaar Number / Virtual ID *
                    </label>
                    <Field
                      name="aadhaar"
                      type="text"
                      placeholder="Enter Aadhaar number / Virtual ID"
                      className="input-field"
                      value={values.aadhaar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="aadhaar"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label className="input-label">
                      Mobile number linked with Aadhaar *
                    </label>
                    <Field
                      name="mobile"
                      type="text"
                      placeholder="Enter mobile number"
                      className="input-field"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Field type="checkbox" name="consent" className="mt-1" />
                  <p className="text-sm">
                    I, the holder of the above Aadhaar, hereby give my consent
                    to GeM...
                  </p>
                </div>
                <ErrorMessage
                  name="consent"
                  component="div"
                  className="text-sm text-red-500"
                />

                <p className="text-sm">
                  मैं, उपर्युक्त आधार का धारक... (translated)
                </p>
                <p className="text-sm">
                  Click on the play button to listen consent / सहमति सुनने के
                  लिए...
                </p>

                <audio controls className="w-full">
                  <source src="consent-audio.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <button
                  type="submit"
                  className={`px-6 py-2 rounded text-white ${
                    isValid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!isValid}
                >
                  VERIFY AADHAAR
                </button>
              </Form>
            )}
          </Formik>
        ) : activeTab === 2 ? (
          <Formik
            initialValues={{
              email: "",
              confirmEmail: "",
            }}
            validationSchema={EMAIL_SCHEMA}
            onSubmit={(values) => {
              console.log(values);
              // trigger OTP flow
            }}
          >
            {({ isValid }) => (
              <Form className="space-y-6">
                <div className="bg-blue-100 text-sm text-gray-700 p-4 rounded">
                  To view list of whitelisted domains (accepted at GeM),{" "}
                  <a href="#" className="text-blue-600 underline">
                    Click here
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Official Email Id *</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter official email id"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label className="input-label">Verify Email Id *</label>
                    <Field
                      name="confirmEmail"
                      type="email"
                      placeholder="Re-enter official email"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="confirmEmail"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-6 py-2 rounded text-white ${
                    isValid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  SEND OTP
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6">User Credentials</h2>

            <Formik
              initialValues={{ userId: "", password: "", confirmPassword: "" }}
              validationSchema={USER_SCHEMA}
              onSubmit={(values) => {
                console.log("Form Data", values);
              }}
            >
              {({ values, handleChange, handleBlur, isValid, touched }) => (
                <Form className="space-y-6">
                  {/* User ID */}
                  <div>
                    <label className="block font-medium mb-1">
                      User Id <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="userId"
                      type="text"
                      placeholder="Enter User id"
                      className="w-full border rounded px-4 py-2"
                      value={values.userId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="userId"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Password and Confirm Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password */}
                    <div className="relative">
                      <label className="block font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className="w-full border rounded px-4 py-2 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-9 right-3 text-gray-600"
                      >
                        👁️
                      </button>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <label className="block font-medium mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full border rounded px-4 py-2 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute top-9 right-3 text-gray-600"
                      >
                        👁️
                      </button>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  {/* Password rules */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Password must contain minimum of</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 list-disc">
                      <li>One Upper Case</li>
                      <li>One Lower Case</li>
                      <li>One Numeric</li>
                      <li>One Special Character</li>
                      <li>8 characters and maximum of 16 characters</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isValid || !touched.userId}
                    className={`px-6 py-2 rounded text-white font-medium ${
                      isValid && touched.userId
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    CREATE ACCOUNT
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
