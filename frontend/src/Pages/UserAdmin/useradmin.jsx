import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./UserAdmin.css";

const UserAdmin = () => {
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
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.petName}</td>
                <td>{user.petAge}</td>
                <td>
                  <button className="update-btn">Update</button>
                </td>
                <td>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  export default UserAdmin;