"use client"
import React, { useState } from "react";
import UserTable from "./tables/UserTable";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const tasksData = [
    { id: 1, name: "Tania", karat: "floppydiskette" ,net_weight:"aa",total_weight:"bb",pound:"ccc"},
    { id: 2, name: "Tania", karat: "floppydiskette" ,net_weight:"aa",total_weight:"bb",pound:"ccc"},
    { id: 3, name: "Tania", karat: "floppydiskette" ,net_weight:"aa",total_weight:"bb",pound:"ccc"}]
    
  const initialFormState = { id: null, name: "", karat: "",net_weight:"",total_weight:"",pound:"" };

  const [tasks, setUsers] = useState(tasksData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user:any) => {
    user.id = tasks.length + 1;

    setUsers([...tasks, user]);
  };

  const deleteUser = (id:any) => {
    setEditing(false);
    setUsers(tasks.filter(user => user.id !== id));
  };

  const editRow = (user:any) => {
    setEditing(true);

    setCurrentUser(user);
  };

  const updateUser = (id:any, updatedUser:any) => {
    setEditing(false);
    setUsers(tasks.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{editing ? "Edit user" : "Add user"}</h2>
            <EditUserForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              updateUser={updateUser}
              addUser={addUser}
            />
          
          </div>
        </div>
        <div className="flex-large">
          <h2>View tasks</h2>
          <UserTable tasks={tasks} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
