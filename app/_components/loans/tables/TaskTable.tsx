import React from "react";

const TaskTable = (props:any) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>karat</th>
        <th>net_weight</th>
        <th>total_weight</th>
        <th>pound</th>
        <th>status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.tasks.length > 0 ? (
        props.tasks.map((task:any) => (
          <tr key={task.id}>
            <td>{task.name}-{task.id}
            </td>
            <td>{task.karat}</td>
            <td>{task.net_weight}</td>
            <td>{task.total_weight}</td>
            <td>{task.pound}</td>
            <td>{task.status}</td>
            <td>
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
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No tasks</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default TaskTable;
