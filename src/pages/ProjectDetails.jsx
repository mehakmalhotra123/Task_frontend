import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/axios";

import AddMemberModal from "../components/MemberModal";
import CreateTaskModal from "../components/CreateTaskModal";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [
    showMemberModal,
    setShowMemberModal,
  ] = useState(false);

  const [
    showTaskModal,
    setShowTaskModal,
  ] = useState(false);

  const getProject = async () => {
    try {
      const { data } =
        await API.get(`/projects/${id}`);

      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const { data } =
        await API.get(
          `/tasks/project/${id}`
        );

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMember = async (
    userId
  ) => {
    try {
      await API.delete(
        `/projects/${id}/remove-member`,
        {
          data: { userId },
        }
      );

      getProject();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    taskId,
    status
  ) => {
    try {
      await API.put(
        `/tasks/${taskId}/status`,
        { status }
      );

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
    getTasks();
  }, []);

  if (!project)
    return <h1>Loading...</h1>;

  return (
    <div>

      {/* Header */}

      <div className="mb-8">
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          {project.name}
        </h1>

        <p
          className="
          text-slate-400
          mt-2
          "
        >
          {project.description}
        </p>
      </div>

      {/* Buttons */}

      <div
        className="
        flex
        gap-3
        mb-8
        "
      >
        <button
          onClick={() =>
            setShowMemberModal(true)
          }
          className="
          bg-green-600
          px-4
          py-2
          rounded
          "
        >
          Add Member
        </button>

        <button
          onClick={() =>
            setShowTaskModal(true)
          }
          className="
          bg-indigo-600
          px-4
          py-2
          rounded
          "
        >
          Create Task
        </button>
      </div>

      {/* Members */}

      <div
        className="
        bg-slate-900
        p-6
        rounded-xl
        mb-8
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-4
          "
        >
          Members
        </h2>

        {project.members.map(
          (member) => (
            <div
              key={member._id}
              className="
              flex
              justify-between
              items-center
              bg-slate-800
              p-3
              rounded
              mb-2
              "
            >
              <div>
                <p>{member.name}</p>

                <p
                  className="
                  text-sm
                  text-slate-400
                  "
                >
                  {member.email}
                </p>
              </div>

              <button
                onClick={() =>
                  removeMember(
                    member._id
                  )
                }
                className="
                text-red-500
                "
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>

      {/* Tasks */}

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
          Tasks
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
            <h3
              className="
              font-semibold
              "
            >
              {task.title}
            </h3>

            <p
              className="
              text-slate-400
              text-sm
              mt-2
              "
            >
              {task.description}
            </p>

            <div
              className="
              flex
              justify-between
              items-center
              mt-4
              "
            >
              <span>
                {
                  task.assignedTo
                    ?.name
                }
              </span>

              <select
                value={
                  task.status
                }
                onChange={(e) =>
                  updateStatus(
                    task._id,
                    e.target.value
                  )
                }
                className="
                bg-slate-700
                p-2
                rounded
                "
              >
                <option>
                  Todo
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Done
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {showMemberModal && (
        <AddMemberModal
          projectId={id}
          closeModal={() =>
            setShowMemberModal(
              false
            )
          }
          refreshProject={
            getProject
          }
        />
      )}

      {showTaskModal && (
        <CreateTaskModal
          projectId={id}
          members={
            project.members
          }
          closeModal={() =>
            setShowTaskModal(
              false
            )
          }
          refreshTasks={
            getTasks
          }
        />
      )}
    </div>
  );
};

export default ProjectDetails;