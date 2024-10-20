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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
          Tootle Admin Dashboard
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsUpdating(false);
            setSelectedUser(null);
          }}
          className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out"
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
          <p className="text-white">Loading users...</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-2">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-600 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.NAME}
                  </td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.phone_number}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="text-yellow-500 hover:text-yellow-700 mx-2 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 mx-2 transition-colors duration-200"
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
