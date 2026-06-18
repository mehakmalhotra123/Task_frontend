import { useState } from "react";
import API from "../api/axios";

const MemberModal = ({
  projectId,
  closeModal,
  refreshProject,
}) => {

  const [email, setEmail] =
    useState("");

  const submitHandler =
    async (e) => {

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
          error.response?.data?.message ||
          "Failed to add member"
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
        w-[400px]
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
          text-xl
          font-bold
          mb-5
          "
        >
          Add Member
        </h2>

        {/* Email Input */}

        <input
          type="email"
          placeholder="Enter User Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
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
          required
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
          Add Member
        </button>

      </form>

    </div>
  );
};

export default MemberModal;