import React from "react";


const UserTable = (props: any) => (
  <>
        <div className="bg-white p-2 mt-4">
    {props.tasks.length > 0 ? (
      props.tasks.map((task: any) => (
          <div key={task.karat}>
            <div className="flex w-full flex-col md:flex-row  p-1 border-b   rounded-lg shadow-lg bg-gray-800 mb-1">
              <div className="flex-2 px-1 w-full">
                <div className="ml-2 text-sm">
                  <span className="text-white">
                    <span className="  bg-orange-300 rounded-sm px-2 mr-3">
                    {task.karat}
                    </span>
                    {task.name} &nbsp;
                    <span className="bg-green-700 text-blue-100 py-0 px-2 rounded-full text-sm ">
                      NOT ISSUE
                    </span>
                  </span>
                  <br />
                  <div>
                    <div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0">
                      <div className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">
                        TOTAL WEIGHT - {task.total_weight}
                      </div>
                      <div className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">
                        NET WEIGHT - {task.net_weight}
                      </div>
                      <div className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">
                        POUNDS - {task.pound}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-1 text-right">
                <button
                  onClick={() => {
                    props.editRow(task);
                  }}
                  className="btn btn-sm btn-warning btn-update-loan mr-2 mt-1"
                  style={{ width: "60px;" }}
                >
                  <span>Update</span>
                </button>
              </div>
              <div className="px-1 text-right">
                <button
                  onClick={() => props.deleteUser(task.id)}
                  className="btn btn-sm btn-danger btn-delete-loan mr-2 mt-1"
                  style={{ width: "60px;" }}
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
      ))
    ) : (
      <div className="text-center">No tasks</div>
    )}
        </div>
    <table>
      <tbody>
        {props.tasks.length > 0 ? (
          props.tasks.map((task: any) => (
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
  </>
);

export default UserTable;
