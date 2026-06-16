import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

const KanbanColumn = ({
  title,
  tasks,
}) => {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="
          bg-slate-900
          rounded-xl
          p-4
          min-h-[500px]
          border
          border-slate-800
          "
        >
          <div
            className="
            flex
            justify-between
            items-center
            mb-4
            "
          >
            <h2
              className="
              text-xl
              font-bold
              "
            >
              {title}
            </h2>

            <span
              className="
              bg-slate-800
              px-3
              py-1
              rounded-full
              text-sm
              "
            >
              {tasks.length}
            </span>
          </div>

          {tasks.map(
            (task, index) => (
              <Draggable
                key={task._id}
                draggableId={task._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={
                      provided.innerRef
                    }
                    {
                      ...provided.draggableProps
                    }
                    {
                      ...provided.dragHandleProps
                    }
                  >
                    <TaskCard
                      task={task}
                    />
                  </div>
                )}
              </Draggable>
            )
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;