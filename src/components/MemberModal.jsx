import { useState } from "react";
import API from "../api/axios";

const MemberModal = ({
  projectId,
  closeModal,
  refreshProject,
}) => {
  const [email, setEmail] =
    useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        `/projects/${projectId}/add-member`,
        { email }
      );

      refreshProject();
      closeModal();
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
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
        w-[400px]
        "
      >
        <h2
          className="
          text-xl
          font-bold
          mb-4
          "
        >
          Add Member
        </h2>

        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          p-3
          bg-slate-800
          rounded
          mb-4
          "
        />

        <button
          className="
          w-full
          bg-indigo-600
          py-3
          rounded
          "
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default MemberModal;