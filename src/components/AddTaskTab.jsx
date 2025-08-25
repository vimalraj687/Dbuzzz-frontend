import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { createTask, resetSuccess } from "../features/taskSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTaskTab = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.tasks);

  const handleChange = (e) =>

    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    dispatch(createTask(form))
      .unwrap()
      .then(() => {
        toast.success("✅ Task Added Successfully!");
        setForm({ title: "", description: "" });
        dispatch(resetSuccess());
        navigate("/dashboard/home");
      })
      .catch((err) => toast.error(err?.message || "Error"));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg shadow-xl p-8 rounded-2xl w-96"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          ➕ Add New Task
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full mb-6 p-3 rounded-xl border-none focus:ring-2 focus:ring-pink-300 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition-transform transform hover:scale-105"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskTab;
