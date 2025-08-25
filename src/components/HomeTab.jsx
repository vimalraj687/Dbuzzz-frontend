import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask, updateTask } from "../features/taskSlice";
import { toast } from "react-toastify";

const HomeTab = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [editingTask, setEditingTask] = useState(null); 
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
      .unwrap()
      .then(() => toast.success("🗑️ Task Deleted"))
      .catch((err) => toast.error(err?.message || "Error deleting task"));
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setForm({ title: task.title, description: task.description });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: editingTask, updates: form })) // ✅ fixed payload
      .unwrap()
      .then(() => {
        toast.success("✅ Task Updated");
        setEditingTask(null);
        setForm({ title: "", description: "" });
      })
      .catch((err) => toast.error(err?.message || "Error updating task"));
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl p-8 rounded-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          📋 My Tasks
        </h2>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-white text-center">No tasks found. Add one!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr className="bg-white/30">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-white/20 hover:bg-white/10"
                  >
                    <td className="p-3">{task.title}</td>
                    <td className="p-3">{task.description}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-3 py-1 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Form Modal */}
        {editingTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg shadow-xl p-6 rounded-2xl w-96">
              <h3 className="text-xl font-bold text-white mb-4">✏️ Edit Task</h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Task Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTab;
