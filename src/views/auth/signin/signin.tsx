import React, { useState } from "react";
import { useFormik } from "formik";
import { LOGIN_SCHEMA } from "src/utils/helpers";

export default function Signin() {
  const [mode, setMode] = useState("buyer");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: (values) => {
      alert(JSON.stringify({ ...values, mode }, null, 2));
    },
  });

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
    formik.resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="flex justify-center mb-4 space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="mode"
              value="buyer"
              checked={mode === "buyer"}
              onChange={handleModeChange}
              className="accent-blue-600"
            />
            <span>Buyer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="mode"
              value="seller"
              checked={mode === "seller"}
              onChange={handleModeChange}
              className="accent-blue-600"
            />
            <span>Seller</span>
          </label>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="input-field"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="input-field"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              Don't have an account? Sign up
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
          >
            Login as {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
}
