import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if (success) {
      toast.success("🎉 Registered Successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white/20 backdrop-blur-lg shadow-xl p-8 rounded-2xl w-96"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          {...formik.getFieldProps("name")}
          className="w-full mb-2 p-3 rounded-xl border-none focus:ring-2 focus:ring-indigo-300 outline-none"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-200 text-sm mb-2">{formik.errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          {...formik.getFieldProps("email")}
          className="w-full mb-2 p-3 rounded-xl border-none focus:ring-2 focus:ring-indigo-300 outline-none"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-200 text-sm mb-2">{formik.errors.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className="w-full mb-2 p-3 rounded-xl border-none focus:ring-2 focus:ring-indigo-300 outline-none"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-200 text-sm mb-2">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-transform transform hover:scale-105"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-yellow-300 cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
