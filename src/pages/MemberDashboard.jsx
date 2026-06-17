import { useEffect, useState } from "react";
import API from "../api/axios";

const MemberDashboard = () => {

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {

    const getTasks =
      async () => {

      try {

        const { data } =
          await API.get(
            "/dashboard/member"
          );

        setTasks(data);

      } catch (error) {
        console.log(error);
      }
    };

    getTasks();

  }, []);

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        My Dashboard
      </h1>

      <div
        className="
        bg-slate-900
        p-6
        rounded-xl
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-4
          "
        >
          My Tasks
        </h2>

        {tasks.map((task) => (
          <div
            key={task._id}
            className="
            bg-slate-800
            p-4
            rounded
            mb-3
            "
          >
            <h3>
              {task.title}
            </h3>

            <p>
              Status:
              {" "}
              {task.status}
            </p>

            <p>
              Priority:
              {" "}
              {task.priority}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MemberDashboard;