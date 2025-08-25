import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  // ✅ Success & error handling
  useEffect(() => {
    if (success) {
      toast.success("✅ Login Successful!");
      formik.resetForm();

      setTimeout(() => {
        navigate("/dashboard");
        dispatch(resetAuthState());
      }, 1000);
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [success, error, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white/20 backdrop-blur-lg shadow-xl p-8 rounded-2xl w-96"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          {...formik.getFieldProps("email")}
          className="w-full mb-2 p-3 rounded-xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-300 text-sm mb-3">{formik.errors.email}</p>
        ) : null}

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className="w-full mb-2 p-3 rounded-xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-300 text-sm mb-3">{formik.errors.password}</p>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition-transform transform hover:scale-105"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-300 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
