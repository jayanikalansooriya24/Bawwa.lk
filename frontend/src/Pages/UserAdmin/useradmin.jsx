import React, { useEffect, useState } from "react";
import axios from "axios";
import "./useradmin.css";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/all");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑️ Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  // ✏️ Start Editing
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user); // preload form
  };

  // 💾 Save Updated User
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/user/${editingUser._id}`, formData);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">User Admin</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>PhoneNo</th>
            <th>Email</th>
            <th>Pet Name</th>
            <th>Pet Age</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="7">No users found.</td></tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.pet?.name || "-"}</td>
                <td>{user.pet?.age || "-"}</td>
                <td>
                  <button className="update-btn" onClick={() => handleEdit(user)}>Update</button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {/* Add more fields if needed */}
            <div className="modal-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdmin;
