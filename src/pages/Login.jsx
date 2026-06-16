import { useState } from "react";


import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const { login } =
    useAuth();

  const navigate =
    useNavigate();

  const submitHandler =
  async (e) => {

    e.preventDefault();

    try {

      const { data } =
      await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(data);

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
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
          text-3xl
          font-bold
          mb-6
          "
        >
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="
          w-full
          p-3
          mb-4
          bg-slate-800
          rounded
          "
          onChange={(e)=>
          setEmail(
            e.target.value
          )}
        />

        <input
          type="password"
          placeholder="Password"
          className="
          w-full
          p-3
          mb-4
          bg-slate-800
          rounded
          "
          onChange={(e)=>
          setPassword(
            e.target.value
          )}
        />

        <button
          className="
          bg-indigo-600
          w-full
          py-3
          rounded
          "
        >
          Login
        </button>

        <p
  className="
  text-center
  text-slate-400
  mt-4
  "
>
  Don't have an account?{" "}
  <Link
    to="/register"
    className="
    text-indigo-400
    hover:text-indigo-300
    font-medium
    "
  >
    Register
  </Link>
</p>

      </form>

      



    </div>
  );
};

export default Login;