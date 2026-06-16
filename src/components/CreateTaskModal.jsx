import { useState } from "react";
import API from "../api/axios";

const CreateTaskModal = ({
  projectId,
  members,
  closeModal,
  refreshTasks,
}) => {
  const [form, setForm] =
    useState({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
      dueDate: "",
    });

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.post(
      `/tasks/project/${projectId}`,
      form
    );

    refreshTasks();

    closeModal();
  };

  return (
    <div
      className="
      fixed inset-0
      bg-black/70
      flex justify-center
      items-center
      "
    >
      <form
        onSubmit={submitHandler}
        className="
        bg-slate-900
        p-6
        rounded-xl
        w-[500px]
        "
      >
        <h2
          className="
          text-xl
          mb-5
          "
        >
          Create Task
        </h2>

        <input
          placeholder="Title"
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-3
          "
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-3
          "
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <select
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-3
          "
          onChange={(e) =>
            setForm({
              ...form,
              assignedTo:
                e.target.value,
            })
          }
        >
          <option>
            Assign User
          </option>

          {members.map(
            (member) => (
              <option
                key={
                  member._id
                }
                value={
                  member._id
                }
              >
                {member.name}
              </option>
            )
          )}
        </select>

        <input
          type="date"
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-3
          "
          onChange={(e) =>
            setForm({
              ...form,
              dueDate:
                e.target.value,
            })
          }
        />

        <button
          className="
          bg-indigo-600
          py-3
          w-full
          rounded
          "
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskModal;