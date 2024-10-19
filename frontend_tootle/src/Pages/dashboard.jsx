import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUserForm from "./adduser";
import UpdateUserForm from "./updateuser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://tootle-dashboard.onrender.com/api/viewuser/viewuser"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://tootle-dashboard.onrender.com/api/deleteuser/deleteuser/${id}`
      );
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsUpdating(true);
    setShowForm(true);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowForm(false);
    setIsUpdating(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tootle Admin Dashboard
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsUpdating(false);
            setSelectedUser(null);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? "Close Form" : isUpdating ? "Edit User" : "Add User"}
        </button>
      </div>

      {showForm && !isUpdating && <AddUserForm onUserAdded={handleUserAdded} />}
      {showForm && isUpdating && selectedUser && (
        <UpdateUserForm
          userData={selectedUser}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="text-center py-4">
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.phone_number}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="text-yellow-500 hover:text-yellow-700 mx-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 mx-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
