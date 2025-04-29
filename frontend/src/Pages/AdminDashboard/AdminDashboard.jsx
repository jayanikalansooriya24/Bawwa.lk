import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Import images
import adminuserImg from '../../assets/AdminUser.png';
import adminnutritionImg from '../../assets/AdminNutrition.png';
import adminscheduleImg from '../../assets/AdminSchedule.png';
import adminpetstoreImg from '../../assets/AdminPetstore.png';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const systems = [
    {
      title: 'User and Pet Management',
      image: adminuserImg,
      path: '/user-pet-management',
    },
    {
      title: 'Schedule and Reminder Management',
      image: adminscheduleImg,
      path: '/schedule-reminder-management',
    },
    {
      title: 'Nutrition and Dietary Management',
      image: adminnutritionImg,
      path: '/nutrition-dietary-management',
    },
    {
      title: '3D Pet Accessory Visualizer',
      image: adminpetstoreImg,
      path: '/pet-accessory-visualizer',
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <div className="sidebar-header">
          <h2>bawwaLK Admin</h2>
        </div>
        {/*<nav className="sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Users</a>
          <a href="#">Products</a>
          <a href="#">Orders</a>
          <a href="#">Settings</a>
        </nav>*/}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <button className="menu-button" onClick={toggleSidebar}>
            <svg
              className="menu-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <h1>Admin Dashboard</h1>
          <div className="admin-info">
            <span>Admin User</span>
            <button className="logout-button">Logout</button>
          </div>
        </header>

        {/* Systems */}
        <main className="systems-section">
          <div className="systems-grid">
            {systems.map((system, index) => (
              <div
                key={index}
                className="system-card"
                onClick={() => handleCardClick(system.path)}
              >
                <img src={system.image} alt={system.title} className="system-image" />
                <h3 className="system-title">{system.title}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
