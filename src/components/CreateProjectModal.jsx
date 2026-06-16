import {
  useState,
} from "react";

import API from "../api/axios";

const CreateProjectModal = ({
  closeModal,
  refreshProjects,
}) => {

  const [name,setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const submitHandler =
  async (e) => {

    e.preventDefault();

    await API.post(
      "/projects",
      {
        name,
        description,
      }
    );

    refreshProjects();

    closeModal();
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/60
      flex
      justify-center
      items-center
      "
    >
      <form
        onSubmit={submitHandler}
        className="
        bg-slate-900
        p-8
        rounded-xl
        w-96
        "
      >

        <h2
          className="
          text-2xl
          mb-5
          "
        >
          Create Project
        </h2>

        <input
          placeholder="Project Name"
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-3
          "
          onChange={(e)=>
            setName(
              e.target.value
            )
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
          onChange={(e)=>
            setDescription(
              e.target.value
            )
          }
        />

        <button
          className="
          w-full
          bg-indigo-600
          py-3
          rounded
          "
        >
          Create
        </button>

      </form>
    </div>
  );
};

export default CreateProjectModal;