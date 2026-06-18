import {
  useEffect,
  useState,
} from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

import ProjectCard
from "../components/ProjectCard";

import CreateProjectModal
from "../components/CreateProjectModal";

const Projects = () => {
const { user } = useAuth();
  const [
    projects,
    setProjects,
  ] = useState([]);

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const getProjects =
  async () => {

    const { data } =
      await API.get(
        "/projects"
      );

    setProjects(data);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const isAdmin =
  user?.role === "admin";

const handleUnauthorized =
  () => {
    alert(
      "Access Denied!\n\nOnly administrators can create projects."
    );
  };

  return (
    <div>

      <div
        className="
        flex
        justify-between
        mb-8
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Projects
        </h1>

        {user?.role === "admin" && (
  <button
    onClick={() =>
      isAdmin
      ? setShowModal(true)
      : handleUnauthorized()
    }
    className="
    bg-indigo-600
    px-4
    py-2
    rounded
    "
  >
    Create Project
  </button>
)}

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-5
        "
      >
        {projects.map(
          (project) => (
            <ProjectCard
              key={
                project._id
              }
              project={
                project
              }
            />
          )
        )}
      </div>

      {showModal && (
        <CreateProjectModal
          closeModal={() =>
            setShowModal(false)
          }
          refreshProjects={
            getProjects
          }
        />
      )}

    </div>
  );
};

export default Projects;