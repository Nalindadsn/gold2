import React from "react";

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Karat</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.tasks.length > 0 ? (
        props.tasks.map(task => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.karat}</td>
            <td>{task.net_weight}</td>
            <td>{task.total_weight}</td>
            <td>{task.pound}</td>
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
                onClick={() => props.deleteUser(task.id)}
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

export default UserTable;
