import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-slate-950
      px-4
      "
    >
      <form
        onSubmit={submitHandler}
        className="
        bg-slate-900
        p-8
        rounded-xl
        w-full
        max-w-md
        border
        border-slate-800
        shadow-xl
        "
      >
        <h2
          className="
          text-3xl
          font-bold
          mb-2
          text-white
          "
        >
          Create Account
        </h2>

        <p
          className="
          text-slate-400
          mb-6
          "
        >
          Join TeamFlow and manage
          your projects efficiently.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          className="
          w-full
          p-3
          mb-4
          bg-slate-800
          text-white
          rounded-lg
          border
          border-slate-700
          focus:outline-none
          focus:border-indigo-500
          "
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="
          w-full
          p-3
          mb-4
          bg-slate-800
          text-white
          rounded-lg
          border
          border-slate-700
          focus:outline-none
          focus:border-indigo-500
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          className="
          w-full
          p-3
          mb-6
          bg-slate-800
          text-white
          rounded-lg
          border
          border-slate-700
          focus:outline-none
          focus:border-indigo-500
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-indigo-600
          hover:bg-indigo-700
          transition
          py-3
          rounded-lg
          font-semibold
          text-white
          "
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p
          className="
          text-center
          text-slate-400
          mt-5
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
            text-indigo-400
            hover:text-indigo-300
            "
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;