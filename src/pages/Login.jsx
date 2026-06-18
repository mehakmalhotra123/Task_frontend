import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

const [email, setEmail] =
useState("");

const [password, setPassword] =
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

    if (
      data.role ===
      "admin"
    ) {
      navigate(
        "/dashboard"
      );
    } else {
      navigate(
        "/member-dashboard"
      );
    }

  } catch (error) {

    alert(
      error.response
        ?.data
        ?.message ||
      "Login Failed"
    );

  }
};


return ( <div
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
onSubmit={
submitHandler
}
className="
bg-slate-900
p-8
rounded-2xl
w-full
max-w-lg
border
border-slate-800
shadow-2xl
"
>

```
    <h2
      className="
      text-3xl
      font-bold
      mb-2
      text-white
      "
    >
      Welcome Back
    </h2>

    <p
      className="
      text-slate-400
      mb-6
      "
    >
      Sign in to access
      your TeamFlow
      workspace.
    </p>

    <input
      type="email"
      placeholder="Email"
      className="
      w-full
      p-3
      mb-4
      bg-slate-800
      rounded-lg
      border
      border-slate-700
      focus:outline-none
      focus:border-indigo-500
      "
      onChange={(e) =>
        setEmail(
          e.target.value
        )
      }
    />

    <input
      type="password"
      placeholder="Password"
      className="
      w-full
      p-3
      mb-4
      bg-slate-800
      rounded-lg
      border
      border-slate-700
      focus:outline-none
      focus:border-indigo-500
      "
      onChange={(e) =>
        setPassword(
          e.target.value
        )
      }
    />

    <button
      className="
      bg-indigo-600
      hover:bg-indigo-700
      transition
      w-full
      py-3
      rounded-lg
      font-semibold
      "
    >
      Login
    </button>

    <p
      className="
      text-center
      text-slate-400
      mt-5
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

    <div
      className="
      mt-6
      bg-slate-800/70
      border
      border-slate-700
      rounded-xl
      p-4
      "
    >
      <h3
        className="
        text-lg
        font-semibold
        text-indigo-400
        mb-3
        "
      >
        Demo Credentials
      </h3>

      <div
        className="
        space-y-4
        text-sm
        "
      >

        <div
          className="
          bg-slate-900
          p-3
          rounded-lg
          "
        >
          <p
            className="
            font-semibold
            text-green-400
            mb-1
            "
          >
            Admin Account
          </p>

          <p>
            Email:
            mehakmalhotra200479@gmail.com
          </p>

          <p>
            Password:
           123456
          </p>
        </div>

        <div
          className="
          bg-slate-900
          p-3
          rounded-lg
          "
        >
          <p
            className="
            font-semibold
            text-blue-400
            mb-1
            "
          >
            Member Account
          </p>

          <p>
            Email:
            soonam@gmail.com
          </p>

          <p>
            Password:
           123456
          </p>
        </div>

        <div
          className="
          text-slate-400
          text-xs
          leading-5
          border-t
          border-slate-700
          pt-3
          "
        >
          <p>
            • New users can
            register and create
            Member accounts.
          </p>

          <p>
            • Admin accounts
            cannot be created
            through registration.
          </p>

          <p>
            • Use the Admin
            account to explore
            project creation,
            member management,
            task assignment and
            dashboard analytics.
          </p>
        </div>

      </div>
    </div>

  </form>
</div>


);
};

export default Login;
