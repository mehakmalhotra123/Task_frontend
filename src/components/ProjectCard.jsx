import {
  Link,
} from "react-router-dom";

const ProjectCard = ({
  project,
}) => {

  return (
    <Link
      to={`/projects/${project._id}`}
    >
      <div
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        p-5
        hover:border-indigo-500
        transition
        "
      >

        <h2
          className="
          text-xl
          font-bold
          "
        >
          {project.name}
        </h2>

        <p
          className="
          text-slate-400
          mt-2
          "
        >
          {project.description}
        </p>

      </div>
    </Link>
  );
};

export default ProjectCard;