import React from "react";

const TaskTable = (props:any) => (
  <div>
  
    <div>
      {props.tasks.length > 0 ? (
        props.tasks.map((task:any) => (
          <div key={task.id}>
            <div>{task.name}-{task.id}
            </div>
            <div>{task.karat}</div>
            <div>{task.net_weight}</div>
            <div>{task.total_weight}</div>
            <div>{task.pound}</div>
            <div>
              <button
                className="button muted-button"
                onClick={() => {
                  props.editRow(task);
                }}
              >
                Edit
              </button>
              <button
                className="button muted-button"
                onClick={() => props.deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <td colSpan={3}>No tasks</td>
        </div>
      )}
    </div>
  </div>
);

export default TaskTable;
