import {
  useState,
} from "react";

import API from "../api/axios";

const CreateProjectModal = ({
  closeModal,
  refreshProjects,
}) => {

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/projects",
          {
            name,
            description,
          }
        );

        refreshProjects();

        closeModal();

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Failed to create project"
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
        p-8
        rounded-xl
        w-[450px]
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
          Create Project
        </h2>

        {/* Project Name */}

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-4
          border
          border-slate-700
          focus:outline-none
          focus:border-indigo-500
          "
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

        {/* Description */}

        <textarea
          placeholder="Project Description"
          value={description}
          rows={4}
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-4
          border
          border-slate-700
          focus:outline-none
          focus:border-indigo-500
          "
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        {/* Submit Button */}

        <button
          type="submit"
          className="
          w-full
          bg-indigo-600
          hover:bg-indigo-700
          transition
          py-3
          rounded
          font-medium
          "
        >
          Create Project
        </button>

      </form>

    </div>
  );
};

export default CreateProjectModal;