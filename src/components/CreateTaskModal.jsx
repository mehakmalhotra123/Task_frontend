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

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          `/tasks/project/${projectId}`,
          form
        );

        refreshTasks();

        closeModal();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create task"
        );

      }
    };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      flex
      justify-center
      items-center
      z-50
      "
      onClick={closeModal}
    >

      <form
        onSubmit={submitHandler}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
        bg-slate-900
        p-6
        rounded-xl
        w-[500px]
        relative
        border
        border-slate-800
        "
      >

        {/* Close Button */}

        <button
          type="button"
          onClick={closeModal}
          className="
          absolute
          top-3
          right-4
          text-2xl
          text-slate-400
          hover:text-red-500
          transition
          "
        >
          ×
        </button>

        {/* Heading */}

        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >
          Create Task
        </h2>

        {/* Title */}

        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
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

        {/* Description */}

        <textarea
          placeholder="Task Description"
          value={
            form.description
          }
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

        {/* Assign User */}

        <select
          value={
            form.assignedTo
          }
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
          <option value="">
            Select User
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

        {/* Priority */}

        <select
          value={
            form.priority
          }
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
              priority:
                e.target.value,
            })
          }
        >
          <option>
            Low
          </option>

          <option>
            Medium
          </option>

          <option>
            High
          </option>
        </select>

        {/* Due Date */}

        <input
          type="date"
          value={
            form.dueDate
          }
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-4
          "
          onChange={(e) =>
            setForm({
              ...form,
              dueDate:
                e.target.value,
            })
          }
        />

        {/* Submit */}

        <button
          type="submit"
          className="
          bg-indigo-600
          hover:bg-indigo-700
          transition
          py-3
          w-full
          rounded
          font-medium
          "
        >
          Create Task
        </button>

      </form>

    </div>
  );
};

export default CreateTaskModal;