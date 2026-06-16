const TaskCard = ({ task }) => {
  const getPriorityColor = (
    priority
  ) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";

      default:
        return "bg-green-500/20 text-green-400";
    }
  };

  return (
    <div
      className="
      bg-slate-800
      border
      border-slate-700
      rounded-xl
      p-4
      mb-3
      hover:border-indigo-500
      transition
      "
    >
      <h3
        className="
        font-semibold
        text-lg
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
        <span
          className="
          text-xs
          text-indigo-400
          "
        >
          {task.assignedTo?.name}
        </span>

        <span
          className={`
          px-2 py-1
          rounded-full
          text-xs
          ${getPriorityColor(
            task.priority
          )}
          `}
        >
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <div
          className="
          mt-3
          text-xs
          text-slate-500
          "
        >
          Due:
          {" "}
          {new Date(
            task.dueDate
          ).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TaskCard;